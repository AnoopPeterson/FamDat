<?php
include 'DB.php';

class Transaction{

	function get_all_data($index){
		$all_data = DB::query('SELECT transact_type, money_spent, card_type, date_of_transact FROM transactions WHERE username = :uname', array(':uname' => $_SESSION[$index]));
		return $all_data;
	}

	function data_preview($index){
		$total_data = self::get_all_data($index);
		$date = date('Y');		
		$recent_data = array();
		if(count($total_data) > 1){
			for ($i = 0; $i < count($total_data); $i++){
				if(explode('-', ($total_data[$i]['date_of_transact'])[0] == $date)){
					array_push($recent_data, $total_data[$i]);
				}
			}
			return $recent_data;
		} 
		return $total_data;

	}

	function add_data(string $transact_type, string $money_spent, string $card_type){ # Work on LATER

		DB::query('INSERT INTO transactions (transact_type, money_spent, card_type) VALUES (:tt, :ms, :ct)', array(':tt' => $transact_type, ':ms' => $money_spent, ':ct' => $card_type));
	}
	
	function sort_by_card(array $data){
		$sorted_by_cards = array(array(), array());
		foreach ($data as $entry) {
			if($entry['card_type'] == 'C'){
				array_push($sorted_by_cards[0], $entry);
			} else if($entry['card_type'] == 'D') {
				array_push($sorted_by_cards[1], $entry);
			}
		}
		$retVals = array('card', $sorted_by_cards);
		return json_encode($retVals); #Ok, I'm assuming that when I encode an array, all elements inside also get encoded, but I want to test that. Erase this comment when testing is successful
	}


	 function sort_by_expend(array $data){
	 	$copy = $data;
		for($i = 1; $i < count($copy); $i++){
			$temp = $copy[$i - 1];
			$j = $i - 1;
			while((int)($copy[$j]['money_spent']) >= (int)($temp['money_spent'] ) && $j >= 0){
				#swap
				$copy[$j + 1] = $copy[$j];
				$j--;
			}
			$copy[j + 1] = $temp;

		}
		$retVals = array('expend', $copy);
		return json_encode($retVals);
	}

	function get_transact_type(string $column){
		switch ($column) {
			case 'shopping':
				return 1;
				break;
			
			case 'electricity':
				return 2;
				break;

			case 'water':
				return 3;
				break;

			case 'mortgage':
				return 4;
				break;

			default:
				return 0;
				break;
		}
	}


	function sort_by_transact($data){
		$transact_types = array(array('0'), array('1'), array('2'), array('3'), array('4'));

		foreach ($data as $entry) {
			for($i = 0; $i < count($transact_types); $i++){
				if(self::get_transact_type($entry['transact_type']) == (int)($transact_types[$i][0])){
					array_push($transact_types[$i], $entry);
				}
			}
		}
		$retVals = array('transact', $transact_types);
		return json_encode($retVals);
	}
}