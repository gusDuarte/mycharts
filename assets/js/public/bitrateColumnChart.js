/**
 * Created by gustavo on 5/26/15.
 */

var bitrateColumnChart = {
    chart: {
        type: "ColumnChart",
        cssStyle: "height:800px; widht:1500px;",
        options: {
            legend: {position: 'top', maxLines: 3},
            isStacked: "true",
            vAxis: {
                format: '#\'%\'',
                viewWindow: {
                    max: 100,
                    min: 0
                }
            },
            hAxis: {
                "title": "Dias"
            }
        },
        formatters: {},
        data: {}
    },
    data_adapter: function (csvData){
        var data = {'cols': [], 'rows': []};
        data.cols = create_columns();
        data.rows = create_rows(csvData);
        return data;
    }
}


var create_columns = function (){
    var data = [];
    data.push(  {id:"100k", label:"100k", type:"number"},
        {id:"300k", label:"300k", type:"number"},
        {id:"600k", label:"600k", type:"number"},
        {id:"900k", label:"900k", type:"number"},
        {id:"1200k", label:"1200k", type:"number"},
        {id:"1500k", label:"1500k", type:"number"},
        {id:"1800k", label:"1800k", type:"number"},
        {id:"2400k", label:"2400k", type:"number"}
    );
    return data;
}


var create_rows = function (csvData){
    var data = [];
    var row = [8];
    var csvArray = CSVToArray(csvData,',');

    for (var day=0; day<29; day++){
        data.push({c:[]});

        data[day].c.push({v: day.toString()});

        for (var c=0; c<8; c++){
            row[c]= getValue(csvArray, day, c);
        }

        for (var c=0; c<8; c++){
            var per = percent(row, c);
            data[day].c.push({v: per});
            console.log("day: "+ day + "bitrate: "+ c + " perc: " + per);
        }
    }
    return data;
}

var getValue = function (data, day, bitrate){
    console.log("Day: " + day + " Bitrate: " + bitrate + " value: " +  data[day][bitrate] );
    return data[day][bitrate];
}

var percent = function(row, pos){
    return Math.ceil((row[pos]/sum(row))*100);
}

var sum = function(row){
    var res = 0;
    for (var i=0; i<row.length; i++){
        res = res + parseInt(row[i]);
    }
    return res;
}


