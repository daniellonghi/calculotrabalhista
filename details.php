<!DOCTYPE HTML>
<html lang="pt-BR">
<head>

	<meta charset="UTF-8">

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
					<h2><a href="/" title="Voltar">Voltar</a></h2>
					<ul>
						<li class="font-weight"><a href="#dados-cliente" title=" Dados do cliente">> Dados do cliente</a></li>
						<li><a href="#dados-horas" title="Registro horas">> Registro horas</a></li>
						<li><a href="#dados-rescisao" title="Rescisão">> Rescisão</a></li>
						<li><a href="#dados-hora-extra" title="Hora Extra">> Hora Extra</a></li>
						<li><a href="#dados-periculosidade" title="Periculosidade">> Periculosidade</a></li>
						<li><a href="#dados-insalubridade" title="Insalubridade">> Insalubridade</a></li>
					</ul>
				</nav>
				<div class="content-itens">
					<div id="dados-cliente" class="mostra-dados-cliente">
						<span class="para-o-cliente"><b>Dados do cliente</b>: <span class="nome-cliente-aberto"></span></span>
						<div class="formulario-inscricao">
							<span class="obrigatorio"> (*) Itens obrigatórios.</span>
							<form autocomplete="off" id="form-dados-cliente" class="form-item" action="<?php echo "http://$_SERVER[HTTP_HOST]/app/"?>webservices/servicesClient.php" method="PUT" accept-charset="utf-8">
								<div class="itens-form-100 sm">
									<input type="hidden" class="idtokenCli" name="idtokencli" value="">
									<span class="dados-pessoais">Dados pessoais</span>
								</div>
								<div class="itens-form-33">
									<input type="text" readonly placeholder="* Nome" name="nome">
								</div>
								<div class="itens-form-33">
									<input type="text" class="cpf-mask" readonly placeholder="* CPF" name="cpf">
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
								<div class="itens-form-100">
									<input class="enviar-btn" type="submit" value="Alterar">
								</div>
							</form>

							<div class="itens-form-100 sm">
								<span class="dados-pessoais">Dados da empresa</span>
							</div>
							<div class="lista-empresas empresas-trabalhadas">
								<ul>
									
								</ul>
							</div>
						</div>
					</div>

					<div id="dados-horas" class="mostra-dados-cliente">
						<span class="para-o-cliente"><b>Dados do cliente</b>: <span class="nome-cliente-aberto"></span></span>
						<div class="formulario-inscricao">
							<span class="obrigatorio"> (*) Itens obrigatórios.</span>
							<form autocomplete="off" id="form-cartao-ponto" class="form-item" action="<?php echo "http://$_SERVER[HTTP_HOST]/app/"?>webservices/servicesRegisterWork.php" method="POST" accept-charset="utf-8">
								<div class="itens-form-100 sm">
									<input type="hidden" class="idtokenComp" name="idtokencomp" value="">
									<input type="hidden" class="idtokenCli" name="idtokencli" value="">
									<span class="dados-pessoais">Dados de cartão ponto</span>
								</div>
								<div class="itens-form-18">
									<input type="text" class="data-mask" placeholder="* Data Entrada" name="datainicial">
								</div>
								<div class="itens-form-18">
									<input type="text" class="hora-mask" placeholder="* H. Entrada" name="hentrada">
								</div>
								<div class="itens-form-18">
									<input type="text" class="data-mask" placeholder="* Data Saída" name="datafinal">
								</div>
								<div class="itens-form-18">
									<input type="text" class="hora-mask" placeholder="* H. Saída" name="hsaida">
								</div>
								<div class="itens-form-25">
									<input class="enviar-btn" type="submit" value="Registrar">
								</div>
							</form>


							<div class="itens-form-100 sm">
								<span class="dados-pessoais">Dados do cartão ponto</span>
							</div>
							<div class="lista-empresas lista-cartao-ponto">
								<ul>
								</ul>
							</div>
						</div>
					</div>

					<div id="dados-rescisao" class="mostra-dados-cliente">
						<span class="para-o-cliente"><b>Dados do cliente</b>: <span class="nome-cliente-aberto"></span></span>
						<div class="formulario-inscricao">
							<div class="mostra-recisao">
								<div class="itens-50">
									<div class="cada-iten-recisao">
										<span class="cabecalho"><strong>Último Salário (R$ <span class="ultimo-salario"></span>)</strong></span>
									</div>
									<div id="sal-pro-ultimo" class="cada-iten-recisao">
										<span class="itens-recisao">Salário Proporcional (<span class="dias-trabalhados"></span>/30): R$ <strong></strong></span>
									</div>
									<div id="sal-ven-ultimo" class="cada-iten-recisao">
										<span class="itens-recisao">Salário Vencido (30/30): R$ <strong></strong></span>
									</div>
									<div id="dec-pro-ultimo" class="cada-iten-recisao">
										<span class="itens-recisao">13º Proporcional (<span class="meses-trabalhados"></span>/12): R$ <strong></strong></span>
									</div>
									<div id="dec-ven-ultimo" class="cada-iten-recisao">
										<span class="itens-recisao">13º Vencido (12/12): R$ <strong></strong></span>
									</div>
									<div id="fer-pro-ultimo" class="cada-iten-recisao">
										<span class="itens-recisao">Férias Proporcional (<span class="meses-trabalhados"></span>/12): Sal - R$ <strong></strong> +  (1/3) R$ <strong id="dec-pro-ultimo">300,00</strong></span>
									</div>

									<!-- SE TIVER FERIAS VENCIDAS -->
									<div id="fer-ven-ultimo" class="cada-iten-recisao">
										<span class="itens-recisao">Férias Vencidas (12/12): Sal - R$ <strong></strong> +  (1/3) R$ <strong id="dec-ven-ultimo">300,00</strong></span>
									</div>
									<!-- SE TIVER FERIAS VENCIDAS -->

									<div class="cada-iten-recisao">
										<span class="itens-recisao">Total Proporcional - R$ <strong id="total-pro-ultimo"></strong><span id="total-inss-pro-ultimo"></span></span>
										<span class="itens-recisao">Total Vencido - R$ <strong id="total-ven-ultimo"></strong><span id="total-inss-ven-ultimo"></span>
									</div>

								</div>
								<div class="itens-50">
									<div class="cada-iten-recisao">
										<span class="cabecalho"><strong>Salário Base (R$ <span class="salario-base"></span>)</strong></span>
									</div>
									<div id="sal-pro-base"class="cada-iten-recisao">
										<span class="itens-recisao">Salário Proporcional (<span class="dias-trabalhados"></span>/30): R$ <strong></strong></span>
									</div>
									<div id="sal-ven-base" class="cada-iten-recisao">
										<span class="itens-recisao">Salário Vencido (30/30): R$ <strong></strong></span>
									</div>
									<div id="dec-pro-base" class="cada-iten-recisao">
										<span class="itens-recisao">13º Proporcional (<span class="meses-trabalhados"></span>/12): R$ <strong></strong></span>
									</div>
									<div id="dec-ven-base" class="cada-iten-recisao">
										<span class="itens-recisao">13º Vencido (12/12): R$ <strong></strong></span>
									</div>
									<div id="fer-pro-base" class="cada-iten-recisao">
										<span class="itens-recisao">Férias Proporcional (<span class="meses-trabalhados"></span>/12): Sal - R$ <strong></strong> +  (1/3) R$ <strong id="dec-pro-base">300,00</strong></span>
									</div>

									<!-- SE TIVER FERIAS VENCIDAS -->
									<div id="fer-ven-base" class="cada-iten-recisao">
										<span class="itens-recisao">Férias Vencidas (12/12): Sal - R$ <strong></strong> +  (1/3) R$ <strong id="dec-ven-base">300,00</strong></span>
									</div>
									<!-- SE TIVER FERIAS VENCIDAS -->

									<div class="cada-iten-recisao">
										<span class="itens-recisao">Total Proporcional - R$ <strong id="total-pro-base"></strong><span id="total-inss-pro-base"></span>
										<span class="itens-recisao">Total Vencido - R$ <strong id="total-ven-base"></strong><span id="total-inss-ven-base"></span>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div id="dados-hora-extra" class="mostra-dados-cliente">
						<span class="para-o-cliente"><b>Dados do cliente</b>: <span class="nome-cliente-aberto"></span> (Jornada: <strong class="jornada-trabalho"></strong>)</span>
						<div class="formulario-inscricao">
							<div class="mostra-recisao">
								<div class="itens-50">
									<div class="cada-iten-recisao">
										<span class="cabecalho"><strong>Último Salário (R$ <span class="ultimo-salario"></span>) // R$ <span class="trab-hora-ultimo"></span></strong></span>
									</div>
									<div class="cada-iten-recisao">
										<span class="itens-recisao">Horas extras (média): R$ <strong id="extra-ultimo"></strong></span>
									</div>
								</div>
								<div class="itens-50">
									<div class="cada-iten-recisao">
										<span class="cabecalho"><strong>Salário Base (R$ <span class="salario-base">1.400,00</span>) // R$ <span class="trab-hora-base"></span></strong></span>
									</div>
									<div class="cada-iten-recisao">
										<span class="itens-recisao">Horas extras  (média): R$ <strong id="extra-base"></strong></span>
									</div>
								</div>
								<div class="itens-100">
									<span class="observacao-extra">* Hora extra calculada em relação ao(s) últimos <strong id="qtd-dias-extra"></strong> registros, totalizando <strong id="qtd-horas-extra"></strong> horas extras.</span>
								</div>
							</div>
						</div>
					</div>

					<div id="dados-periculosidade" class="mostra-dados-cliente">
						<span class="para-o-cliente"><b>Dados do cliente</b>: <span class="nome-cliente-aberto"></span></span>
						<div class="formulario-inscricao">
							<div class="mostra-recisao">
								<div class="itens-50">
									<div class="cada-iten-recisao">
										<span class="cabecalho"><strong>Último Salário (R$ <span class="ultimo-salario">1.200,00</span>)</strong></span>
									</div>
									<div class="cada-iten-recisao">
										<span class="itens-recisao">Periculosidade (30%): R$ <strong>1.234,00</strong></span>
									</div>
								</div>
								<div class="itens-50">
									<div class="cada-iten-recisao">
										<span class="cabecalho"><strong>Salário Base (R$ <span class="salario-base">1.400,00</span>)</strong></span>
									</div>
									<div class="cada-iten-recisao">
										<span class="itens-recisao">Periculosidade (30%): R$ <strong>1.234,00</strong></span>
									</div>
								</div>
							</div>
						</div>
						<div class="obs-box">
							<span class="descricao">
								* Adicional de insalubridade e de periculosidade <strong>não são acumulativos</strong>, ou seja, o profissional que desempenha funções perigosas e insalubres deverá optar pelo adicional que lhe for de maior benefício.
							</span>
						</div>
					</div>

					<div id="dados-insalubridade" class="mostra-dados-cliente">
						<span class="para-o-cliente"><b>Dados do cliente</b>: <span class="nome-cliente-aberto"></span></span>
						<div class="formulario-inscricao">
							<div class="mostra-recisao">
								<div class="itens-50">
									<div class="cada-iten-recisao">
										<span class="cabecalho"><strong>Último Salário (R$ <span class="ultimo-salario">1.200,00</span>)</strong></span>
									</div>
									<div class="cada-iten-recisao">
										<span class="itens-recisao">Insalubridade (10%): R$ <strong>1.234,00</strong></span>
									</div>
									<div class="cada-iten-recisao">
										<span class="itens-recisao">Insalubridade (20%): R$ <strong>1.234,00</strong></span>
									</div>
									<div class="cada-iten-recisao">
										<span class="itens-recisao">Insalubridade (30%): R$ <strong>1.234,00</strong></span>
									</div>
									<div class="cada-iten-recisao">
										<span class="itens-recisao">Insalubridade (40%): R$ <strong>1.234,00</strong></span>
									</div>
								</div>
								<div class="itens-50">
									<div class="cada-iten-recisao">
										<span class="cabecalho"><strong>Salário Base (R$ <span class="salario-base">1.400,00</span>)</strong></span>
									</div>
									<div class="cada-iten-recisao">
										<span class="itens-recisao">Insalubridade (10%): R$ <strong>1.234,00</strong></span>
									</div>
									<div class="cada-iten-recisao">
										<span class="itens-recisao">Insalubridade (20%): R$ <strong>1.234,00</strong></span>
									</div>
									<div class="cada-iten-recisao">
										<span class="itens-recisao">Insalubridade (30%): R$ <strong>1.234,00</strong></span>
									</div>
									<div class="cada-iten-recisao">
										<span class="itens-recisao">Insalubridade (40%): R$ <strong>1.234,00</strong></span>
									</div>
								</div>
							</div>
						</div>
						<div class="obs-box">
							<span class="descricao">
								* Adicional de insalubridade e de periculosidade <strong>não são acumulativos</strong>, ou seja, o profissional que desempenha funções perigosas e insalubres deverá optar pelo adicional que lhe for de maior benefício.
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>

	<div class="item-overlay overlay-alter-empresa">
		<div class="centraliza-vertical">
			<div class="centraliza-auxiliar">
				<div class="wrapper-800">
					<div class="border-content">
						<a href="" class="fechar-over" title="Fechar">X</a>
						<div class="formulario-inscricao">
							<span class="obrigatorio"> (*) Itens obrigatórios.</span>
							<form autocomplete="off" id="alterar-dados-empresa" class="form-item" action="<?php echo "http://$_SERVER[HTTP_HOST]/app/"?>webservices/servicesClientCompany.php" method="PUT" accept-charset="utf-8">
								<div class="itens-form-100 sm">
									<span class="dados-pessoais">Dados da empresa</span>
								</div>
								<div class="itens-form-33">
									<input type="hidden" class="idtokenComp" name="idtokencomp" value="">
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
								<div class="itens-form-100">
									<input class="enviar-btn" type="submit" value="Alterar">
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="item-overlay overlay-alter-registro-hora">
		<div class="centraliza-vertical">
			<div class="centraliza-auxiliar">
				<div class="wrapper-800">
					<div class="border-content">
						<a href="" class="fechar-over" title="Fechar">X</a>
						<div class="formulario-inscricao">
							<span class="obrigatorio"> (*) Itens obrigatórios.</span>
							<form autocomplete="off" class="form-item" action="#" method="POST" accept-charset="utf-8">
								<input type="hidden" name="empresa_funcionario" value="">
								<div class="itens-form-100 sm">
									<span class="dados-pessoais">Dados do registro</span>
								</div>
								<div class="itens-form-33">
									<input type="text" class="data-mask" placeholder="* Data" name="data">
								</div>
								<div class="itens-form-33">
									<input type="text" placeholder="* H. Entrada" class="hora-mask" name="hentrada">
								</div>
								<div class="itens-form-33">
									<input type="text" placeholder="* H. Saída" class="hora-mask" name="hsaida">
								</div>
								<div class="itens-form-100">
									<input class="enviar-btn" type="submit" value="Alterar">
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<footer>
		<div class="copyright">todos os direitos reservados, 2019.</div>
	</footer>

	<script type="text/javascript" src="js/plugins/jquery-3.3.1.min.js"></script>
	<script type="text/javascript" src="js/plugins/jquery.mask.js"></script>
	<script type="text/javascript" src="js/padrao.js"></script>
	<script type="text/javascript" src="js/details.js"></script>
</body>
</html>