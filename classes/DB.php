<?php

class DB{

	function connect(){

		try{
			$pdo_string = sprintf('mysql:host=%s;dbname=%s;charset=utf8', 'localhost', 'famdat');
			$pdo = new PDO($pdo_string, 'root', '');
			$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			return $pdo;
		} catch (Exception $e){
			echo 'Connection Failed. '.$e->getMessage();
		}
	}

	function query($request, array $params){
		$stmt = self::connect()->prepare($request);
		$stmt->execute($params);

		#Code for SELECT query
		if(explode(' ', $request)[0] == 'SELECT'){
			return $stmt->fetchAll();
		}
	}
}