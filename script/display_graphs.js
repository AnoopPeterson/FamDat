/*

	Here are functions which make the exported function easier to look at

*/

function scaling_elem(data, canvas_height) {

	let heights = [];
	for (var i = 0; i < data.length; i++){
		heights.push(data[i]['money_spent']);
	}
	let largest_elem = heights.reduce(function(a, b) {
		return Math.max(a, b);
	});

	return canvas_height/largest_elem;
}

function bar_spacing(data, canvas_width){

}


function vert_line(ctx, startx, canv){
	ctx.beginPath();
	ctx.lineWidth = '5';
	ctx.strokeStyle = 'black';
	ctx.moveTo(startx, canv.height - 10);
	ctx.lineTo(startx, 0);
	ctx.moveTo(startx, canv.height - 10	);
}

function horiz_line(ctx, canv){
	ctx.lineTo(canv.width, canv.height - 10);
	ctx.stroke();
	ctx.closePath();	
}


function draw_card(data, raw_data, startx, bar_spacing, bar_width){
	// Gets the canvas element
	let canv = document.getElementById('preview_card');
	let ctx = canv.getContext('2d');
	let scaling_const = scaling_elem(raw_data, canv.height - 30);

	console.log(scaling_const);

	vert_line(ctx, startx, canv); // Draws graph lines - need to modulate later

	ctx.fillStyle = "rgb(255, 0, 0)";
	let graph_title = 'Credit VS Debit Expenditures';

	// Draws the graph itself
	for (var i = 0; i < data[1].length; i++){ 
		for (var j = 0; j < data[1][i].length; j++){ 
			let bar_height = data[1][i][j]['money_spent'] * scaling_const;
			ctx.fillRect(startx, canv.height - 20 - bar_height, bar_width, bar_height);
			startx += bar_width + bar_spacing;
		}
		startx += 20;
	}

	horiz_line(ctx, canv);
}

function draw_expend(data, raw_data, startx, bar_spacing, bar_width){
	let canv = document.getElementById('preview_expend');
	let ctx = canv.getContext('2d');

	let scaling_const = scaling_elem(raw_data, canv.height - 30);

	vert_line(ctx, startx, canv);

	ctx.fillStyle = "rgb(255, 0, 0)";
	let graph_title = 'Expenditures, Ranked Smallest to Highest';

	for (var i = 0; i < data[1].length; i++){ 
		let bar_height = data[1][i]['money_spent'] * scaling_const;
		ctx.fillRect(startx, canv.width - 20 - bar_height, bar_width, bar_height);
		startx += bar_width + bar_spacing;
	}

	horiz_line(ctx, canv);
}

function draw_transact(data, raw_data, startx, bar_spacing, bar_width) {
	let canv = document.getElementById('preview_transact');
	let ctx = canv.getContext('2d');
	let scaling_const = scaling_elem(raw_data, canv.height - 30);

	vert_line(ctx, startx, canv);

	ctx.fillStyle = "rgb(255, 0, 0)";
	let graph_title = 'Different types of Expenditures';

	for (var i = 0; i < data[1].length; i++){
		if (data[1][i]){
			for (var j = 0; j < data[1][i].length; j++){
					let bar_height = data[1][i][j]['money_spent'] * scaling_const;
					ctx.fillRect(startx, canv.width - 20 - bar_height, bar_width, bar_height);
					startx += bar_spacing;
			}
		} else {
			startx += 20;
		}
		startx += 20;
	}
	horiz_line(ctx, canv);
}

/* 

	Here's the function which actually draws the graphs

*/

export function draw_graphs(data, raw_data){ 

	let startx = 40;
	let bar_width = 30;
	let bar_spacing = 10;
	let graph_title = '';
	let bar_height = 0;

	if(data[0] == 'card'){
		draw_card(data, raw_data, startx, bar_spacing, bar_width);

	} else if (data[0] == 'expend'){ 
		draw_expend(data, raw_data, startx, bar_spacing, bar_width);

	} else if (data[0] == 'transact'){
		draw_transact(data, raw_data, startx, bar_spacing, bar_width);

	} else {
		console.log('Sorry, but this array isn\'t sorted.');
	}
}