<?php
	session_start();
	include 'classes/DB.php';

	if(isset($_POST['submit'])){
		
		$pass = $_POST['pass'];
		$confirm = $_POST['confirm'];
		$user = $_POST['user'];
		$email = $_POST['email'];
		$secret_question = $_POST['secret_question'];
		$secret_answer = $_POST['secret_answer'];

		if(!empty($email) && !empty($confirm) && !empty($user) && !empty($email) && !empty($pass) && !empty($confirm) && !empty($secret_question) && !empty($secret_answer)){
			if($pass == $confirm){
				$hash_pass = password_hash($pass, PASSWORD_ARGON2I); 
				DB::query('INSERT INTO users (email, username, pswrd, secret_question, secret_answer) VALUES (:email, :user, :password, :secret_question, :secret_answer)', array(':email' => $email, ':user' => $user, ':password' => $pass, ':secret_question' => $secret_question, ':secret_answer' => $secret_answer));
				DB::query('INSERT INTO transactions (username, secret_question, secret_answer) VALUES (:username, :secret_q, :secret_a)', array(':username' =>$user, ':secret_q' => $secret_question, ':secret_a' => $secret_answer));
				header('Location: login.php');		
			} else {
				echo "Passwords don't match.";
			}
		} else {
			echo "You didn't enter all the necessary information.";
		}
	}
?>

<!DOCTYPE html>
<html>
<head>
	<title>Sign Up</title>
</head>
<body>
<div class="sign_up">
	<form method="post">
		Email: <input type="text" name="email"> 
		<br> 
		<br>
		
		Username: <input type="text" name="user">
		<br>
		<br>
		
		Password: <input type="password" name="pass">
		<br>
		<br>
		
		Confirm Password: <input type="password" name="confirm">
		<br>
		<br>

		<select name="secret_question">
			<option value="first_pet">What was the name of your first pet?</option>
			<option value="undergrad">What undergraduate college did you attend?</option>
			<option value="parents">What is one of your parent's names?</option>
		</select>
		
		Enter the answer to your secret question: <input type="text" name="secret_answer">
		<br>
		<br>

		<button type="submit" value="submit" name="submit">Submit</button>
	</form>
</div>
</body>
</html>