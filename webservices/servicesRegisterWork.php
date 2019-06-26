<?php
require_once('Companies.php');

$_methodRequest = $_SERVER["REQUEST_METHOD"];

// IF FOR HOURS WORKED
if($_methodRequest == "POST"){
    $dataDecoded = json_decode($_POST["data"],true);

    $_datainicial = $dataDecoded['datainicial'];
    $_datafinal = $dataDecoded['datafinal'];
    $_hentrada = $dataDecoded['hentrada'];
    $_hsaida = $dataDecoded['hsaida'];
    $_idtokenemp = $dataDecoded['idtokencomp'];
    $_idtokencli = $dataDecoded['idtokencli'];

    //INSERT HOURS WORKED
    $_IC = new Companies();
    $_returnIDCompany = $_IC->registerWork($_datainicial, $_datafinal, 
                        $_hentrada, $_hsaida, $_idtokenemp,
                        $_idtokencli);

}else if($_methodRequest == "GET"){
    if(isset($_GET["cliente"])){
        // GET REGISTED WORK
        $personData = $_GET["cliente"];
        $token = explode("-", $personData)[0];
        $_IC = new Companies();
        $_returnWorkedHours = $_IC->getWorkedHours($token);

        if ($_returnWorkedHours->num_rows) {
            $newArr;
            while ($eachRow = $_returnWorkedHours->fetch_assoc()) {
                $newArr[] = '{"reghora":"'.$eachRow["idregistro"].'","datainicial":"'.$eachRow["datainicial"].'","datafinal":"'.$eachRow["datafinal"].'","horaentrada":"'.$eachRow["horaentrada"].'","horasaida":"'.$eachRow["horasaida"].'"}';
            }
            echo json_encode($newArr);
        }else{
            return 0;
        }
    }else{
        return 0;
    }
}else{
    echo "Erro.";
}
?>