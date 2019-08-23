<?php
	session_start();
	include 'classes/DB.php';
	if(isset($_POST['submit'])){
		if(DB::query('SELECT username FROM transactions WHERE secret_answer=:secret_pass', array(':secret_pass'=>$_POST['secret_pass']) ) ){
			if(!empty($_POST['transact_type'])  && !empty($_POST['money_spent']) && !empty($_POST['card_type'])){
				DB::query('INSERT INTO transactions (username, secret_question, secret_answer, transact_type, money_spent, card_type) VALUES (:u, :sq, :sa, :tt, :ms, :ct)', array(':u' => $_SESSION['username'], ':sq' => $_SESSION['secret_question'], ':sa' => $_POST['secret_pass'], ':tt' => $_POST['transact_type'], ':ms' => $_POST['money_spent'] , ':ct' => $_POST['card_type']));  # THIS LINE SHOULD NOT EXIST AND YET IT DOES-I NEED TO FIND ANOTHER WAY TO ENTER DEFAULT VALUES FOR MOST OF THESE STUFF
				header('Location: main_page.php');
			} else{
				echo 'You didn\'t enter all required information.';
			}
		} else {
			echo "Wrong answer to the secret question. Try again.";
		}
	}
?>

<!DOCTYPE html>
<html>
<head>
	<title>Add a New Entry</title>
</head>
<body>
<form method="post">

	Enter the answer to your secret question: <input type="password" name="secret_pass">
	<br>
	<br>

	What did you spend your money doing? <select name="transact_type">
		<option value="shopping">Shopping</option>
		<option value="electricity">Electric Bill</option>
		<option value="water">Water Bill</option>
		<option value="mortgage">Store Your Monthly Mortgage Bill</option>
		<option value="other">Other</option>
	</select>
	<br>
	<br>

	How much money did you spend on your transaction? <input type="number" name="money_spent">
	<br>

	Did you use Credit or Debit? (Enter C for Credit or D for Debit) <input type="text" name="card_type">

	<button type="submit" name="submit">Submit</button>

</form>

</body>
</html>