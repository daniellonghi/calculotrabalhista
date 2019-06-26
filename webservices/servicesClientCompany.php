<?php
require_once('Companies.php');

$_methodRequest = $_SERVER["REQUEST_METHOD"];

// IF FOR UPDATING COMPANY
if($_methodRequest == "PUT"){
    $dataDecoded = json_decode(file_get_contents("php://input"));

    $_razaosocial = utf8_decode($dataDecoded->razaosocial);
    $_cnpj = $dataDecoded->cnpj;
    $_jornada = $dataDecoded->jornada;
    $_admissao = $dataDecoded->admissao;
    $_demissao = $dataDecoded->demissao;
    $_contato = utf8_decode($dataDecoded->contato);
    $_primeirosalario = $dataDecoded->primeirosalario;
    $_ultimosalario = $dataDecoded->ultimosalario;
    $_salariobase = $dataDecoded->salariobase;
    $_idtokenemp = explode("-", $dataDecoded->idtokencomp)[0];

    //UPDATE COMPANY
    $_IC = new Companies();
    $_returnIDCompany = $_IC->updateCompany($_razaosocial,
                        $_cnpj, $_jornada, $_admissao,
                        $_demissao, $_contato, $_primeirosalario,
                        $_ultimosalario, $_salariobase,
                        $_idtokenemp);

}else{
    echo "Erro.";
}
?>