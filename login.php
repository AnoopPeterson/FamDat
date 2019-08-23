<?php
	session_start();
	include 'classes/DB.php';

	if(isset($_POST['s'])){
		if(!empty($_POST['u'] && !empty($_POST['p']))){ 
			if(DB::query('SELECT username, pswrd FROM users WHERE (username=:username or email=:username) AND pswrd=:password', array(':username'=> $_POST['u'], ':password' => $_POST['p']))){
				$row = DB::query('SELECT email, username, secret_question FROM users WHERE (username=:username OR email=:username) AND pswrd=:password', array(':username'=> $_POST['u'], ':password' => $_POST['p']));
				$_SESSION['username'] = $row[0]['username'];
				$_SESSION['email'] = $row[0]['email'];
				$_SESSION['secret_question'] = $row[0]['secret_question'];
				header('Location: main_page.php');
			} else {
				echo "<p>Incorrect username/password</p>";
			}
		} else {
			echo '<p>Enter a username/password.<p>';
		}
	}
	# HERE'S THE CHALLENGE: COME UP WITH A WAY TO ENCRYPT AND DECRYPT THE PASSWORDS. 

?>

<!DOCTYPE html>
<html>
<head>
	<title>Login To FamDat</title>
	<link rel="stylesheet" type="text/css" href="css/login.css">
</head>
<body>
<div id="login"> <!-- Use this class when doing the CSS for this website -->
	<form method="post">
		Username/Email
			<br>
		<input type="text" name="u">
			<br>
			<br>

		Password <br> <input type="password" name="p">
		<br>
		<br>

		<button type="submit" value="submit" name="s">Submit</button>
	</form>
	<br>
	<p class = "login_page_extra"><a href="forgot_pass.php">Forgot Your Password?</a></p>
	<br>
	<p class = "login_page_extra"><a href="forgot_user.php">Forgot Your Username?</a></p>

</div>

</body>
</html>