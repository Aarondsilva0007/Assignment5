<?php 
    $num1 = $_POST["num1"];
    $num2 = $_POST["num2"];
    $flag;
    $i;
    $j;
    $arr = array();

    for ($i = $num1; $i <=$num2; $i++) {
        if ($i == 1 || $i == 0) {
            continue;
        } 
        $flag = 1;

        for ($j = 2; $j <= $i/2; $j++) {
            if ($i % $j == 0) {
                $flag = 0;
                break;
            }
        }

        if ($flag == 1) {
            array_push($arr, $i);
        }
    }

    for($i = 0; $i<count($arr); $i++) {
        echo $arr[$i]." ";
    }

?>