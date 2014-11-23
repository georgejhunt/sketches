
showPowerFile();

function showPowerFile() {
  $("#chart").off().html("");
  $("#current").text('pwr-data');
  $.get('pwr-data.csv', function(data) {
    var rows = data.split("\n");
    var times = [];
    var chargeLevels = [];
    for (var r = 0; r < rows.length; r++) {
      rows[r] = rows[r].split(",");
      if (rows[r].length > 1) {
        var tstamp = new Date(rows[r][0] * 1000);
        times.push(tstamp);
        chargeLevels.push(rows[r][2] * 1);
      }
    }
    c3.generate({
      data: {
        x: 'time',
        columns: [
          ['time'].concat(times),
          ['charge'].concat(chargeLevels)
        ],
        color: "#77e"
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: function(x) {
              return x.toString()
            }
          }
        }
      }
    });
  });
}

