function draw_graphs(canvas_id, data){
	let canvas = document.getElementById(canvas_id);
	let ctx = canvas.getContext('2d');
	ctx.fillStyle = "rgb(255, 0, 0)";
	let startx = 40;
	let bar_width = 30;
	let bar_spacing = 10;
	let graph_title = '';

	// We have this little if-elif block since each array is structured differently. Therefore, we draw each graph differently. 
	if(data[0] == 'card'){
		graph_title = 'Credit VS Debit Expenditures';
		for (var i = 0; i < data[1].length; i++){ // Start at 1 since 0th element is a string and is only needed for identification
			let height = (data[1][i] * 10) + 1;
		}

	} else if (data[0] == 'expend'){
		graph_title = 'Expenditures, Ranked Smallest to Highest';
		for (var i = 0; i < data[1].length; i++){

		}

	} else if (get_sort_type(data[0]) == 'transact'){
		graph_title = 'Different types of Expenditures';
		for (var i = 0; i < data[1].length; i++){

		}

	} else {
		// Just do nothing
	}
}
