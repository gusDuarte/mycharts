/**
 * Created by gustavo on 5/26/15.
 */

var bitrateColumnChart = {
    chart: {
        type: "ColumnChart",
        cssStyle: "height:600px; widht:1400px;",
        options: {
            chartArea: {left:60,top:30,width:'100%',height:'85%'},
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
                title: "Dias",
                titleTextStyle:{fontSize: 18, bold: true },
                viewWindow: {
                    max: 32,
                    min: 0
                },
                gridlines: {count: 33}
            }
        },
        formatters: {},
        data: {}
    },
    data_adapter: function (csvData){
        var data = {'cols': [], 'rows': []};
        data.cols = bt_create_columns();
        data.rows = bt_create_rows(csvData);
        return data;
    }
}

var bt_create_columns = function (){
    var data = [];
    data.push(
        {id:"", label:"", type:"string"},
        {id:"100k", label:"100k", type:"number"},
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


var bt_create_rows = function (csvData){
    var data = [];
    var row = [8];
    var csvArray = CSVToArray(csvData,',');

    data.push({c:[]}); //data 0 is empty

    for (var day=1; day<csvArray.length; day++){
        data.push({c:[]});

        data[day].c.push({v: day.toString()});

        for (var c=0; c<8; c++){
            row[c]= bt_getValue(csvArray, day-1, c);
        }
        var sum_porc = 0;
        for (var c=0; c<8; c++){
            var per = percent(row, c);
            data[day].c.push({v: per});
            sum_porc = sum_porc + per;
        }
    }
    return data;
}

var bt_getValue = function (data, day, bitrate){
    return data[day][bitrate];
}

var percent = function(row, pos){
    return (row[pos]/sum(row))*100;
}

var sum = function(row){
    var res = 0;
    for (var i=0; i<row.length; i++){
        res = res + parseInt(row[i]);
    }
    return res;
}


