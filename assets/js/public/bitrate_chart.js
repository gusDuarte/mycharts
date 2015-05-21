google.setOnLoadCallback(drawBitratesChart);

function drawBitratesChart() {

	
	
	
	 var data = google.visualization.arrayToDataTable([
        ['Genre',  'Romance', 'General','Western', 'Literature', { role: 'annotation' } ],
        ['2010',  20, 32, 18, 5, ''],
        ['2020',  23, 30, 16, 9, ''],
        ['2030',  29, 30, 12, 13, '']
      ]);


	var inputdata = []; 
	inputdata [0]  = ['', '200k', '500k', '800k', '1100k', '1400k','1700k', '2300k', { role: 'annotation' } ];
	inputdata [1]  = ['01', 415,14819,9879,9262,36020,1722,149000,6583];
	inputdata [2]  = ['02',181,13478,11470,11334,44511,2280,176893,6225];
	inputdata [3]  = ['03',476,12954,15113,16884,61577,1757,202920,3888];
	inputdata [4]  = ['04',472,25798,18472,16611,64642,4199,234583,14870];
	inputdata [5]  = ['05',174,20664,14542,18105,54334,2357,168540,4893];
	inputdata [6]  = ['06',117,9238,6611,8805,35080,907,114366,7773];
	inputdata [7]  = ['07',201,14970,10421,11637,32643,1218,131036,1893];
	inputdata [8]  = ['08',199,24690,15626,18953,49067,1442,127864,2263];
	inputdata [9]  = ['09',76,7793,8179,8614,25603,528,131637,4794];
	inputdata [10]  = ['10',81,10600,8933,9626,35602,334,187688,6745];
	inputdata [11]  = ['11',826,12163,14451,18940,57072,3330,328491,17759];
	inputdata [12]  = ['12',216,9753,10991,12131,36821,2718,217264,8820];
	inputdata [13]  = ['13',161,7340,6121,9027,27088,1025,146513,3059];
	inputdata [14]  = ['14',142,8722,5935,8493,30627,1164,130411,4972];
	inputdata [15]  = ['15',52,3715,4160,7998,23123,517,114029,3200];
	inputdata [16]  = ['16',268,5265,5681,9588,28425,1007,120485,2818];
	inputdata [17]  = ['17',412,9261,9940,13379,36719,1470,191963,10351];
	inputdata [18]  = ['18',573,18539,16433,17626,50619,2684,306278,13501];
	inputdata [19]  = ['19',226,17404,13396,13195,33401,1491,197561,10456];
	inputdata [20]  = ['20',439,8810,5624,5515,13556,162,104572,3395];
	inputdata [21]  = ['21',809,5970,5978,6475,17021,11,90362,1068];
	inputdata [22]  = ['22',220,8117,7155,6447,18117,102,113861,1406];
	inputdata [23]  = ['23',339,10732,6352,4972,20203,375,129929,4887];
	inputdata [24]  = ['24',224,6861,7985,8381,29564,2400,152200,7768];
	inputdata [25]  = ['25',180,8073,11808,11686,34159,5236,231067,15165];
	inputdata [26]  = ['26',342,12693,13220,15931,37354,1655,194916,5909];
	inputdata [27]  = ['27',238,7593,6604,6120,14647,1250,89492,4727];
	inputdata [28]  = ['28',441,6668,6596,5860,20565,928,115242,3447];
	inputdata [29]  = ['29',687,7788,8289,7748,23365,419,116023,8219];
	inputdata [30]  = ['30',345,7705,8283,8623,28172,1535,142739,10811];	

	

    var data = google.visualization.arrayToDataTable(inputdata);
   
      var view = new google.visualization.DataView(data);   
        	view.setColumns([0, 
        	{
        		label: '200k',
        		type: 'number',
        		calc: function (dt, row) {
            		var _200k = dt.getValue(row, 1);
            		var _500k = dt.getValue(row, 2);
            		var _800k = dt.getValue(row, 3);
            		var _1100k = dt.getValue(row, 4);
                    var _1400k = dt.getValue(row, 5);
                    var _1700k = dt.getValue(row, 6);
                    var _2300k = dt.getValue(row, 7);
            	return {v: _200k / (_200k +_500k + _800k + _1100k + _1400k + _1700k + _2300k), f: _200k.toString()};
        		}
    		}, 
    		{
                label: '500k',
                type: 'number',
                calc: function (dt, row) {
                    var _200k = dt.getValue(row, 1);
                    var _500k = dt.getValue(row, 2);
                    var _800k = dt.getValue(row, 3);
                    var _1100k = dt.getValue(row, 4);
                    var _1400k = dt.getValue(row, 5);
                    var _1700k = dt.getValue(row, 6);
                    var _2300k = dt.getValue(row, 7);
                return {v: _500k / (_200k +_500k + _800k + _1100k + _1400k + _1700k + _2300k), f: _500k.toString()};
                }
            },
    		{
                label: '800k',
                type: 'number',
                calc: function (dt, row) {
                    var _200k = dt.getValue(row, 1);
                    var _500k = dt.getValue(row, 2);
                    var _800k = dt.getValue(row, 3);
                    var _1100k = dt.getValue(row, 4);
                    var _1400k = dt.getValue(row, 5);
                    var _1700k = dt.getValue(row, 6);
                    var _2300k = dt.getValue(row, 7);
                return {v: _800k / (_200k +_500k + _800k + _1100k + _1400k + _1700k + _2300k), f: _800k.toString()};
                }
            },
    		{
                label: '1100k',
                type: 'number',
                calc: function (dt, row) {
                    var _200k = dt.getValue(row, 1);
                    var _500k = dt.getValue(row, 2);
                    var _800k = dt.getValue(row, 3);
                    var _1100k = dt.getValue(row, 4);
                    var _1400k = dt.getValue(row, 5);
                    var _1700k = dt.getValue(row, 6);
                    var _2300k = dt.getValue(row, 7);
                return {v: _1100k / (_200k +_500k + _800k + _1100k + _1400k + _1700k + _2300k), f: _1100k.toString()};
                }
            },
            {
                label: '1400k',
                type: 'number',
                calc: function (dt, row) {
                    var _200k = dt.getValue(row, 1);
                    var _500k = dt.getValue(row, 2);
                    var _800k = dt.getValue(row, 3);
                    var _1100k = dt.getValue(row, 4);
                    var _1400k = dt.getValue(row, 5);
                    var _1700k = dt.getValue(row, 6);
                    var _2300k = dt.getValue(row, 7);
                return {v: _1400k / (_200k +_500k + _800k + _1100k + _1400k + _1700k + _2300k), f: _1400k.toString()};
                }
            },
            {
                label: '1700k',
                type: 'number',
                calc: function (dt, row) {
                    var _200k = dt.getValue(row, 1);
                    var _500k = dt.getValue(row, 2);
                    var _800k = dt.getValue(row, 3);
                    var _1100k = dt.getValue(row, 4);
                    var _1400k = dt.getValue(row, 5);
                    var _1700k = dt.getValue(row, 6);
                    var _2300k = dt.getValue(row, 7);
                return {v: _1700k / (_200k +_500k + _800k + _1100k + _1400k + _1700k + _2300k), f: _1700k.toString()};
                }
            },
            {
                label: '2300k',
                type: 'number',
                calc: function (dt, row) {
                    var _200k = dt.getValue(row, 1);
                    var _500k = dt.getValue(row, 2);
                    var _800k = dt.getValue(row, 3);
                    var _1100k = dt.getValue(row, 4);
                    var _1400k = dt.getValue(row, 5);
                    var _1700k = dt.getValue(row, 6);
                    var _2300k = dt.getValue(row, 7);
                return {v: _2300k / (_200k +_500k + _800k + _1100k + _1400k + _1700k + _2300k), f: _2300k.toString()};
                }
            },
    		]);

      var options = {
        width: 1700,
        height: 900,
        legend: { position: 'top', maxLines: 3 },
        isStacked: true,
        vAxis:{
        	format: '#.##%'
        }
      };
      
    var options_fullStacked = {
          isStacked: 'percent',
          height: 300,
          legend: {position: 'top', maxLines: 3},
          vAxis: {
            minValue: 0,
            ticks: [0, .3, .6, .9, 1]
          }
        };
    var chart = new google.visualization.ColumnChart(document.getElementById('bitrates_chart'));
    chart.draw(view, options);
  }
