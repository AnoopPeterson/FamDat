<?php
include 'DB.php';

class Transaction{

	function get_all_data($index){
		$all_data = DB::query('SELECT transact_type, money_spent, card_type, date_of_transact FROM transactions WHERE username = :uname', array(':uname' => $_SESSION[$index]));
		return $all_data;
	}

	function data_preview($index){
		$total_data = self::get_all_data($index);
		if(count($total_data) > 30){ # If there are more than 30 elements in the array, might need to fix that, depending on how often people actually use this website
			$recent_data = array_splice($total_data, 1, 30);
			return $recent_data;
		} else {
			return array_splice($total_data, 1); // The first element is an auto-completed entry, with no value to it. So we cut it off.
		}

	}

	function add_data(string $transact_type, string $money_spent, string $card_type){

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
		return json_encode($retVals);
	}


	function sort_by_expend(array $data){ # Naturally, the one function I didn't do myself is also the one that doesn't work
		$sorted_by_expends = $data;
		for ($i = 1; $i < count($data); $i++){
			$temp = $sorted_by_expends[$i];
			$j = $i - 1;
			while ($j >= 0 && $sorted_by_expends[$j]['money_spent'] > $temp['money_spent']){
				$sorted_by_expends[$j + 1] = $sorted_by_expends[$j];
				$j--;
			}
			$sorted_by_expends[$j + 1] = $temp;
		}
		return json_encode(array('expend', $sorted_by_expends));
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
		$sorted_by_transacts = array(array(), array(), array(), array(), array());

		foreach ($data as $entry) {
				if(self::get_transact_type($entry['transact_type']) == 0){
					array_push($sorted_by_transacts[0], $entry);
				}
				if(self::get_transact_type($entry['transact_type']) == 1){
					array_push($sorted_by_transacts[1], $entry);
				}
				if(self::get_transact_type($entry['transact_type']) == 2){
					array_push($sorted_by_transacts[2], $entry);
				}
				if(self::get_transact_type($entry['transact_type']) == 3){
					array_push($sorted_by_transacts[3], $entry);	
				}
				if(self::get_transact_type($entry['transact_type']) == 4){
					array_push($sorted_by_transacts[4], $entry);
				}
		}

		$retVals = array('transact', $sorted_by_transacts);
		return json_encode($retVals);
	}
}