
  google.setOnLoadCallback(drawConcurrenceChart);
  
  function drawConcurrenceChart() {
    var data = google.visualization.arrayToDataTable([
      ['Time', '% CPU'],
      ['5',  26],
      ['10',  25],
      ['15',  22],
      ['20',  27],
      ['25',  29],
      ['30',  30],
      ['35',  25],
      ['40',  28],
      ['45',  27],
      ['50',  33],
      ['55',  32],
      ['60',  34]
    ]);

    var options = {
      title: 'CPU Usage',
      curveType: 'none',
      legend: { position: 'bottom' },
      "vAxis":{
        "title": "%"
      },
      "hAxis":{
        "title": "Latest 60 mins"
      }
    };
    var chart = new google.visualization.LineChart(document.getElementById('concurrence_chart'));
    chart.draw(data, options);
  }

  