<?php
	header('Access-Control-Allow-Origin: http://localhost:3000');

	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "registry";
	$conn= new mysqli($servername, $username, $password, $dbname);
	$conn->set_charset("utf8");

    header("Content-type: application/json; charset=utf-8");
    
    $fullname = $_POST['fullname'];
    $email = $_POST['email'];
    $phonenumber = $_POST['phonenumber'];

    if(!empty($fullname) && !empty($email) && !empty($phonenumber))
    {
        $sql = "INSERT INTO form (fullname,email,phonenumber) 
        VALUES ('$fullname','$email','$phonenumber')";
        if ($conn->query($sql) === TRUE) {
            echo json_encode([
                "fullname" => $fullname,
                "state" => 1,
                "type" => "success",
                "message" => 'Kayıt Başarılı'
                ]
            );
        } else {
            echo json_encode([
                "state" => 0,
                "message" => 'Kayıt Hatası',
                "type" => "danger"
                ]
            );
        }
    }
    else
    {
        echo json_encode([
            "state" => 2,
            "message" => 'Eksik Bilgi',
            "type" => "warning"
            ]
        );
    }
    $conn->close();        

    ?>