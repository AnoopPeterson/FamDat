/*

	Here are functions which reduce repeated code

*/

function scaling_elem(data, canvas_height) {
	let largest_elem = -1000000;
	for (var i = 0; i < data.length; i++){
		if (largest_elem <= data[i]['money_spent']){
			largest_elem = data[i]['money_spent'];
			console.log(data[i]['money_spent']);
		}
		console.log('largest_elem: ' + largest_elem)
	}
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
	let scaling_const = scaling_elem(raw_data, canv.height);

	vert_line(ctx, startx, canv); // Draws graph lines - need to modulate later

	ctx.fillStyle = "rgb(255, 0, 0)";
	let graph_title = 'Credit VS Debit Expenditures';

	// Draws the graph itself
	for (var i = 0; i < data[1].length; i++){ 
		for (var j = 0; j < data[1][i].length; j++){ 
			let bar_height = data[1][i][j]['money_spent'] * 0.05;
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
	let scaling_const = scaling_elem(raw_data, canv.height);

	vert_line(ctx, startx, canv);

	ctx.fillStyle = "rgb(255, 0, 0)";
	let graph_title = 'Expenditures, Ranked Smallest to Highest';

	for (var i = 0; i < data[1].length; i++){ 
		let bar_height = data[1][i]['money_spent'] * 0.05;
		ctx.fillRect(startx, canv.width - 20 - bar_height, bar_width, bar_height);
		startx += bar_width + bar_spacing;
	}

	horiz_line(ctx, canv);
}

function draw_transact(data, raw_data, startx, bar_spacing, bar_width) {
	let canv = document.getElementById('preview_transact');
	let ctx = canv.getContext('2d');
	let scaling_const = scaling_elem(raw_data, canv.height);

	vert_line(ctx, startx, canv);

	ctx.fillStyle = "rgb(255, 0, 0)";
	let graph_title = 'Different types of Expenditures';

	for (var i = 0; i < data[1].length; i++){
		if (data[1][i]){
			for (var j = 0; j < data[1][i].length; j++){
					let bar_height = data[1][i][j]['money_spent'] * 0.05;
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

	if(data[0] == 'card'){ // If the way they sorted was through cards
		draw_card(data, raw_data, startx, bar_spacing, bar_width);
	} else if (data[0] == 'expend'){ 
		draw_expend(data, raw_data, startx, bar_spacing, bar_width);
	} else if (data[0] == 'transact'){
		draw_transact(data, raw_data, startx, bar_spacing, bar_width);
	} else {
		console.log('Sorry, but this array isn\'t sorted.');
	}
}