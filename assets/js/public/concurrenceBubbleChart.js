/**
 * Created by gustavo on 5/26/15.
 */

var concurrenceBubbleChart = {
    chart: {
        type: "BubbleChart",
        cssStyle: "height:700px; width: 1200px;",

        options: {
            chartArea: {left:50,top:60,width:'100%',height:'80%'},
            vAxis: {
                title: 'Hora',
                viewWindow: {
                    max: 24,
                    min: 0
                },
                gridlines: {count: 25},
                textStyle: {fontSize: 14},
                titleTextStyle:{fontSize: 18, bold: true}
            },
            hAxis: {
                title: 'Dia',
                viewWindow: {
                    max: 32,
                    min: 0
                },
                gridlines: {count: 33},
                textStyle: {fontSize: 14},
                titleTextStyle:{fontSize: 18, bold: true }
            },
            sizeAxis: {minValue:0, maxSize:18}
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
                {id:"ConcColor", label:"Usuarios", type:"number"},
                {id:"ConcSize",  label:"", type:"number"});
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
    }
    return data;
}

var getValue = function (data, day, hour){
    var result = data[hour][day];
    return result;
}


