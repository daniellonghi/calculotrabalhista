<?php
// INCLUDE CONNECTION
require_once('databaseConnection.php');

class Companies{
    function insertCompany($razaosocial, $cnpj, $jornada, $admissao, $demissao, $contato, $primeirosalario, $ultimosalario, $salariobase, $returnIDClient){
        $_razaosocial = $razaosocial;
        $_cnpj = $cnpj;
        $_jornada = $jornada;
        $_admissao = explode("/", $admissao)[2] . "-" . explode("/", $admissao)[1] . "-" . explode("/", $admissao)[0];
        $_demissao = explode("/", $demissao)[2] . "-" . explode("/", $demissao)[1] . "-" . explode("/", $demissao)[0];
        $_contato = $contato;
        $_primeirosalario = $primeirosalario;
        $_ultimosalario = $ultimosalario;
        $_salariobase = $salariobase;

        $conection = new databaseConnection();
        $link = $conection->getConnection();

        if ($link) {
            $sql = "INSERT INTO empresas (razaosocial, cnpj, jornada, admissao, demissao, contato, primeirosalario, ultimosalario, salariobase, idcliente_fk)
                    VALUES ('$_razaosocial', '$_cnpj', '$_jornada', '$_admissao', '$_demissao', '$_contato', '$_primeirosalario', '$_ultimosalario', '$_salariobase', '$returnIDClient')";

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

    function registerWork($datainicial, $datafinal, $hentrada, $hsaida, $idtokenemp, $idtokencli){
        $_datainicial = explode("/", $datainicial)[2] . "-" . explode("/", $datainicial)[1] . "-" . explode("/", $datainicial)[0];
        $_datafinal = explode("/", $datafinal)[2] . "-" . explode("/", $datafinal)[1] . "-" . explode("/", $datafinal)[0];
        $_hentrada = $hentrada;
        $_hsaida = $hsaida;
        $_idtokenemp = explode("-", $idtokenemp)[0];
        $_idtokencli = explode("-", $idtokencli)[2];

        $conection = new databaseConnection();
        $link = $conection->getConnection();

        if ($link) {
            $sql = "INSERT INTO registrohoras (datainicial,datafinal , horaentrada, horasaida, idempresa_fk, idcliente_fk)
                    VALUES ('$_datainicial', '$_datafinal', '$_hentrada', '$_hsaida', '$_idtokenemp', '$_idtokencli')";

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

    function getWorkedHours($token){
        if($token){
            $conection = new databaseConnection();
            $link = $conection->getConnection();

            if ($link) {
                $sql = "SELECT registrohoras.idregistro, registrohoras.datainicial, registrohoras.datafinal, registrohoras.horaentrada, registrohoras.horasaida FROM clientes inner join registrohoras on clientes.idcliente = registrohoras.idcliente_fk where clientes.token like '$token' ORDER BY registrohoras.datainicial";
                
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
            return 0;
        }
        $link->close();
    }

    function updateCompany($_razaosocial, $_cnpj, $_jornada, $_admissao, $_demissao, $_contato, $_primeirosalario, $_ultimosalario, $_salariobase, $_idtokenemp){
        $conection = new databaseConnection();
        $link = $conection->getConnection();

        $_admissao = explode("/", $_admissao)[2] . "-" . explode("/", $_admissao)[1] . "-" . explode("/", $_admissao)[0];
        $_demissao = explode("/", $_demissao)[2] . "-" . explode("/", $_demissao)[1] . "-" . explode("/", $_demissao)[0];

        if ($link) {
            $sql = "UPDATE empresas SET ";
            $sql .= "razaosocial = '$_razaosocial', cnpj = '$_cnpj', ";
            $sql .= "jornada = '$_jornada', admissao = '$_admissao',";
            $sql .= "demissao = '$_demissao', primeirosalario = '$_primeirosalario',";
            $sql .= "ultimosalario = '$_ultimosalario', salariobase = '$_salariobase',";
            $sql .= "contato = '$_contato' ";
            $sql .= "WHERE idempresa = $_idtokenemp";

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

    function getCompanies($_token = null){
        $conection = new databaseConnection();
        $link = $conection->getConnection();

        if($_token){
            if ($link) {
                $sql = "SELECT * FROM empresas idempresa like '$_token'";
                
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
}
?>