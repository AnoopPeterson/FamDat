<?php

# NOTE: IF YOUR JS/PHP/HTML CODE WON'T REFRESH, JUST RESTART APACHE SERVER AND MYSQL

	include 'classes/Transaction.php';
	session_start();

	$preview = Transaction::data_preview('username');
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
	<title>Main Page</title>
</head>	
<body>
<form method="post">
	<button><a href="logout.php">Logout</a></button>
	<button name="somethin" value="somethin">Click to view your financial history</button>
	<button><a href="add_data.php">Add a new transaction</a></button>
</form>

<canvas id="preview_card" width="500" height="500"></canvas>
<canvas id="preview_expend" width="500" height="500"></canvas>
<canvas id="preview_transact" width="500" height="500"></canvas>

<script type="module">
import {draw_graphs} from './script/display_graphs.js'; 

var preview_card = <?php echo $preview_card ?>;
var preview_expend = <?php echo $preview_expend ?>;
var preview_transact = <?php echo $preview_transact ?>;
	
draw_graphs(preview_expend);
draw_graphs(preview_card);
draw_graphs(preview_transact);
</script>
</body>
</html>