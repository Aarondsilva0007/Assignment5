<?php
    include './dbCred.php';

    $conn = mysqli_connect($servername, $username, $password);
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    if (mysqli_select_db($conn, "assignment5")) {
       mysqli_close($conn);
    } else {
        $query = "CREATE DATABASE assignment5";
        mysqli_query($conn, $query);
        mysqli_close($conn);
    }

    $conn = mysqli_connect($servername, $username, $password, $dbname);

    $query = "create table product(
        id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        prod_id VARCHAR(30) NOT NULL,
        prod_name VARCHAR(100) NOT NULL,
        prod_price VARCHAR(100) NOT NULL,
        prod_desc VARCHAR(200)
    )";
    $conn->query($query);

    $result  = $conn->query("select * from product order by id desc limit 5");

    echo "<table>";
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            echo "<tr>";

            $id = $row["prod_id"];
            $name = $row["prod_name"];
            $price = $row["prod_price"];
            $description = $row["prod_desc"];

            $description = strlen($description) > 20 ? substr($description, 0, 20)."..." : $description;

            echo "<td>".$id."</td><td>".$name."</td><td>".$price."</td><td>".$description."</td>";
            echo "<td id='".$row["id"]."'><button class='btn btn-outline-danger btn-sm' onclick='deleteProduct(".$row["id"].")'><i class='fa fa-trash-o'></button></td>";
            echo "</tr>";
        }
    }
    echo "</table>";

    mysqli_close($conn);
?>