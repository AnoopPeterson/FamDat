<?php

	# NOTE: IF YOUR JS/PHP/HTML CODE WON'T REFRESH, JUST RESTART APACHE SERVER AND MYSQL SERVER

	include 'classes/Transaction.php';
	session_start();

	$preview = json_encode(Transaction::data_preview('username'));

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
<div id = 'options' style="margin-bottom: 50px">	
	<form method="post">
		<button><a href="logout.php">Logout</a></button>
		<button name="somethin" value="somethin">Click to view your financial history</button>
		<button><a href="add_data.php">Add a new transaction</a></button>
	</form>
</div>

<canvas id="preview" width="500" height="500"></canvas>

<script type="module">
import {draw_graphs} from './script/display_graphs.js'; 

var preview = <?php echo $preview ?>;
	
draw_graphs(preview); 


</script>
</body>
</html>