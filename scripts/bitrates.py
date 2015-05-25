__author__ = 'gdelfresno'

import time
import sys
import csv

import re
from argparse import ArgumentParser

import logging
LOG_FORMAT = '[%(asctime)s] %(levelname)s - %(message)s'
LOG_DATE_FORMAT = '%Y-%m-%d %H:%M:%S'

regex = '.*\[(.*?)\] "(.*?)".*'

results = {}

ROUND_BITRATES = [100000, 300000, 600000, 900000, 1200000, 1500000, 1800000, 2400000]


def parse_date_format(fecha):
    time_data = time.strptime(fecha, "%d/%b/%Y:%H:%M:%S +0100")
    return (time_data.tm_mday, time_data.tm_hour)


def parse_date_subs(fecha):
    return (int(fecha[0:2]), int(fecha[12:14]))


#  Funcion de estimacion de bitrate redondeado
def get_round_bitrate(bitrate):

    result = 0
    for index, rbit in enumerate(ROUND_BITRATES):
        result = index
        if bitrate <= (rbit):
            break
    return result


def main(argv=None):
    if argv is None:
        argv = sys.argv

    # Setup argument parser
    parser = ArgumentParser()
    parser.add_argument('-l', '--logfile', dest="logfile", required=False, metavar="FILE", help="Set the logging file (stdout by default")
    parser.add_argument("-d", "--loglevel", dest="loglevel", required=False, choices=['DEBUG', 'INFO', 'WARNING', 'ERROR', 'CRITICAL'], help="Set the logging level")
    parser.add_argument('-i', '--input', dest="input", required=True, help="Input file", metavar="FILE")
    parser.add_argument('-c', '--client', dest="client", required=True, help="Client ID in the log file")
    parser.add_argument('-o', '--output', dest="output", required=True, help="Output csv file", metavar="FILE")

    # Process arguments
    args = parser.parse_args()

    LOG_LEVEL = "INFO"
    if args.loglevel:
        LOG_LEVEL = args.loglevel

    if not args.logfile:
        logging.basicConfig(level=LOG_LEVEL,
                            format=LOG_FORMAT,
                            datefmt=LOG_DATE_FORMAT)
    else:
        logging.basicConfig(filename=args.logfile,
                            level=LOG_LEVEL,
                            format=LOG_FORMAT,
                            datefmt=LOG_DATE_FORMAT)

    inputfile = args.input
    outputfile = args.output
    client_prefix = "mpg.{}.ism".format(args.client)

    # Abrimos el fichero de log
    with open(inputfile, 'r') as f:

        i = 0
        # Leemos linea a linea
        for line in f:
            i += 1
            if i % 10000 == 0:
                logging.debug(i)

            # Eliminamos saltos de linea
            line = line.strip()

            # Obtenemos la fecha y la url de la peticion
            fecha, url = re.match(regex, line).groups()

            # Comprobamos que sea una peticion de video y
            # Del cliente adecuado
            if client_prefix in url and "(video=" in url:

                # Calidad del request
                quality_levels = int(re.match('.*QualityLevels\((\d+)\).*', url).groups()[0])

                # Calculamos el bitrate redondeado
                round_bitrate_index = get_round_bitrate(quality_levels)

                # Dia del mes
                mday = int(fecha[0:2])

                try:
                    # Subimmos el contador para el dia y el bitrate
                    results[mday][round_bitrate_index] += 1
                except:
                    # Inicializamos el vector del dia
                    if mday not in results.keys():
                        results[mday] = [0 for x in range(0, len(ROUND_BITRATES))]

                    results[mday][round_bitrate_index] = 1

    for day, bitrates_count in results.iteritems():
        msg = "Day %d: %s" % (day, ["{}: {}".format(ROUND_BITRATES[day], count) for day, count in enumerate(bitrates_count)])
        logging.debug(msg)

    res_array = [x for key, x in results.iteritems()]

    with open(outputfile, "wb") as f:
        writer = csv.writer(f)
        writer.writerows(res_array)


if __name__ == "__main__":
    main()
