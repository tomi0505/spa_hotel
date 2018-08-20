<?php

if($_POST){	
	if ($_POST['action'] == 'addRunner') {
	
		$fname = htmlspecialchars($_POST['txtFirstName']);
		$lname = htmlspecialchars($_POST['txtLastName']);
		$gender = htmlspecialchars($_POST['ddlGender']);
		$minutes = htmlspecialchars($_POST['txtMinutes']);
		$seconds = htmlspecialchars($_POST['txtSeconds']);
		if(preg_match('/[^\w\s]/i', $fname) || preg_match('/[^\w\s]/i', $lname)) {
			fail('Podano niew³aœciwe nazwisko.');
		}
		if( empty($fname) || empty($lname) ) {
			fail('Proszê wprowadziæ imiê i nazwisko.');
		}
		if( empty($gender) ) {
			fail('Proszê wybraæ p³eæ.');
		}
		if( empty($minutes) || empty($seconds) ) {
			fail('Proszê podaæ minuty i sekundy.');
		}
		
		$time = $minutes.":".$seconds;

		$query = "INSERT INTO runners SET first_name='$fname', last_name='$lname', gender='$gender', finish_time='$time'";
		$result = db_connection($query);
		
		if ($result) {
			$msg = "Zawodnik: ".$fname." ".$lname." zosta³ dodany" ;
			success($msg);
		} else {
			fail('Dodanie zawodnika nie powiod³o siê.');
		}
		exit;
	}
}

if($_GET){
	if($_GET['action'] == 'getRunners'){
		$query = "SELECT first_name, last_name, gender, finish_time FROM runners order by finish_time ASC ";
		$result = db_connection($query);
		
		$runners = array();

		while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
			array_push($runners, array('fname' => $row['first_name'], 'lname' => $row['last_name'], 'gender' => $row['gender'], 'time' => $row['finish_time']));
		}
		echo json_encode(array("runners" => $runners));
		exit;
	}
}	
	function db_connection($query) {
		mysql_connect('127.0.0.1', 'runner_db_user', 'runner_db_password')
			OR die(fail('Brak ³¹cznoœci z baz¹ danych.'));
		mysql_select_db('race_info');

		return mysql_query($query);
	}
	
	function fail($message) {
		die(json_encode(array('status' => 'fail', 'message' => $message)));
	}
	function success($message) {
		die(json_encode(array('status' => 'success', 'message' => $message)));
	}
?>
