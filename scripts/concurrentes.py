__author__ = 'gdelfresno'

import time
import re
import sys
import csv


from argparse import ArgumentParser

import logging
LOG_FORMAT = '[%(asctime)s] %(levelname)s - %(message)s'
LOG_DATE_FORMAT = '%Y-%m-%d %H:%M:%S'

regex = '([(\d\.)]+).*\[(.*?)\] "(.*?)".*'

results = {}


def parse_date_format(fecha):
    time_data = time.strptime(fecha, "%d/%b/%Y:%H:%M:%S +0100")
    return (time_data.tm_mday, time_data.tm_hour)


def parse_date_subs(fecha):
    return (int(fecha[0:2]), int(fecha[12:14]))


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
    with open(inputfile,'r') as f:

        i = 0
        # Leemos linea a linea
        for line in f:
            i += 1
            if i % 10000 == 0:
                logging.debug(i)

            # Eliminamos saltos
            line = line.strip()

            # Parseamos la linea
            ip, fecha, url = re.match(regex, line).groups()

            # Peticion de cliente
            if client_prefix in url:

                mday, hour = parse_date_subs(fecha)

                # Anadimos la ip para el dia y hora
                try:
                    if ip not in results[mday][hour]:
                        results[mday][hour].append(ip)
                except:
                    if mday not in results.keys():
                        # Inicializamos el vector de horas para el dia
                        results[mday] = [[] for x in range(0, 24)]

                    results[mday][hour] = [ip]

    for day, hours in results.iteritems():
        msg = "Day %d: %s" % (day, [len(ips) for ips in hours])
        logging.debug(msg)
    res_array = [[len(ips) for ips in hours] for day, hours in results.items()]

    transp = map(list, zip(*res_array))

    with open(outputfile, "wb") as f:
        writer = csv.writer(f)
        writer.writerows(transp)


if __name__ == "__main__":
    main()
