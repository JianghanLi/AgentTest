draw = function(stateCount) {
	// Calculate
	var sum_C = [],
		sum_NC = [],
		sum_lost = [],
		years = [];
	for (var i = 0; i < stateCount.nc.length; i++) {
		sum_C[i] = stateCount.autoC + stateCount.c[i] + stateCount.gained[i] + stateCount.regained[i];
		sum_NC[i] = stateCount.autoNC + stateCount.nc[i] + stateCount.lost[i] + stateCount.relost[i];
		sum_lost[i] = stateCount.lost[i] + stateCount.relost[i];
		years[i] = 'year ' + i;
	}

	// Draw the pie chart
	$(function() {
		var colors = Highcharts.getOptions().colors,
			categories = ['Breed_C', 'Breed_NC'],
			data = [{
				y: _.last(sum_C),
				color: colors[0],
				drilldown: {
					name: 'Breed_C versions',
					categories: ['Auto Rewed', 'Breed_C', 'Breed Gained', 'Breed Regained'],
					data: [stateCount.autoC, _.last(stateCount.c), _.last(stateCount.gained), _.last(stateCount.regained)],
					color: colors[0]
				}
			}, {
				y: _.last(sum_NC),
				color: colors[3],
				drilldown: {
					name: 'Breed_NC versions',
					categories: ['Auto Rewed', 'Breed_NC', 'Breed_Lost'],
					data: [stateCount.autoNC, _.last(stateCount.nc), _.last(stateCount.lost) + _.last(stateCount.relost)],
					color: colors[3]
				}
			}],
			browserData = [],
			versionsData = [],
			i,
			j,
			dataLen = data.length,
			drillDataLen,
			brightness;
		// Build the data arrays
		for (i = 0; i < dataLen; i += 1) {
			// add browser data
			browserData.push({
				name: categories[i],
				y: data[i].y,
				color: data[i].color
			});
			// add version data
			drillDataLen = data[i].drilldown.data.length;
			for (j = 0; j < drillDataLen; j += 1) {
				brightness = 0.2 - (j / drillDataLen) / 5;
				versionsData.push({
					name: data[i].drilldown.categories[j],
					y: data[i].drilldown.data[j],
					color: Highcharts.Color(data[i].color).brighten(brightness).get()
				});
			}
		}
		// Create the chart
		$('#container1').highcharts({
			chart: {
				type: 'pie'
			},
			title: {
				text: 'Breed after 15 years'
			},
			yAxis: {
				title: {
					text: 'Total percent market share'
				}
			},
			plotOptions: {
				pie: {
					shadow: false,
					center: ['50%', '50%']
				}
			},
			series: [{
				name: 'Browsers',
				data: browserData,
				size: '60%',
				dataLabels: {
					formatter: function() {
						return this.y > 5 ? this.point.name : null;
					},
					color: 'white',
					distance: -30
				}
			}, {
				name: 'Versions',
				data: versionsData,
				size: '80%',
				innerSize: '60%',
				dataLabels: {
					formatter: function() {
						// display only if larger than 1
						return this.y > 1 ? '<b>' + this.point.name + ':</b> ' + this.y : null;
					}
				}
			}]
		});
	});

	// Draw the basic line chart
	$(function() {
		Highcharts.chart('container2', {
			chart: {
				type: 'line'
			},
			title: {
				text: 'Breed Statistics in 15 years'
			},
			xAxis: {
				title: {
					text: 'Year'
				},
				categories: years
			},
			yAxis: {
				title: {
					text: 'Quantity'
				}
			},
			plotOptions: {
				line: {
					dataLabels: {
						enabled: true
					},
					enableMouseTracking: true
				}
			},
			series: [{
				name: 'All Breed_C',
				data: sum_C
			}, {
				name: 'All Breed_NC',
				data: sum_NC
			}, {
				name: 'Breed_N Lost',
				data: sum_lost
			}, {
				name: 'Breed_N Gained',
				data: stateCount.gained
			}, {
				name: 'Breed_NC Regained',
				data: stateCount.regained
			}]
		});
	});

}