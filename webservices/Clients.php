<?php
// INCLUDE CONNECTION
require_once('databaseConnection.php');

class Clients{
    function insertClient($nome, $cpf, $profissao, $fixo, $celular, $anotacoes, $token){
        $_nome = $nome;
        $_cpf = $cpf;
        $_profissao = $profissao;
        $_fixo =  $fixo;
        $_celular = $celular;
        $_anotacoes = $anotacoes;

        $conection = new databaseConnection();
        $link = $conection->getConnection();

        if ($link) {
            $sql = "INSERT INTO clientes (nome, cpf, profissao, fixo, celular, anotacoes, token)
                    VALUES ('$nome', '$cpf', '$profissao', '$fixo', '$celular', '$anotacoes', '$token')";
            
            if ($link->query($sql) === TRUE) {
                return $link->insert_id;
            } else {
                return 0;
            }
        }else{
            die("Conexão com banco falhou. Comunique o incidente.");
        }

        $link->close();
    }

    function updateClient($cpf, $profissao, $fixo, $celular, $anotacoes, $token){
        $conection = new databaseConnection();
        $link = $conection->getConnection();

        $_idcliente = explode("-", $token)[2];
        $_token = explode("-", $token)[3];

        if ($link) {
            $sql = "UPDATE clientes SET profissao = '$profissao', fixo = '$fixo', ";
            $sql .= "celular = '$celular', anotacoes = '$anotacoes' ";
            $sql .= "WHERE (cpf like '$cpf' and token = $_token and idcliente = $_idcliente)";

            if ($link->query($sql) === TRUE) {
                return 1;
            } else {
                return 0;
            }
        }else{
            die("Conexão com banco falhou. Comunique o incidente.");
        }

        $link->close();
    }
    
    function getClients($_token = null){
        $conection = new databaseConnection();
        $link = $conection->getConnection();

        if($_token){
            if ($link) {
                $sql = "SELECT * FROM clientes inner join empresas on clientes.idcliente = empresas.idcliente_fk where token like '$_token'";
                
                $result = $link->query($sql);

                if ($result) {
                    return $result;
                } else {
                    return 0;
                }
            }else{
                die("Conexão com banco falhou. Comunique o incidente.");
            }
        }else{
            if ($link) {
                $sql = "SELECT * FROM clientes";
                
                $result = $link->query($sql);
                if ($result) {
                    return $result;
                } else {
                    return 0;
                }
            }else{
                die("Conexão com banco falhou. Comunique o incidente.");
            }
        }
        $link->close();
    }

    function removeClient($idCliente){
        $conection = new databaseConnection();
        $link = $conection->getConnection();

        if ($link) {
            $sql = "DELETE FROM clientes WHERE idcliente=" . $idCliente;
            
            if ($link->query($sql) === TRUE) {
                return 1;
            } else {
                return 0;
            }
        }else{
            die("Conexão com banco falhou. Comunique o incidente.");
        }
        $link->close();
    }
}
?>