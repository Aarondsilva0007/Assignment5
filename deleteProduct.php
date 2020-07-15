<?php
    include './dbCred.php';

    $id = $_POST['id'];

    $conn = mysqli_connect($servername, $username, $password, $dbname);

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $conn->query("delete from product where id = " . $id);

    mysqli_close($conn);
?>