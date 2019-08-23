<?php
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

<canvas id="graph_preview" width="1000" height="1000"></canvas>

<script type="text/javascript" >
	
</script>
</body>
</html>