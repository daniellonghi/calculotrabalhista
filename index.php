<!DOCTYPE HTML>
<html lang="pt-BR">
<head>

	<meta charset="utf-8">

	<meta name="rating" content="general"/>
	<meta name="language" content="portuguese, PT"/>
	<meta name="robots" content="index,follow"/>
	<meta name="googlebot" content="index,follow"/>
	<meta name="revisit-after" content="5 days"/>
	<meta name="generator" content="Sublime Text 3"/>
	<meta http-equiv="content-language" content="pt-br"/>
	<meta name="publisher" content="Daniel L F Pedro"/>
	<meta name="author" content="Daniel L F Pedro"/>
	<meta name="viewport" content="width=device-width, initial-scale=1"/>
	
	
	<link rel="icon" href="img/favicon.ico" type="image/x-icon"/>
	<link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon"/>	

	<!-- Metatags Safari -->
	<meta name="apple-mobile-web-app-capable" content="yes"/>
	<meta name="format-detection" content="telephone=no"/>

	<title>Cálculos Trabalhistas</title>

	<link href="https://fonts.googleapis.com/css?family=Roboto:400,500,700" rel="stylesheet">

	<link rel="stylesheet" href="css/reset.css">
	<link rel="stylesheet" href="css/padrao.css">
	<link rel="stylesheet" href="css/index.css">

</head>

<body>
	<header>
		<div class="header-content">
			<div class="wrapper-1024">
				<h1>Cálculos Trabalhistas</h1>
			</div>
		</div>
	</header>

	<main>		
		<div id="mensagens-alerta">
			<span class="titulo-mensagem"></span>
		</div>

		<div class="content-main">
			<div class="wrapper-1024">
				<nav class="menu-navigation">
					<h2>Menu</h2>
					<ul>
						<li class="font-weight"><a href="#dados-clientes" title="Clientes">> Clientes</a></li>
					</ul>
				</nav>
				<div class="content-itens">
					<div id="dados-clientes" class="lista-clientes">
						<div class="form-busca-cliente">
							<form action="#" method="POST" accept-charset="utf-8">
								<input type="text" placeholder="Digite o nome desejado...">
							</form>
							<a href="#" class="add-novo" title="Adicionar Cliente">Adicionar Novo</a>
						</div>
						<ul>
							
						</ul>
					</div>
				</div>
			</div>
		</div>
	</main>

	<div class="item-overlay overlay-add-cliente">
		<div class="centraliza-vertical">
			<div class="centraliza-auxiliar">
				<div class="wrapper-800">
					<div class="border-content">
						<a href="" class="fechar-over" title="Fechar">X</a>
						<div class="formulario-inscricao">
							<span class="obrigatorio"> (*) Itens obrigatórios.</span>
							<form autocomplete="off" class="cadastra-pessoa form-item" action="<?php echo "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]"?>webservices/servicesClient.php" method="POST" accept-charset="utf-8">
								<div class="itens-form-100 sm">
									<span class="dados-pessoais">Dados pessoais</span>
								</div>
								<div class="itens-form-33">
									<input type="text" placeholder="* Nome" name="nome">
								</div>
								<div class="itens-form-33">
									<input type="text" class="cpf-mask" placeholder="* CPF" name="cpf">
								</div>
								<div class="itens-form-33">
									<input type="text" placeholder="* Profissão" name="profissao">
								</div>
								<div class="itens-form-50">
									<input type="text" class="fixo-mask" placeholder="Fixo" name="fixo">
								</div>
								<div class="itens-form-50">
									<input type="text" class="cel-mask" placeholder="Celular" name="celular">
								</div>
								<div class="itens-form-100">
									<textarea name="anotacoes" placeholder="Anotações"></textarea>
								</div>
								<div class="itens-form-100 sm">
									<span class="dados-pessoais">Dados da empresa (<b>Obrigatório</b>)</span>
								</div>
								<div class="itens-form-33">
									<input type="text" placeholder="* Razão social (Nome fantasia)" name="razaosocial">
								</div>
								<div class="itens-form-33">
									<input type="text" class="cnpj-mask" placeholder="* CNPJ" name="cnpj">
								</div>
								<div class="itens-form-33">
									<select name="jornada">
										<option value="6">Jornada de 6h</option>
										<option value="7.33">Jornada de 7:33h</option>
										<option value="8">Jornada de 8h</option>
									</select>
								</div>
								<div class="itens-form-33">
									<input type="text" class="data-mask" placeholder="* Admissão" name="admissao">
								</div>
								<div class="itens-form-33">
									<input type="text" class="data-mask" placeholder="* Demissão" name="demissao">
								</div>
								<div class="itens-form-33">
									<input type="text" placeholder="Contato" name="contato">
								</div>
								<div class="itens-form-33">
									<input type="text" class="sal-mask" placeholder="* Primeiro Salário" name="primeirosalario">
								</div>
								<div class="itens-form-33">
									<input type="text" class="sal-mask" placeholder="* Último Salário" name="ultimosalario">
								</div>
								<div class="itens-form-33">
									<input type="text" class="sal-mask" placeholder="* Salário Base" name="salariobase">
								</div>
								<div class="itens-form-100 sm">
									<input class="enviar-btn" type="submit" value="Registrar">
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<footer>
		<div class="copyright">todos os direitos reservados, <?php echo date('Y')?>.</div>
	</footer>

	<script type="text/javascript" src="js/plugins/jquery-3.3.1.min.js"></script>
	<script type="text/javascript" src="js/plugins/jquery.mask.js"></script>
	<script type="text/javascript" src="js/padrao.js"></script>
	<script type="text/javascript" src="js/index.js"></script>
</body>
</html>