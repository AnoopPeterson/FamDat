export function draw_graphs(data){
	var canv = document.getElementById('graph_preview');
	var ctx = canv.getContext('2d');
	ctx.fillStyle = "rgb(255, 0, 0)";
	let startx = 40;
	let bar_width = 30;
	let bar_spacing = 10;
	let graph_title = '';

	// We have this little if-elif block since each array is structured differently. Therefore, we draw each graph differently. 
	if(data[0] == 'card'){
		graph_title = 'Credit VS Debit Expenditures';
		console.log('card');
		for (var i = 0; i < data[1].length; i++){ // Loops through main array - credit vs debit
			for (var j = 0; j < data[1][i].length; j++){ // Loops through each sql table entry
				let bar_height = data[1][i][j]['money_spent'] * 0.05;
				ctx.fillRect(startx, 50, bar_width, bar_height);
				startx += bar_width + bar_spacing;
				console.log(startx);
			}
			startx += 20;
			console.log(i + ' ' + startx);
		}

	} else if (data[0] == 'expend'){
		console.log('expend')
		graph_title = 'Expenditures, Ranked Smallest to Highest';
		for (var i = 0; i < data[1].length; i++){
			let bar_height = data[1][i]['money_spent'] * 0.05;
			ctx.fillRect(startx, 50, bar_width, bar_height);
			startx += bar_width + bar_spacing;
			console.log(startx);
		}

	} else if (get_sort_type(data[0]) == 'transact'){
		console.log('transact');
		graph_title = 'Different types of Expenditures';
		for (var i = 0; i < data[1].length; i++){
			for (var i = 0; i < data[1][i].length; i++){
				let height = data[1][i][j]['money_spent'] * 0.05;
				ctx.fillRect(startx, 50, bar_width, bar_height);
				startx += bar_spacing;
				console.log(startx);
			}
			startx += 20;
			console.log(startx);
		}

	} else {
		console.log('Sorry, but this array isn\'t sorted.');
	}
}
