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
                horaTotalTrabalhada += (((horaTrabalhada + "").split(".")[0] * 60) * 1) + ((horaTrabalhada + "").split(".")[1] * 1);
                html += '<li>';
                html += '<a href="" class="alter-horario" data-emp="" title="Editar">';
                html += 'D. Entrada: ' + Padrao.formataData(cartaoPonto["datainicial"]) + ' <--> ';
                html += 'D. Saída: ' + Padrao.formataData(cartaoPonto["datafinal"]) + ' | ';
                html += 'H. Entrou: ' + cartaoPonto["horaentrada"] + ' <--> ';
                html += 'H. Saiu: ' + cartaoPonto["horasaida"] + ' | ';
                html += 'Total: ' + (horaTrabalhada + "").split(".")[0] + "h" + (horaTrabalhada + "").split(".")[1];
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
        $("#extra-ultimo").text(Details.convertMoeda((horaTotalTrabalhada/60) * $(".trab-hora-ultimo").text().replace(",",".")));
        $("#extra-base").text(Details.convertMoeda((horaTotalTrabalhada/60)  * $(".trab-hora-base").text().replace(",",".")));
        $("#qtd-horas-extra").text(((horaTotalTrabalhada/60) + "").split(".")[0] + "h" + ((horaTotalTrabalhada/60) + "").split(".")[1]);
        $("#qtd-dias-extra").text(response.length);
    },
    calculaRecisao: (ultimosalario, salariobase, datademissao, horasemanal) => {
        let _ultimoSalario = (ultimosalario.replace(".","")).replace(",",".");
        let _ultimoBase = (salariobase.replace(".","")).replace(",",".");
        let _jornada = horasemanal * 30;
        let _inssUltimo, _inssBase;

        if(((_ultimoSalario * 1) <= 1751.81) || ((_ultimoBase * 1) <= 1751.81)){
            _inssUltimo = _inssBase = 0.08;
        }else if(((_ultimoSalario * 1) <= 2919.72) || ((_ultimoBase * 1) <= 2919.72)){
            _inssUltimo = _inssBase = 0.09;
        }else{
            _inssUltimo = _inssBase = 0.11;
        }

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
        $(".trab-hora-ultimo").text(Details.convertMoeda(_ultimoSalario/_jornada));

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
        $(".trab-hora-base").text(Details.convertMoeda(_ultimoBase/_jornada));
    },
    convertMoeda: (moeda) => {
        this.moeda = moeda.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return this.moeda.split(" ")[1];
    },
    ready: () => {
        Details.getPessoaEmpresa();
        Details.alteraPessoa();
        Details.alteraEmpresa();
        Details.registraCartaoPonto();
        Details.getCartaoPonto();
    }
}

$(window).on("load", function(){
    Details.ready();
});