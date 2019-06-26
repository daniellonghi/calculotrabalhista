'use strict';

var Padrao = {
	alteraEmpresa: () => {
        $(".alter-empresa").off().on("click", function(e){
            e.preventDefault();

            //FAZ AJAX PUXAR DADOS EMPRESA

            $(".overlay-alter-empresa").fadeIn(function(){
                $(".fechar-over").off().on("click", function(e){
                    e.preventDefault();
                    $(".overlay-alter-empresa").fadeOut();
                });
            });
        });
    },
    alteraHorario: () => {
        $(".btn-alterar").off().on("click", function(e){
            e.preventDefault();
            //FAZ AJAX PUXAR DADOS EMPRESA

            $(".overlay-alter-registro-hora").fadeIn(function(){
                $(".fechar-over").off().on("click", function(e){
                    e.preventDefault();
                    $(".overlay-alter-registro-hora").fadeOut();
                });
            });
        });

        $(".btn-excluir").off().on("click", function(e){
            e.preventDefault();
            //FAZ AJAX PUXAR DADOS EMPRESA

            $(this).parent().parent().parent().remove();
        });
    },
    checaKeyPressed: () => {
        $(document).keyup(function(e) {
            if (e.keyCode == 27){
                if ($(".item-overlay").css("display") != "none"){
                    $(".item-overlay").fadeOut();
                }
            }
        });
    },
    menuNavegacao: () => {
        $(".menu-navigation ul li a").on("click", function(e){
            e.preventDefault();
            let _this = $(this).parent();
            let attr = $(".font-weight").find("a").attr("href");
            $(attr).hide(0,function(){
                $(".font-weight").removeClass("font-weight");
                _this.addClass("font-weight");
                let attr = $(".font-weight").find("a").attr("href");
                $(attr).show(300);
            });            
        }); 
        let attr = $(".font-weight").find("a").attr("href");
        $(attr).show(300);
    },
    mascarasCampos: () => {
        $('.cpf-mask').mask('000.000.000-00');
        $('.fixo-mask').mask('(00) 0000-0000');
        $('.cel-mask').mask('(00) 0 0000-0000');
        $('.data-mask').mask('00/00/0000');
        $('.sal-mask').mask('#.##0,00', { reverse: true });
        $('.cnpj-mask').mask('00.000.000/0000-00');
        $('.hora-mask').mask('00:00');
    },
    chamaMensagem: (mensagem, tipo) => {
        if(tipo == "success"){
            $("#mensagens-alerta").removeClass();
            $("#mensagens-alerta").addClass("success");
            $("#mensagens-alerta span").text(mensagem);
            $("#mensagens-alerta").fadeIn(function(){
                setTimeout(function(){
                    $("#mensagens-alerta").fadeOut();
                },5000);
            });
        }else{
            $("#mensagens-alerta").removeClass();
            $("#mensagens-alerta").addClass("error");
            $("#mensagens-alerta span").text(mensagem);
            $("#mensagens-alerta").fadeIn(function(){
                setTimeout(function(){
                    $("#mensagens-alerta").fadeOut();
                },5000);
            });
        }
    },
    formataData: (item) => {
        let data = item.split("-");
        return data[2] + "/" + data[1] + "/"  + data[0];
    },
    windowResize: () => {
        $(window).resize(function(){
            let _heightWindow = $("html").height() >= window.innerHeight ? $("html").height() : window.innerHeight;
            $(".item-overlay").css("height",_heightWindow);
        });
        // INITIALIZE ON START
        let _heightWindow = $("html").height() >= window.innerHeight ? $("html").height() : window.innerHeight;
        $(".item-overlay").css("height", _heightWindow);
    },
    jsonPostPut: (action, data, method) => {
        let responseService;
        $.ajax({
            type: method,
            url: action,
            data: data,
            async: false,
            dataType: "json"
        }).done(function(responseText){
            responseService = responseText;
        });
        return responseService;
    },
    jsonGet: (action, data=null) => {
        let responseService;
        $.ajax({
            type: "GET",
            url: action,
            data: data,
            async: false,
            dataType: "json"
        }).done(function(responseText){
            if(responseText){
                responseService = responseText;
            }else{
                responseService = 0 ;
            }
        });
        return responseService;
    },
	Slug: (str) => {
        str = str.replace(/^\s+|\s+$/g, '');
        str = str.toLowerCase();
        var from = "Ã£ÃÃ¡Ã¤Ã¢áº½Ã¨Ã©Ã«ÃªÃ¬Ã­Ã¯Ã®ÃµÃ²Ã³Ã¶Ã´Ã¹ÃºÃ¼Ã»Ã±Ã§Â·/_,:;";
        var to   = "aaaaaeeeeeiiiiooooouuuunc------";
        for (var i=0, l=from.length ; i<l ; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }

        str = str.replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
        return str;
    },
    caculaHoraTrabalhada: (dataInicial, dataFinal, horaInicial, horaFinal) => {
        //year, month, day, hours, minutes, seconds, milliseconds
        let anoInicial = dataInicial.split("-")[0];
        let mesInicial = dataInicial.split("-")[1];
        let diaInicial = dataInicial.split("-")[2];
        let hInicial = horaInicial.split(":")[0];
        let mInicial = horaInicial.split(":")[1];

        let anoFinal = dataFinal.split("-")[0];
        let mesFinal = dataFinal.split("-")[1];
        let diaFinal = dataFinal.split("-")[2];
        let hFinal = horaFinal.split(":")[0];
        let mFinal = horaFinal.split(":")[1];

        let hrIni = new Date(anoInicial, mesInicial, diaInicial, hInicial, mInicial, "00", "00");
        let hrF = new Date(anoFinal, mesFinal, diaFinal, hFinal, mFinal, "00", "00");

        let diff =(hrF.getTime() - hrIni.getTime()) / 1000;
        diff /= (60 * 60);
        return diff;
    },
    ready: () => {
        Padrao.alteraEmpresa();
        Padrao.checaKeyPressed();
        Padrao.menuNavegacao();
        Padrao.alteraHorario();
        Padrao.mascarasCampos();
        Padrao.windowResize();
    }
}

$(window).on("load", function(){
    Padrao.ready();
    window.documentUrl = "http://localhost/app/";
});
