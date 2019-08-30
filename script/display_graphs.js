export function draw_graphs(data, start = 40){ 
	let startx = start;
	let bar_width = 30;
	let bar_spacing = 10;
	let graph_title = '';
	let bar_height = 0;

	// I REALLY hope this works... however, if it doesn't, that's ok cuz i have a backup plan

	// We have this little if-elif block since each array is structured differently. Therefore, we draw each graph differently. 
	if(data[0] == 'card'){
		let canv = document.getElementById('preview_card');
		let ctx = canv.getContext('2d');
		ctx.fillStyle = "rgb(255, 0, 0)";
		graph_title = 'Credit VS Debit Expenditures';
		canv.textContent = graph_title;
		for (var i = 0; i < data[1].length; i++){ 
			for (var j = 0; j < data[1][i].length; j++){ 
				bar_height = data[1][i][j]['money_spent'] * 0.05;
				ctx.fillRect(startx, 50, bar_width, bar_height);
				startx += bar_width + bar_spacing;
			}
			startx += 20;
		}
		document.cookie = `startx=${startx}; path=../main_page.php`;

	} else if (data[0] == 'expend'){
		let canv = document.getElementById('preview_expend');
		let ctx = canv.getContext('2d');
		ctx.fillStyle = "rgb(255, 0, 0)";
		graph_title = 'Expenditures, Ranked Smallest to Highest';
		for (var i = 0; i < data[1].length; i++){ // The problem is with this array itself. all values for the moeny expenditures have been set to 0. This is a php problem.
			bar_height = data[1][i]['money_spent'] * 0.05;
			ctx.fillRect(startx, 50, bar_width, bar_height);
			startx += bar_width + bar_spacing;
		}
		document.cookie = `startx=${startx}; path=../main_page.php`;

	} else if (data[0] == 'transact'){ // You Need to remember that the first element for each sub array is a string, not another array.
		let canv = document.getElementById('preview_transact');
		let ctx = canv.getContext('2d');
		ctx.fillStyle = "rgb(255, 0, 0)";
		graph_title = 'Different types of Expenditures';
		for (var i = 0; i < data[1].length; i++){
			if (data[1][i]){			
				for (var j = 1; j < data[1][i].length; j++){
						bar_height = data[1][i][j]['money_spent'] * 0.05;
						console.log()
						ctx.fillRect(startx, 50, bar_width, bar_height);
						startx += bar_spacing;
				}
			}
			startx += 20;
		}
		document.cookie = `startx=${startx}; path=../main_page.php`;

	} else {
		console.log('Sorry, but this array isn\'t sorted.');
	}
}

