
showPowerFile();

function showPowerFile() {
  $("#chart").off().html("");
  $("#current").text('pwr-data');
  $.get('pwr-data.csv', function(data) {
    var rows = data.split("\n");
    var times = [];
    var chargeLevels = [];
    var voltageLevels = [];
    var watts = [];
    for (var r = 0; r < rows.length; r++) {
      rows[r] = rows[r].split(",");
      if (rows[r].length > 1) {
        var tstamp = new Date(rows[r][0] * 1000);
        times.push(tstamp);
        chargeLevels.push(rows[r][1] * 1);
        voltageLevels.push(rows[r][2] * 1);
        watts.push(rows[r][7] * 1);
      }
    }
    c3.generate({
      bindto: '#chart1',
      data: {
        x: 'time',
        columns: [
          ['time'].concat(times),
          ['charge'].concat(chargeLevels),
          ['voltage'].concat(voltageLevels),
        ],
        color: "#77e",
	axes: {
		charge: 'y2'
	}
      },
      
      axis: {
	y: {
	min: 12,
	max: 15
	},
        y2: {
	  min:  80,
	  max:  100,
          show: true,
        },
        x: {
          type: 'timeseries',
          tick: {
            format: function(x) {
              return x.toString()
            }
          }
        },
      }
    });
    c3.generate({
	bindto: '#chart2',
      data: {
        x: 'time',
        columns: [
          ['time'].concat(times),
          ['wattsInOut'].concat(watts),
        ],
        color: "#77e",
      },
      
      axis: {
//	y: {
//	min: 50,
//	max: 100
//	},
        x: {
          type: 'timeseries',
          tick: {
            format: function(x) {
              return x.toString()
            }
          }
        },
      }
    });
  });
}

