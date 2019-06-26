'use strict';

var Index = {
    addFuncionario: () => {
        $(".add-novo").off().on("click", function(e){
            e.preventDefault();
            $(".overlay-add-cliente").fadeIn(function(){
                $(".fechar-over").off().on("click", function(e){
                    e.preventDefault();
                    $(".overlay-add-cliente").fadeOut();
                    $('.cadastra-pessoa input[type="text"], .cadastra-pessoa textarea').val("");
                });
            });
        });
    },
    insertPessoa: () => {
        $(".cadastra-pessoa").on("submit", function(e){
            e.preventDefault();
            let arrayJSON;
            arrayJSON = '{';
            $('.cadastra-pessoa input[type="text"], .cadastra-pessoa textarea,.cadastra-pessoa select').each(function(e,item){
                arrayJSON += '"' + $(item).attr("name") + '"';
                arrayJSON += ':';
                arrayJSON += '"' + $(item).val().replace(/(?:\r\n|\r|\n)/g, '<br>') + '",';
            });
            arrayJSON = arrayJSON.substring(0, (arrayJSON.length -1));
            arrayJSON += '}';

            let _action = $(".cadastra-pessoa").attr("action");
            let _method = $(".cadastra-pessoa").attr("method");
            let response = Padrao.jsonPostPut(_action, "data=" + arrayJSON, _method);
            if(response != 0){
                Padrao.chamaMensagem("Inserido com sucesso.", "success");
                $(".cadastra-pessoa .enviar-btn").remove();
            }else{
                Padrao.chamaMensagem("Ocorreu algum erro. Comunique o problema.", "error");
            }
        });
    },
    getPessoa: () => {
        let _action = documentUrl + "webservices/servicesClient.php";
        let response = Padrao.jsonGet(_action);
        let html = "";
        if(response != 0){
            $.each(response, function(i,item){
                let cli = JSON.parse(item);
                
                html += '<li>';
                html += '<a href="' + documentUrl + 'details.php?cliente=' + cli['token'] + '-' + Padrao.Slug(cli['nome']) +'" title="' + cli['nome'] + '">';
                html += cli['nome'] + ' - ' + cli['cpf'] + ' | ' + cli['profissao'];
                html += '<div class="icon-options">';
                html += '<span class="btn-acessar">Acessar</span>';
                html += '</div>';
                html += '</a>';
                html += '</li>';
            });
            $("#dados-clientes").find("ul").html(html);
        }else{
            $("#dados-clientes").find("ul").html("Erro - Comunique este erro ao Desenvovledor.");
        }
    },
    ready: () => {
        Index.insertPessoa();
        Index.addFuncionario();
        Index.getPessoa();
    }
}

$(window).on("load", function(){
    Index.ready();
});