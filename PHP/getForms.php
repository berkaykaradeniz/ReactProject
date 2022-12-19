<?php
	header('Access-Control-Allow-Origin: http://localhost:3000');

	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "registry";
	$conn= new mysqli($servername, $username, $password, $dbname);
	$conn->set_charset("utf8");

    header("Content-type: application/json; charset=utf-8");
    
    $rows = array();
    $sql = "select id,fullname,email,phonenumber from form";
    if ($result = $conn -> query($sql)) {
        while ($row = $result -> fetch_row()) {
            $row0 = $row[0];
            $row1 = $row[1];
            $row2 = $row[2];
            $row3 = $row[3];

            $ro = array();
            $ro['id'] = $row0;
            $ro['fullname'] = $row1;
            $ro['email'] = $row2;
            $ro['phonenumber'] = $row3;

            $rows[] = $ro;
        }
        $result -> free_result();
    }
    echo json_encode($rows);  
    $conn->close();        
    ?>