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

function bar_spacing(data = [], canvas_width, raw_data){ // Is this a good idea?
	if (data[0] == 'card' || data[0] == 'expend' || data[0] == 'transact' ){
		return canvas_width / (raw_data.length - 10);
	} else {
		return canvas_width / raw_data.length;
	}
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


function draw_card(data, raw_data, startx, bar_width){  // Th
	// Gets the canvas element
	let canv = document.getElementById('preview_card');
	let ctx = canv.getContext('2d');
	let scaling_const = scaling_elem(raw_data, canv.height - 30);
	//let bar_spacing = bar_spacing(data, canv.width);

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

function draw_expend(data, raw_data, startx, bar_width){
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

function draw_transact(data, raw_data, startx, bar_width) {
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
					ctx.fillRect(startx, canv.height - 20 - bar_height, bar_width, bar_height);
					startx += bar_spacing;
			}
		} else {
			startx += 20;
		}
		startx += 20;
	}
	horiz_line(ctx, canv);
}

function draw_preview(preview, startx) {
	let canv = document.getElementById('preview');
	let ctx = canv.getContext('2d');
	ctx.fillStyle = 'rgb(255, 0, 0)';

	let scaling_const = scaling_elem(preview, canv.height - 30);
	let bs = bar_spacing(preview, canv.width);

	vert_line(ctx, startx, canv);
	horiz_line(ctx, canv);
	
	for (var i = 0; i < preview.length; i++){
		let bar_height = preview[i]['money_spent'] * scaling_const;
		ctx.fillRect(startx, canv.height - 20 - bar_height, 5, 5);
		startx += bs;
	}
	ctx.closePath();
}

/* 

	Here's the function which actually draws the graphs

*/

export function draw_graphs(data = null, raw_data){ 

/*

	Here's the gist on which values are used for which functions:

	startx: for all of them, but it has to be adjusted for bar graphs vs dot graphs.
	bar_width: bar graphs only.
	bar_spacing: weird naming, but it's for both. Again, I'll need to adjust it accordingly for bar graphs.
	graph_title: for all of them. Every graph needs a title.
	bar_height: like bar_spacing, but it's meant to be the value of the dot graphs, and the starting point for bar graphs (remember, js coordinates are different to what we're used to.)
	
	As you can see, since this function is meant to be used for any type of graph (cuz I'm too lazy to make a new file just for the previewing), I need things to be a bit generalized. So keep that in mind.
	
*/

	let startx = 15;
	let bar_width = 30;
	let graph_title = '';
	let bar_height = 0;

	if(data[0] == 'card'){
		startx = 40;
		draw_card(data, raw_data, startx, bar_width);

	} else if (data[0] == 'expend'){
		startx = 40; 
		draw_expend(data, raw_data, startx, bar_width);

	} else if (data[0] == 'transact'){
		startx = 40;
		draw_transact(data, raw_data, startx, bar_width);

	} else {
		draw_preview(raw_data, startx);

	}
}