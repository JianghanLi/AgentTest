// Every line data:
// 0 Agent_Breed	
// 1 Policy_ID	
// 2 Age	
// 3 Social_Grade	
// 4 Payment_at_Purchase	
// 5 Attribute_Brand	
// 6 Attribute_Price	
// 7 Attribute_Promotions	
// 8 Auto_Renew	
// 9 Inertia_for_Switch

main = function(factor) {
	// initialize state and state count
	var state = [],
		stateCount = {
			'nc': [],
			'c': [],
			'lost': [],
			'gained': [],
			'relost': [],
			'regained': []
		};

	var autoC = 0,
		autoNC = 0,
		nc = 0,
		c = 0;
	for (var i = 0; i < data.length; i++) {
		if (data[i][8] == 1) { //Auto_Renewed
			state[i] = 0;
			if(data[i][0] == "Breed_NC") autoNC++;
			else autoC++;
		} else if (data[i][0] == "Breed_NC") {
			state[i] = 1;
			nc++;
		} else {
			state[i] = 2;
			c++;
		}
	}
	stateCount.autoC = autoC;
	stateCount.autoNC = autoNC;
	stateCount.c.push(c);
	stateCount.nc.push(nc);
	stateCount.lost.push(0);
	stateCount.gained.push(0);
	stateCount.relost.push(0);
	stateCount.regained.push(0);

	//loop for 15 years.
	var year = 15;
	while (year--) {
		one_year_pass(state, factor, stateCount);
	}

	//draw the results
	draw(stateCount);

	//download output
	var aLink = $('#download')[0];
    var blob = new Blob([JSON.stringify(state)]);
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("click", false, false);
    aLink.download = 'output.json';
    aLink.href = URL.createObjectURL(blob);
    aLink.dispatchEvent(evt);

	return 1;
}

one_year_pass = function(state, Brand_Factor, stateCount) {
	var auto = 0,
		c = 0,
		nc = 0,
		gained = 0,
		lost = 0,
		regained = 0,
		relost = 0;

	for (var i = 0; i < data.length; i++) {
		// pick the value from each line
		var current_state = state[i],
			line = data[i],
			Agent_Breed = line[0],
			Social_Grade = line[3],
			Payment_at_Purchase = line[4],
			Attribute_Brand = line[5],
			Attribute_Price = line[6],
			Attribute_Promotions = line[7],
			Auto_Renew = line[8],
			Inertia_for_Switch = line[9];

		// calculate Affinity, switch conditon1 and switch conditon1
		var Affinity = Payment_at_Purchase / Attribute_Price + (2 * Attribute_Promotions * Inertia_for_Switch),
			condition1 = Affinity < (Social_Grade * Attribute_Brand),
			condition2 = Affinity < (Social_Grade * Attribute_Brand * Brand_Factor);

		// State code:
		// Auto_Renew 0
		// Breed_NC  1
		// Breed_C 2
		// Breed_C Lost (Switched to Breed_NC)	3
		// Breed_C Gained (Switch from Breed_NC) 4
		// Breed_C Relost (Switched to C, then back to NC)	5
		// Breed_C Regained (Switched to NC, then back to C) 6
		if (current_state == 0) {
			continue;
		} else if (current_state == 1) { // Breed_NC 1
			if (condition2) {
				state[i] = 4;
				gained++;
			} else {
				nc++;
			}
		} else if (current_state == 2) { // Breed_C 2
			if (condition1) {
				state[i] = 3;
				lost++;
			} else {
				c++;
			}
		} else if (current_state == 3) { // Breed_C Lost (Switched to Breed_NC)	3
			if (condition2) {
				state[i] = 6;
				regained++;
			} else {
				lost++;
			}
		} else if (current_state == 4) { // Breed_C Gained (Switch from Breed_NC) 4
			if (condition1) {
				state[i] = 5;
				relost++;
			} else {
				gained++;
			}
		} else if (current_state == 5) { // Breed_C Relost (Switched to C, then back to NC)	5
			if (condition2) {
				state[i] = 6;
				regained++;
			} else {
				relost++;
			}
		} else if (current_state == 6) { // Breed_C Regained (Switched to NC, then back to C) 6
			if (condition1) {
				state[i] = 5;
				relost++;
			} else {
				regained++;
			}
		}

	}
	// Update state count
	stateCount.c.push(c);
	stateCount.nc.push(nc);
	stateCount.lost.push(lost);
	stateCount.gained.push(gained);
	stateCount.regained.push(regained);
	stateCount.relost.push(relost);
	return 0;
}