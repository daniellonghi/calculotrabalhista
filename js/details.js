'use strict';

var Details = {
    getPessoaEmpresa: () => {
        let _data = window.document.location.href.split("?")[1];
        let _action = documentUrl + "webservices/servicesClient.php";
        let response = Padrao.jsonGet(_action, _data);
        let html = "";
        if(response != 0){
            $.each(response, function(i,item){
                let cli = JSON.parse(item);
                $(".idtokenCli").val(cli["idtokencli"]);
                $(".idtokenComp").val(cli["idtokencomp"]);
                $(".nome-cliente-aberto").text(cli["nome"]);
                $(".ultimo-salario").text(cli["ultimosalario"]);
                $(".salario-base").text(cli["salariobase"]);
                $(".dias-trabalhados").text(cli["demissao"].split("-")[2]);
                $(".meses-trabalhados").text(cli["demissao"].split("-")[1]);
                $(".jornada-trabalho").text(cli["jornada"] + " - " + (Math.round(cli["jornada"] * 30)) + "h");
                Details.calculaRecisao(cli["ultimosalario"], cli["salariobase"], cli["demissao"], cli["jornada"]);
                
                //PREENCHE PESSOA
                $("#form-dados-cliente input[name='nome']").val(cli["nome"]);
                $("#form-dados-cliente input[name='cpf']").val(cli["cpf"]);
                $("#form-dados-cliente input[name='profissao']").val(cli["profissao"]);
                $("#form-dados-cliente input[name='fixo']").val(cli["fixo"]);
                $("#form-dados-cliente input[name='celular']").val(cli["celular"]);
                $("#form-dados-cliente textarea[name='anotacoes']").val(cli["anotacoes"].replace(/<br>/g,'\n'));
                
                //PREENCHE EMPRESA
                $("#alterar-dados-empresa input[name='razaosocial']").val(cli["razaosocial"]);
                $("#alterar-dados-empresa input[name='cnpj']").val(cli["cnpj"]);
                $("#alterar-dados-empresa select").val(cli["jornada"]);
                $("#alterar-dados-empresa input[name='admissao']").val(Padrao.formataData(cli["admissao"]));
                $("#alterar-dados-empresa input[name='demissao']").val(Padrao.formataData(cli["demissao"]));
                $("#alterar-dados-empresa input[name='contato']").val(cli["contato"]);
                $("#alterar-dados-empresa input[name='primeirosalario']").val(cli["primeirosalario"]);
                $("#alterar-dados-empresa input[name='ultimosalario']").val(cli["ultimosalario"]);
                $("#alterar-dados-empresa input[name='salariobase']").val(cli["salariobase"]);
                var _html = "";
                html += '<li>';
                html += '<a href="" class="alter-empresa" data-emp="'+cli["idtoken"]+'" title="Editar">';
                html += cli["razaosocial"] + " | DtAd: " + Padrao.formataData(cli["admissao"]) + " - DtDm: "  + Padrao.formataData(cli["demissao"]);
                html += '<div class="icon-options">';
                html += '<span class="btn-editar">Editar</span>';
                html += '</div>';
                html += '</a>';
                html += '</li>';
                $(".lista-empresas.empresas-trabalhadas ul").html(html);
                Padrao.alteraEmpresa();

            });
        }else{
            Padrao.chamaMensagem("Erro ao carregar Cliente.", "error");
        }
    },
    alteraPessoa: () =>{
        $("#form-dados-cliente").on("submit", function(e){
            e.preventDefault();
            let arrayJSON;
            arrayJSON = '{';
            $('#form-dados-cliente input[type="text"], #form-dados-cliente input[type="hidden"], #form-dados-cliente textarea').each(function(e,item){
                arrayJSON += '"' + $(item).attr("name") + '"';
                arrayJSON += ':';
                arrayJSON += '"' + $(item).val().replace(/(?:\r\n|\r|\n)/g, '<br>') + '",';
            });
            arrayJSON = arrayJSON.substring(0, (arrayJSON.length -1));
            arrayJSON += '}';

            let _action = $("#form-dados-cliente").attr("action");
            let _method = $("#form-dados-cliente").attr("method");
            let response = Padrao.jsonPostPut(_action, arrayJSON, _method);
            if(response != 0){
                Padrao.chamaMensagem("Inserido com sucesso.", "success");
                $("#form-dados-cliente .enviar-btn").remove();
            }else{
                Padrao.chamaMensagem("Ocorreu algum erro. Comunique o problema.", "error");
            }
        });
    },
    alteraEmpresa: () => {
        $("#alterar-dados-empresa").on("submit", function(e){
            e.preventDefault();
            let arrayJSON;
            arrayJSON = '{';
            $('#alterar-dados-empresa input[type="text"], #alterar-dados-empresa input[type="hidden"], #alterar-dados-empresa select').each(function(e,item){
                arrayJSON += '"' + $(item).attr("name") + '"';
                arrayJSON += ':';
                arrayJSON += '"' + $(item).val().replace(/(?:\r\n|\r|\n)/g, '<br>') + '",';
            });
            arrayJSON = arrayJSON.substring(0, (arrayJSON.length -1));
            arrayJSON += '}';

            let _action = $("#alterar-dados-empresa").attr("action");
            let _method = $("#alterar-dados-empresa").attr("method");
            let response = Padrao.jsonPostPut(_action, arrayJSON, _method);
            if(response != 0){
                Padrao.chamaMensagem("Alterada com sucesso.", "success");
                //$("#alterar-dados-empresa .enviar-btn").remove();
                Details.getPessoaEmpresa();
            }else{
                Padrao.chamaMensagem("Ocorreu algum erro. Comunique o problema.", "error");
            }
        });
    },
    registraCartaoPonto: () => {
        $("#form-cartao-ponto").on("submit", function(e){
            e.preventDefault();
            let arrayJSON;
            arrayJSON = '{';
            $('#form-cartao-ponto input[type="text"], #form-cartao-ponto input[type="hidden"]').each(function(e,item){
                arrayJSON += '"' + $(item).attr("name") + '"';
                arrayJSON += ':';
                arrayJSON += '"' + $(item).val() + '",';
            });
            arrayJSON = arrayJSON.substring(0, (arrayJSON.length -1));
            arrayJSON += '}';

            let _action = $("#form-cartao-ponto").attr("action");
            let _method = $("#form-cartao-ponto").attr("method");
            let response = Padrao.jsonPostPut(_action, "data=" + arrayJSON, _method);
            if(response != 0){
                Padrao.chamaMensagem("Alterada com sucesso.", "success");
                //$("#alterar-dados-empresa .enviar-btn").remove();
                Details.getCartaoPonto();
            }else{
                Padrao.chamaMensagem("Ocorreu algum erro. Comunique o problema.", "error");
            }
        });
    },
    ajustaMinutos: (minutos) => {
        this.minutos = Math.round(((minutos * 60)/100)) + "";
        this.minutos = this.minutos < 10 ? this.minutos = "0" + this.minutos : this.minutos;
        return this.minutos.substring(0,2);
    },
    getCartaoPonto : () => {
        let _data = window.document.location.href.split("?")[1];
        let _action = documentUrl + "webservices/servicesRegisterWork.php";
        let response = Padrao.jsonGet(_action, _data);
        let html = "";
        let horaTotalTrabalhada = 0;
        if(response){
            let html = "";
            $.each(response, function(i,item){
                let cartaoPonto = JSON.parse(item);
                let horaTrabalhada = Padrao.caculaHoraTrabalhada(cartaoPonto["datainicial"], cartaoPonto["datafinal"],  cartaoPonto["horaentrada"], cartaoPonto["horasaida"]);
                horaTotalTrabalhada += (((horaTrabalhada + "").split(".")[0] * 60) * 1) + Details.ajustaMinutos(((horaTrabalhada + "").split(".")[1] * 1)) * 1;
                html += '<li>';
                html += '<a href="" class="alter-horario" data-emp="" title="Editar">';
                html += 'D. Entrada: ' + Padrao.formataData(cartaoPonto["datainicial"]) + ' <--> ';
                html += 'D. Saída: ' + Padrao.formataData(cartaoPonto["datafinal"]) + ' | ';
                html += 'H. Entrou: ' + cartaoPonto["horaentrada"] + ' <--> ';
                html += 'H. Saiu: ' + cartaoPonto["horasaida"] + ' | ';
                html += 'Total: ' + (horaTrabalhada + "").split(".")[0] + "h" + Details.ajustaMinutos(((horaTrabalhada + "").split(".")[1]));
                html += '<div class="icon-options">';
                html += '<span class="btn-excluir">Excluir</span>';
                html += '</div>';
                html += '</a>';
                html += '</li>';
                $(".lista-empresas.lista-cartao-ponto").html(html);
            });
        }else{
            html += '<li>';
            html += '<a class="alter-horario" data-emp="" title="Editar">';
            html += 'Não há nenhum registro de Cartão Ponto deste Cliente.';
            html += '</a>';
            html += '</li>';
            $(".lista-empresas.lista-cartao-ponto").html(html);
            //Padrao.chamaMensagem("Erro ao carregar Cliente.", "error");
        }
        $("#extra-ultimo-50").text(Details.convertMoeda((horaTotalTrabalhada/60) * $(".trab-hora-ultimo-50").text().replace(",",".")));
        $("#extra-ultimo-100").text(Details.convertMoeda((horaTotalTrabalhada/60) * $(".trab-hora-ultimo-100").text().replace(",",".")));
        $("#extra-base-50").text(Details.convertMoeda((horaTotalTrabalhada/60) * $(".trab-hora-base-50").text().replace(",",".")));
        $("#extra-base-100").text(Details.convertMoeda((horaTotalTrabalhada/60) * $(".trab-hora-base-100").text().replace(",",".")));
        $("#qtd-horas-extra").text(((horaTotalTrabalhada/60) + "").split(".")[0] + "h" + Details.ajustaMinutos(((horaTotalTrabalhada/60) + "").split(".")[1]));
        $("#qtd-dias-extra").text(response.length);
        let horaMensalMedia = (((horaTotalTrabalhada/response.length)/60) * 30).toFixed(2);
        let horaDiariaMedia = (((horaTotalTrabalhada/response.length)/60)).toFixed(2);
        $("#dados-hora-extra .media-mensal").text((horaMensalMedia + "").split(".")[0]  + "h" + Details.ajustaMinutos((horaMensalMedia + "").split(".")[1]));
        $("#dados-hora-extra .media-diaria").text((horaDiariaMedia + "").split(".")[0]  + "h" + Details.ajustaMinutos((horaDiariaMedia + "").split(".")[1]));
    },
    calculaRecisao: (ultimosalario, salariobase, datademissao, horasemanal) => {
        let _ultimoSalario = (ultimosalario.replace(".","")).replace(",",".");
        let _ultimoBase = (salariobase.replace(".","")).replace(",",".");
        let _jornada = horasemanal * 30;
        let _inssUltimo, _inssBase;

        if((_ultimoSalario * 1) <= 1751.81){
            _inssUltimo = 0.08;
        }else if((_ultimoSalario * 1) <= 2919.72){
            _inssUltimo = 0.09;
        }else{
            _inssUltimo = 0.11;
        }

        if((_ultimoBase * 1) <= 1751.81){
            _inssBase = 0.08;
        }else if((_ultimoBase * 1) <= 2919.72){
            _inssBase = 0.09;
        }else{
            _inssBase = 0.11;
        }

        $("#dados-rescisao .ultimo-salario").text($("#dados-rescisao .ultimo-salario").text() + " - INSS " + (_inssUltimo * 100) + "%");
        $("#dados-rescisao .salario-base").text($("#dados-rescisao .salario-base").text() + " - INSS " + (_inssBase * 100) + "%");

        let salarioProporcionalUltimo = ((_ultimoSalario/_jornada) * horasemanal) * datademissao.split("-")[2];
        let salarioCheioUltimo = _ultimoSalario * 1;

        let salarioProporcionalBase = ((_ultimoBase/_jornada) * horasemanal) * datademissao.split("-")[2];
        let salarioCheioBase = _ultimoBase * 1;

        let decimoTerceiroProporcionalUltimo = (((_ultimoSalario * datademissao.split("-")[1]) -1) / 12) + (salarioProporcionalUltimo / 12);
        let decimoTerceiroVencidoUltimo = _ultimoSalario * 1;
        
        let decimoTerceiroProporcionalBase = (((_ultimoBase * datademissao.split("-")[1]) -1) / 12) + (salarioProporcionalBase / 12);
        let decimoTerceiroVencidoBase = _ultimoBase * 1;  

        let feriasProporcionalUltimo = (((_ultimoSalario * datademissao.split("-")[1]) -1) / 12)
        let feriasDecProporcionalUltimo =  ((salarioProporcionalUltimo * 1.3) / 12);
        let feriasCheiaUltimo = (_ultimoSalario * 1) + (_ultimoSalario * 0.3);

        let feriasProporcionalBase = (((_ultimoBase * datademissao.split("-")[1]) -1) / 12)
        let feriasDecProporcionalBase = ((salarioProporcionalBase * 1.3) / 12);
        let feriasCheiaBase = (_ultimoBase * 1) + (_ultimoBase * 0.3);
        
        $("#sal-pro-ultimo strong").text(Details.convertMoeda(salarioProporcionalUltimo));
        $("#sal-ven-ultimo strong").text(Details.convertMoeda(salarioCheioUltimo));
        $("#dec-pro-ultimo strong").text(Details.convertMoeda(decimoTerceiroProporcionalUltimo));
        $("#dec-ven-ultimo strong").text(Details.convertMoeda(decimoTerceiroVencidoUltimo));
        $("#fer-pro-ultimo strong").text(Details.convertMoeda(feriasProporcionalUltimo));
        $("#fer-ven-ultimo strong").text(Details.convertMoeda(salarioCheioUltimo));
        $("strong#dec-pro-ultimo").text(Details.convertMoeda(feriasDecProporcionalUltimo));
        $("strong#dec-ven-ultimo").text(Details.convertMoeda(salarioCheioUltimo * 0.3));
        let totalProUltimo = salarioProporcionalUltimo + decimoTerceiroProporcionalUltimo + feriasProporcionalUltimo + feriasDecProporcionalUltimo;
        $("#total-pro-ultimo").text(Details.convertMoeda(totalProUltimo));
        $("#total-inss-pro-ultimo").text(" - [INSS - " + Details.convertMoeda(totalProUltimo*_inssUltimo) + "]");
        let totalVenUltimo = salarioCheioUltimo + decimoTerceiroVencidoUltimo + salarioCheioUltimo + (salarioCheioUltimo * 0.3);
        $("#total-ven-ultimo").text(Details.convertMoeda(totalVenUltimo));
        $("#total-inss-ven-ultimo").text(" - [INSS - " + Details.convertMoeda(totalVenUltimo*_inssBase) + "]");
        $(".trab-hora-ultimo-50").text(Details.convertMoeda(((_ultimoSalario/_jornada)/2) + (_ultimoSalario/_jornada)));
        $(".trab-hora-ultimo-100").text(Details.convertMoeda((_ultimoSalario/_jornada) + (_ultimoSalario/_jornada)));
        
        let calculaHoraUltimo50 = Details.convertMoeda(_ultimoSalario/_jornada) + " (normal) + " + (Details.convertMoeda((_ultimoSalario/_jornada)/2)) + " (extra de 50%)";
        let calculaHoraUltimo100 = Details.convertMoeda(_ultimoSalario/_jornada) + " (normal) + " + Details.convertMoeda(_ultimoSalario/_jornada) + " (extra de 100%)";
        $(".trab-hora-ultimo-50").after("<strong data-hora-normal=" + Details.convertMoeda(_ultimoSalario/_jornada) + "> = " + calculaHoraUltimo50 + "</strong>");
        $(".trab-hora-ultimo-100").after("<strong> = " + calculaHoraUltimo100 + "</strong>");

        $("#sal-pro-base strong").text(Details.convertMoeda(salarioProporcionalBase));
        $("#sal-ven-base strong").text(Details.convertMoeda(salarioCheioBase));
        $("#dec-pro-base strong").text(Details.convertMoeda(decimoTerceiroProporcionalBase));
        $("#dec-ven-base strong").text(Details.convertMoeda(decimoTerceiroVencidoBase));
        $("#fer-pro-base strong").text(Details.convertMoeda(feriasProporcionalBase));
        $("#fer-ven-base strong").text(Details.convertMoeda(feriasCheiaBase));
        $("strong#dec-pro-base").text(Details.convertMoeda(feriasDecProporcionalBase));
        $("strong#dec-ven-base").text(Details.convertMoeda(salarioCheioBase * 0.3));
        let totalProBase = salarioProporcionalBase + decimoTerceiroProporcionalBase + feriasProporcionalBase + feriasDecProporcionalBase;
        $("#total-pro-base").text(Details.convertMoeda(totalProBase));
        $("#total-inss-pro-base").text(" - [INSS - " + Details.convertMoeda(totalProBase*_inssUltimo) + "]");
        let totalVenBase = salarioCheioBase + decimoTerceiroVencidoBase + salarioCheioBase + (salarioCheioBase * 0.3);
        $("#total-ven-base").text(Details.convertMoeda(totalVenBase));
        $("#total-inss-ven-base").text(" - [INSS - " + Details.convertMoeda(totalVenBase*_inssBase) + "]");
        $(".trab-hora-base-50").text(Details.convertMoeda(((_ultimoBase/_jornada)/2) + (_ultimoBase/_jornada)));
        $(".trab-hora-base-100").text(Details.convertMoeda((_ultimoBase/_jornada) + (_ultimoBase/_jornada)));

        let calculaHoraBase50 = Details.convertMoeda(_ultimoBase/_jornada) + " (normal) + " + (Details.convertMoeda((_ultimoBase/_jornada)/2)) + " (extra de 50%)";
        let calculaHoraBase100 = Details.convertMoeda(_ultimoBase/_jornada) + " (normal) + " + Details.convertMoeda((_ultimoBase/_jornada)) + " (extra de 100%)";
        $(".trab-hora-base-50").after("<strong data-hora-normal=" + Details.convertMoeda(_ultimoBase/_jornada) + "> = " + calculaHoraBase50 + "</strong>");
        $(".trab-hora-base-100").after("<strong> = " + calculaHoraBase100 + "</strong>");
    },
    convertMoeda: (moeda) => {
        this.moeda = moeda.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return this.moeda.split(" ")[1];
    },
    calculoPericulosidadeInsalubridade: (_salarioUltimo, _salarioBase) => {
        let salarioUltimo = (_salarioUltimo.replace(".","")).replace(",",".") * 1;
        let salarioBase = (_salarioBase.replace(".","")).replace(",",".") * 1;
        $("#sal-ultimo-periculosidade").text(_salarioUltimo + " + R$ " + Details.convertMoeda(salarioUltimo * 0.3) + " = R$ " + Details.convertMoeda((salarioUltimo * 1.3)));
        $("#sal-base-periculosidade").text(_salarioBase + " + R$ " + Details.convertMoeda(salarioBase * 0.3) + " = R$ " + Details.convertMoeda((salarioBase * 1.3)));

        let _horaNormal = $(".trab-hora-ultimo-50").parent().find("strong").attr("data-hora-normal").replace(".","").replace(",",".");
        $("#cada-hora-normal-ultimo").text(Details.convertMoeda(_horaNormal * 1) + " + R$ " + Details.convertMoeda(_horaNormal * 0.3) + " = R$ " + Details.convertMoeda(_horaNormal * 1.3));
        $("#cada-hora-50-ultimo").text(Details.convertMoeda(_horaNormal * 1) + " + R$ " + Details.convertMoeda(_horaNormal * 0.5) +  ") + R$ " + Details.convertMoeda((_horaNormal * 1.5) * 0.3) + " = R$ " + Details.convertMoeda(((_horaNormal * 1.5) * 0.3) + (_horaNormal * 1.5)));
        $("#cada-hora-100-ultimo").text(Details.convertMoeda(_horaNormal * 1) + " + R$ " + Details.convertMoeda(_horaNormal * 1) +  ") + R$ " + Details.convertMoeda((_horaNormal * 2) * 0.3) + " = R$ " + Details.convertMoeda(((_horaNormal * 2) * 0.3) + (_horaNormal * 2)));

        let _horaBase = $(".trab-hora-base-50").parent().find("strong").attr("data-hora-normal").replace(".","").replace(",",".");
        $("#cada-hora-normal-base").text(Details.convertMoeda(_horaBase * 1) + " + R$ " + Details.convertMoeda(_horaBase * 0.3) + " = R$ " + Details.convertMoeda(_horaBase * 1.3));
        $("#cada-hora-50-base").text(Details.convertMoeda(_horaBase * 1) + " + R$ " + Details.convertMoeda(_horaBase * 0.5) +  ") + R$ " + Details.convertMoeda((_horaBase * 1.5) * 0.3) + " = R$ " + Details.convertMoeda(((_horaBase * 1.5) * 0.3) + (_horaBase * 1.5)));
        $("#cada-hora-100-base").text(Details.convertMoeda(_horaBase * 1) + " + R$ " + Details.convertMoeda(_horaBase * 1) +  ") + R$ " + Details.convertMoeda((_horaBase * 2) * 0.3) + " = R$ " + Details.convertMoeda(((_horaBase * 2) * 0.3) + (_horaBase * 2)));

        // SALARIO BASE
        let _horaMedia50 = Details.convertMoeda(((_horaNormal * 1.5) * 0.3) + (_horaNormal * 1.5)).replace(".","").replace(",",".");
        let _horaMedia100 = Details.convertMoeda(((_horaNormal * 2) * 0.3) + (_horaNormal * 2)).replace(".","").replace(",",".");
        let _horaTrabalhadaDiaria = $("#dados-hora-extra .media-diaria").first().text();
        let _horaTrabalhadaMensal = $("#dados-hora-extra .media-mensal").first().text();
        $("#dados-periculosidade .media-ultimo-diaria-50").text( _horaTrabalhadaDiaria + " * " + Details.convertMoeda(_horaMedia50 * 1) + " = R$ " + Details.convertMoeda((((_horaTrabalhadaDiaria.split("h")[0] * 60) + (_horaTrabalhadaDiaria.split("h")[1] * 1)) * _horaMedia50)/60));
        $("#dados-periculosidade .media-ultimo-diaria-100").text(_horaTrabalhadaDiaria + " * " + Details.convertMoeda(_horaMedia100 * 1) + " = R$ " + Details.convertMoeda((((_horaTrabalhadaDiaria.split("h")[0] * 60) + (_horaTrabalhadaDiaria.split("h")[1] * 1)) * _horaMedia100)/60));
        $("#dados-periculosidade .media-ultimo-mensal-50").text( _horaTrabalhadaMensal + " * " + Details.convertMoeda(_horaMedia50 * 1) + " = R$ " + Details.convertMoeda((((_horaTrabalhadaMensal.split("h")[0] * 60) + (_horaTrabalhadaMensal.split("h")[1] * 1)) * _horaMedia50)/60));
        $("#dados-periculosidade .media-ultimo-mensal-100").text(_horaTrabalhadaMensal + " * " + Details.convertMoeda(_horaMedia100 * 1) + " = R$ " + Details.convertMoeda((((_horaTrabalhadaMensal.split("h")[0] * 60) + (_horaTrabalhadaMensal.split("h")[1] * 1)) * _horaMedia100)/60));

        // SALARIO BASE
        _horaMedia50 = Details.convertMoeda(((_horaBase * 1.5) * 0.3) + (_horaBase * 1.5)).replace(".","").replace(",",".");
        _horaMedia100 = Details.convertMoeda(((_horaBase * 2) * 0.3) + (_horaBase * 2)).replace(".","").replace(",",".");
        _horaTrabalhadaDiaria = $("#dados-hora-extra .media-diaria").first().text();
        _horaTrabalhadaMensal = $("#dados-hora-extra .media-mensal").first().text();
        $("#dados-periculosidade .media-base-diaria-50").text( _horaTrabalhadaDiaria + " * " + Details.convertMoeda(_horaMedia50 * 1) + " = R$ " + Details.convertMoeda((((_horaTrabalhadaDiaria.split("h")[0] * 60) + (_horaTrabalhadaDiaria.split("h")[1] * 1)) * _horaMedia50)/60));
        $("#dados-periculosidade .media-base-diaria-100").text(_horaTrabalhadaDiaria + " * " + Details.convertMoeda(_horaMedia100 * 1) + " = R$ " + Details.convertMoeda((((_horaTrabalhadaDiaria.split("h")[0] * 60) + (_horaTrabalhadaDiaria.split("h")[1] * 1)) * _horaMedia100)/60));
        $("#dados-periculosidade .media-base-mensal-50").text( _horaTrabalhadaMensal + " * " + Details.convertMoeda(_horaMedia50 * 1) + " = R$ " + Details.convertMoeda((((_horaTrabalhadaMensal.split("h")[0] * 60) + (_horaTrabalhadaMensal.split("h")[1] * 1)) * _horaMedia50)/60));
        $("#dados-periculosidade .media-base-mensal-100").text(_horaTrabalhadaMensal + " * " + Details.convertMoeda(_horaMedia100 * 1) + " = R$ " + Details.convertMoeda((((_horaTrabalhadaMensal.split("h")[0] * 60) + (_horaTrabalhadaMensal.split("h")[1] * 1)) * _horaMedia100)/60));

        // SALARIO BASE
        $("#ultimo-insalub-10").text("Adicional por mês de: R$ " + Details.convertMoeda(salarioUltimo * 0.1) + " = R$ " + Details.convertMoeda(salarioUltimo * 1.1));
        $("#ultimo-insalub-20").text("Adicional por mês de: R$ " + Details.convertMoeda(salarioUltimo * 0.2) + " = R$ " + Details.convertMoeda(salarioUltimo * 1.2));
        $("#ultimo-insalub-40").text("Adicional por mês de: R$ " + Details.convertMoeda(salarioUltimo * 0.4) + " = R$ " + Details.convertMoeda(salarioUltimo * 1.4));

        // SALARIO BASE
        $("#base-insalub-10").text("Adicional por mês de: R$ " + Details.convertMoeda(salarioBase * 0.1) + " = R$ " + Details.convertMoeda(salarioBase * 1.1));
        $("#base-insalub-20").text("Adicional por mês de: R$ " + Details.convertMoeda(salarioBase * 0.2) + " = R$ " + Details.convertMoeda(salarioBase * 1.2));
        $("#base-insalub-40").text("Adicional por mês de: R$ " + Details.convertMoeda(salarioBase * 0.4) + " = R$ " + Details.convertMoeda(salarioBase * 1.4));
    },
    ready: () => {
        Details.getPessoaEmpresa();
        Details.alteraPessoa();
        Details.alteraEmpresa();
        Details.registraCartaoPonto();
        Details.getCartaoPonto();
        Details.calculoPericulosidadeInsalubridade($("#dados-hora-extra .ultimo-salario").text(), $("#dados-hora-extra .salario-base").text());

    }
}

$(window).on("load", function(){
    Details.ready();
});