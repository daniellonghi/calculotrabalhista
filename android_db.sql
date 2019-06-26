-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: 26-Jun-2019 às 21:12
-- Versão do servidor: 5.7.23
-- versão do PHP: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `android_db`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `clientes`
--

DROP TABLE IF EXISTS `clientes`;
CREATE TABLE IF NOT EXISTS `clientes` (
  `idcliente` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(150) NOT NULL,
  `cpf` varchar(16) NOT NULL,
  `profissao` varchar(100) DEFAULT NULL,
  `fixo` varchar(20) DEFAULT NULL,
  `celular` varchar(20) DEFAULT NULL,
  `anotacoes` text,
  `token` varchar(5) NOT NULL,
  PRIMARY KEY (`idcliente`)
) ENGINE=MyISAM AUTO_INCREMENT=77 DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `clientes`
--

INSERT INTO `clientes` (`idcliente`, `nome`, `cpf`, `profissao`, `fixo`, `celular`, `anotacoes`, `token`) VALUES
(40, 'Daniel Pedro', '084.893.339-71', 'Analista de Sistemas', '(42) 8558-2541', '(99) 9 9871-5690', '1º - Teste de anotações;<br>2º - asd;', '95824'),
(48, 'Teste', '123.231.213-21', 'Tester', '(12) 3123-2311', '(32) 1 3123-2311', 'Agora tem anotação.<br><br>Tem duas ainda.', '7550'),
(74, 'Daniel Teste', '123.231.213-21', '123123123123', '(12) 3123-2311', '(31) 2 3123-2311', 'Teste', '797'),
(75, 'Daniel Teste', '123.231.213-21', '123123123123', '(12) 3123-2311', '(31) 2 3123-2311', 'Teste', '2787');

-- --------------------------------------------------------

--
-- Estrutura da tabela `empresas`
--

DROP TABLE IF EXISTS `empresas`;
CREATE TABLE IF NOT EXISTS `empresas` (
  `idempresa` int(11) NOT NULL AUTO_INCREMENT,
  `razaosocial` varchar(200) NOT NULL,
  `cnpj` varchar(30) NOT NULL,
  `jornada` varchar(5) NOT NULL,
  `admissao` date NOT NULL,
  `demissao` date NOT NULL,
  `contato` varchar(20) DEFAULT NULL,
  `primeirosalario` varchar(20) NOT NULL,
  `ultimosalario` varchar(20) NOT NULL,
  `salariobase` varchar(20) NOT NULL,
  `idcliente_fk` int(11) NOT NULL,
  PRIMARY KEY (`idempresa`)
) ENGINE=MyISAM AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `empresas`
--

INSERT INTO `empresas` (`idempresa`, `razaosocial`, `cnpj`, `jornada`, `admissao`, `demissao`, `contato`, `primeirosalario`, `ultimosalario`, `salariobase`, `idcliente_fk`) VALUES
(27, 'Teste Razão Social', '12.312.312/3123-21', '7.33', '1995-02-15', '2001-02-12', '', '1.231.231,23', '1.231.231,23', '3.213,12', 75),
(26, 'Teste ', '12.312.312/3123-21', '7.33', '1995-02-15', '2001-02-12', '', '1.231.231,23', '1.231.231,23', '3.213,12', 74),
(22, 'Razão Social', '12.312.312/3123-12', '8', '1995-02-20', '1999-05-25', '', '12.321,31', '12.321,31', '21.312,32', 48),
(21, 'Agência A', '12.312.312/3123-21', '7.33', '1991-02-15', '1991-05-20', '', '880,00', '923,40', '1.023,40', 40);

-- --------------------------------------------------------

--
-- Estrutura da tabela `login`
--

DROP TABLE IF EXISTS `login`;
CREATE TABLE IF NOT EXISTS `login` (
  `idlogin` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(50) NOT NULL,
  `senha` text NOT NULL,
  PRIMARY KEY (`idlogin`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `login`
--

INSERT INTO `login` (`idlogin`, `login`, `senha`) VALUES
(1, 'email@hotmail.com', '123');

-- --------------------------------------------------------

--
-- Estrutura da tabela `registrohoras`
--

DROP TABLE IF EXISTS `registrohoras`;
CREATE TABLE IF NOT EXISTS `registrohoras` (
  `idregistro` int(11) NOT NULL AUTO_INCREMENT,
  `datainicial` date NOT NULL,
  `datafinal` date DEFAULT NULL,
  `horaentrada` varchar(5) NOT NULL,
  `horasaida` varchar(5) NOT NULL,
  `idempresa_fk` int(11) NOT NULL,
  `idcliente_fk` int(11) NOT NULL,
  PRIMARY KEY (`idregistro`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `registrohoras`
--

INSERT INTO `registrohoras` (`idregistro`, `datainicial`, `datafinal`, `horaentrada`, `horasaida`, `idempresa_fk`, `idcliente_fk`) VALUES
(1, '2019-02-25', '2019-02-25', '08:55', '17:58', 21, 40),
(3, '2019-02-22', '2019-02-23', '23:04', '02:25', 21, 40),
(4, '2019-02-24', '2019-02-24', '08:13', '17:34', 21, 40);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
