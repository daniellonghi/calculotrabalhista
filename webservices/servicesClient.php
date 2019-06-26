<?php
require_once('Clients.php');
require_once('Companies.php');

$_methodRequest = $_SERVER["REQUEST_METHOD"];

// IF FOR ADDING CLIENT
// IF FOR GETTING CLIENT
// IF FOR UPDATING CLIENT
if($_methodRequest == "POST"){
    $dataDecoded = json_decode($_POST["data"],true);

    $_nome = $dataDecoded["nome"];
    $_cpf = $dataDecoded["cpf"];
    $_profissao = utf8_decode($dataDecoded["profissao"]);
    $_fixo = $dataDecoded["fixo"];
    $_celular = $dataDecoded["celular"];
    $_anotacoes = utf8_decode($dataDecoded["anotacoes"]);
    $_token = rand(100,10000);

    //INSERT CLIENT
    $_IC = new Clients();
    $_returnIDClient = $_IC->insertClient($_nome, $_cpf, $_profissao, $_fixo, $_celular, $_anotacoes, $_token);
    
    if ($_returnIDClient != 0){
        $_razaosocial = utf8_decode($dataDecoded["razaosocial"]);
        $_cnpj = $dataDecoded["cnpj"];
        $_jornada = $dataDecoded["jornada"];
        $_admissao = $dataDecoded["admissao"];
        $_demissao = $dataDecoded["demissao"];
        $_contato = utf8_decode($dataDecoded["contato"]);
        $_primeirosalario = $dataDecoded["primeirosalario"];
        $_ultimosalario = $dataDecoded["ultimosalario"];
        $_salariobase = $dataDecoded["salariobase"];

        $_IE = new Companies();
        $_returnIDCompany = $_IE->insertCompany($_razaosocial, $_cnpj, $_jornada, $_admissao, $_demissao, $_contato, $_primeirosalario, $_ultimosalario, $_salariobase, $_returnIDClient);

        // DELETE IF CLIENT HAS BEEN INCLUDED WITHOUT COMPANY
        if($_returnIDCompany == 0){
            $_IC->removeClient($_returnIDClient);
        }
    }
     if($_returnIDClient && $_returnIDCompany){
         echo $_returnIDClient;
     }else{
         echo 0;
     }
}else if($_methodRequest == "GET"){
    if(isset($_GET["cliente"])){
        $personData = $_GET["cliente"];
        // GET CLIENTS WITH ID
        $token = explode("-", $personData)[0];
        $_IC = new Clients();
        $_returnClients = $_IC->getClients($token);

        if ($_returnClients) {
            $newArr;
            while ($eachRow = $_returnClients->fetch_assoc()) {
                $string_Vetor = '{"anotacoes":"'.utf8_encode($eachRow["anotacoes"]);
                $string_Vetor .= '","celular":"'.$eachRow["celular"].'","fixo":"'.$eachRow["fixo"];
                $string_Vetor .= '","nome":"'.$eachRow["nome"].'",' . '"cpf":"'.$eachRow["cpf"];
                $string_Vetor .= '",' . '"profissao":"'.utf8_encode($eachRow["profissao"]);
                $string_Vetor .= '", "razaosocial":"'.utf8_encode($eachRow["razaosocial"]);
                $string_Vetor .= '", "cnpj":"'.$eachRow["cnpj"];
                $string_Vetor .= '", "jornada":"'.$eachRow["jornada"];
                $string_Vetor .= '", "contato":"'.utf8_encode($eachRow["contato"]);
                $string_Vetor .= '", "primeirosalario":"'.$eachRow["primeirosalario"];
                $string_Vetor .= '", "ultimosalario":"'.$eachRow["ultimosalario"];
                $string_Vetor .= '", "salariobase":"'.$eachRow["salariobase"];
                $string_Vetor .= '", "admissao":"'.$eachRow["admissao"];
                $string_Vetor .= '", "demissao":"'.$eachRow["demissao"];
                $string_Vetor .= '", "idtokencomp":"'.$eachRow["idempresa"].'-'.$eachRow["idcliente"];
                $string_Vetor .= '", "idtokencli":"';
                $string_Vetor .= rand(0,99999) . "-" . rand(0,99) . "-" .$eachRow["idcliente"];
                $string_Vetor .= "-".$eachRow["token"].'"}';
                $newArr[] = $string_Vetor;
            }
            echo json_encode($newArr);
        }
    }else{
        // GET CLIENTS NO ID
        $_IC = new Clients();
        $_returnClients = $_IC->getClients();

        if ($_returnClients) {
            $newArr;
            while ($eachRow = $_returnClients->fetch_assoc()) {
                $newArr[] = '{"anotacoes":"'.utf8_encode($eachRow["anotacoes"]).'","celular":"'.$eachRow["celular"].'","fixo":"'.$eachRow["fixo"].'","nome":"'.$eachRow["nome"].'",' . '"cpf":"'.$eachRow["cpf"].'",' . '"profissao":"'.utf8_encode($eachRow["profissao"]).'", "token":"'.$eachRow["token"].'"}';
            }
            echo json_encode($newArr);
        }
    }
}else if($_methodRequest == "PUT"){
    $dataDecoded = json_decode(file_get_contents("php://input"));

    $_cpf = $dataDecoded->cpf;
    $_profissao = utf8_decode($dataDecoded->profissao);
    $_fixo = $dataDecoded->fixo;
    $_celular = $dataDecoded->celular;
    $_anotacoes = utf8_decode($dataDecoded->anotacoes);
    $_idtoken = $dataDecoded->idtokencli;

    //UPDATE CLIENT
    $_IC = new Clients();
    $_returnIDClient = $_IC->updateClient($_cpf, $_profissao, $_fixo, $_celular, $_anotacoes, $_idtoken);

}else{
    echo "Erro.";
}
?>