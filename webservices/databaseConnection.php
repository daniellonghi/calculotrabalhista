<?php
class databaseConnection {
    function getConnection(){
        $_userName = "root";
        $_password = "";
        $_host = "localhost";
        $_port = "3306";
        $_db = "android_db";
        
        $link = mysqli_connect($_host . ":" . $_port, $_userName, $_password, $_db);

        if ($link) {
           return $link;
        }else{
            exit;
        }
    }
}
?>