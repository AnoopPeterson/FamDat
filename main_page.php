<?php

# NOTE: IF YOUR JS/PHP/HTML CODE WON'T REFRESH, JUST RESTART APACHE SERVER AND MYSQL SERVER

	include 'classes/Transaction.php';
	session_start();

	$preview = Transaction::data_preview('username');
	$preview_json = json_encode($preview);
	$preview_card = Transaction::sort_by_card($preview);
	$preview_expend = Transaction::sort_by_expend($preview);
	$preview_transact = Transaction::sort_by_transact($preview);

	if (isset($_POST['somethin'])) {
		$all_data = Transaction::get_all_data('username');
		$all_data_card = Transaction::sort_by_card($all_data);
		$all_data_expend = Transaction::sort_by_expend($all_data);
		$all_data_date = Transaction::sort_by_transact($all_data);
	}
?>

<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="css/main_page.css">
	<title>Main Page</title>
</head>	
<body>
<div id = 'options'>	
	<form method="post">
		<button><a href="logout.php">Logout</a></button>
		<button name="somethin" value="somethin">Click to view your financial history</button>
		<button><a href="add_data.php">Add a new transaction</a></button>
	</form>
</div>

<canvas id="preview_card" width="550" height="550"></canvas>
<canvas id="preview_expend" width="550" height="550"></canvas>
<canvas id="preview_transact" width="550" height="550"></canvas>

<script type="module">
import {draw_graphs} from './script/display_graphs.js'; 

var preview = <?php echo $preview_json ?>;
var preview_card = <?php echo $preview_card ?>;
var preview_expend = <?php echo $preview_expend ?>;
var preview_transact = <?php echo $preview_transact ?>;
	
draw_graphs(preview_expend, preview);
draw_graphs(preview_card, preview);
draw_graphs(preview_transact, preview);

</script>
</body>
</html>