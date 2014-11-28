
showPowerFile();

function showPowerFile() {
  $("#chart1").off().html("");
  $("#current").text('pwr-data');
  $.get('pwr-data.csv', function(data) {
    var rows = data.split("\n");
    var times = [];
    var chargeLevels = [];
    var voltageLevels = [];
    for (var r = 0; r < rows.length; r++) {
      rows[r] = rows[r].split(",");
      if (rows[r].length > 1) {
        var tstamp = new Date(rows[r][0] * 1000);
        times.push(tstamp);
        chargeLevels.push(rows[r][1] * 1);
        voltageLevels.push(rows[r][2] * 1);
      }
    }
    c3.generate({
      bindto: '#chart1',
      data: {
        x: 'time',
        columns: [
          ['time'].concat(times),
          ['voltage'].concat(voltageLevels),
        ],
        color: "#77e",
      },
      
      axis: {
	y: {
		min: 12,
		max: 15
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
  });
}

