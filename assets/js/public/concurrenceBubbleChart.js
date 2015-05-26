/**
 * Created by gustavo on 5/26/15.
 */

var concurrenceBubbleChart = {
    chart: {
        type: "BubbleChart",
        cssStyle: "height:800px; widht:1400px;",
        options: {
            vAxis: {
                title: 'Hora',
                viewWindow: {
                    max: 24,
                    min: 0
                },
                gridlines: {count: 25},
                textStyle: {fontSize: 12}
            },
            hAxis: {
                title: 'Dia',
                viewWindow: {
                    max: 31,
                    min: 0
                },
                gridlines: {count: 32},
                textStyle: {fontSize: 10}
            },
            sizeAxis: {minValue:2, maxSize:12}
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
    data.push(  {id:"ID", label:"", type:"string"},
                {id:"Dia", label:"Dia", type:"number"},
                {id:"hora", label:"hora", type:"number"},
                {id:"ConcColor", label:"Concurrence", type:"number"},
                {id:"ConcSize",  label:"Concurrence", type:"number"});
    return data;
}


var create_rows = function (csvData){
    var data = [];
    var csvArray = CSVToArray(csvData,',');
    var idx=0;
    for (var day= 1;day<31; day++){
        for (var hour=0; hour<24; hour++){
            data.push({c:[]});
            data[idx].c.push({v: ""});
            data[idx].c.push({v: day});
            data[idx].c.push({v: hour});
            data[idx].c.push({v: getValue(csvArray, day, hour)}); //color
            data[idx].c.push({v: getValue(csvArray, day, hour)}); //size
            idx++;
        }
        console.log("ROW: ("+day+"): " + data[day]);
    }
    return data;
}

var getValue = function (data, day, hour){
    var result = data[hour][day];
    console.log("Day: " + day + " Hour: " + hour + " value: " +  result );
    return result;
}


