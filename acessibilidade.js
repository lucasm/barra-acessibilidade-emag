/* 
    Acessibilidade
*/

$(document).ready(function() {
    
    var contraste = false;
    // containers
    var bg_escuro = 'header, #page-wrap, .footer_credit, .views-field-title, .item-list ul, .ui-widget-content';
    // textos
    var cor_clara = 'a, label, p, h1, h2, h3, h4, h5, h6, #sub-srv';
    // formulários e campos
    var color_bg_border = 'input, textarea, button';
    // filtro p&b para imagens
    var gray_filter = 'body';
    // bg: elemento pai / color: elementos filhos
    var herdeiros = 'body, table, tr, .box-content, .tab-content';
    // encontrar links dentro
    var encontra_link = '.social-icons, .ui-tabs-active .ui-state-active';
    // bg branco
    var contrario_bg = '.menu-wrap';
    // encontra a detro do elemtno pai, torna preto
    var contrario_a_color = '#main-menu';
    // encontra h2 no elemento pai, torna preto
    var contrario_h2_color = '.block-views, .block-panels-mini, .block-twitter-block';

    /* 
        Alto contraste
    */

    $('#aContraste').click(function() {
        contraste = !contraste;  
        if(contraste) {
            $(bg_escuro).addClass('a-bg');
            $(cor_clara).addClass('a-color-x');
            $(gray_filter).addClass('a-img');
            $(color_bg_border).addClass('a-form');
            $(herdeiros).addClass('a-color-bg');
            $(encontra_link).find('a').addClass('a-color-bg');
            $(contrario_bg).addClass('a-bg-x');
            $(contrario_a_color).find('a').addClass('a-color');
            $(contrario_h2_color).find('h2').addClass('a-color');
            $(this).find('.a-svg').addClass('a-svg-x');
            // cacheia
            window.sessionStorage.setItem('a_contraste', '1');
        }
        else {
            $(bg_escuro).removeClass('a-bg');
            $(cor_clara).removeClass('a-color-x');
            $(gray_filter).removeClass('a-img');
            $(color_bg_border).removeClass('a-form');
            $(herdeiros).removeClass('a-color-bg');
            $(encontra_link).find('a').removeClass('a-color-bg');
            $(contrario_bg).removeClass('a-bg-x');
            $(contrario_a_color).find('a').removeClass('a-color');
            $(contrario_h2_color).find('h2').removeClass('a-color');
            $(this).find('.a-svg').removeClass('a-svg-x');
            // remove cache
            window.sessionStorage.removeItem('a_contraste');
        }

    });

    temCacheContraste();

    function temCacheContraste() {
        var cache = window.sessionStorage.getItem('a_contraste');
        if (cache) {
            $('#aContraste').click();
        }
    };

    /* 
        Clique para ir
    */

    function irPara(elemento) {
        $(elemento).addClass('a-ativo');
        setTimeout(function(){ $(elemento).removeClass('a-ativo'); },1000);
        $('html').animate({
            scrollTop: $(elemento).offset().top
        }, 'slow');
    };

    // Foco no conteúdo principal
    $('#aConteudo').click(function() {
        irPara('#page-wrap');
    });
    
    // Foco no menu de navegação
    $('#aMenu').click(function() {
        irPara('.menu-wrap');
    });

    // Foco no rodapé
    $('#aRodape').click(function() {
        irPara('#footer');
    });

    // Foco na barra de busca
    $('#aBusca').click(function() {
        $('#edit-search-block-form--2').focus();
        irPara('.region-user-menu');
    });

    /* 
        Tamanho da fonte
    */

    // obtendo tamanhos padrão
    var fonte0 = parseInt($('p').css('font-size'));
    var fonte1 = parseInt($('h1').css('font-size'));
    var fonte2 = parseInt($('h2').css('font-size'));
    var fonte3 = parseInt($('h3').css('font-size'));
    var fonte4 = parseInt($('h4').css('font-size'));
    var fonte5 = parseInt($('h5').css('font-size'));
    var fonte6 = parseInt($('h6').css('font-size'));

    let tamPadrao = [fonte0, fonte1, fonte2, fonte3, fonte4, fonte5, fonte6];
    console.log('padrão: ' + tamPadrao);

    $('#aFonteMaior').click(function() {

        if (fonte0 < 18) {
            fonte0 += 2;
        }
        if (fonte1 < 28) {
            fonte1 += 2;
        }
        if (fonte2 < tamPadrao[1]) {
            fonte2 += 2;
        }

        $('p, #main-menu, #footer-area').css('font-size', fonte0 + 'px');
        $('h1').css('font-size', fonte1 + 'px');
        $('h2').css('font-size', fonte2 + 'px');
        $('.views-field-title').find('a').css('font-size', fonte0 + 'px');

        var tamAtual = [fonte0, fonte1, fonte2, fonte3, fonte4, fonte5, fonte6];
        window.sessionStorage.setItem('a_fonte', tamAtual);
        console.log('aumentou: ' + tamAtual);
    });

    $('#aFonteMenor').click(function() {

        if (fonte0 > tamPadrao[0]) {
            fonte0 -= 2;
        }
        if (fonte1 > tamPadrao[1]) {
            fonte1 -= 2;
        }
        if (fonte2 > tamPadrao[2]) {
            fonte2 -= 2;
        }

        $('p, #main-menu, #footer-area').css('font-size', fonte0 + 'px');
        $('h1').css('font-size', fonte1 + 'px');
        $('h2').css('font-size', fonte2 + 'px');
        $('.views-field-title').find('a').css('font-size', fonte0 + 'px');

        var tamAtual = [fonte0, fonte1, fonte2, fonte3, fonte4, fonte5, fonte6];
        window.sessionStorage.setItem('a_fonte', tamAtual);
        console.log('diminuiu: ' + tamAtual);

        // quando o tamnho diminuido ficar igual ao tamanho padrão, o cache é removido
        if (tamAtual.toString() == tamPadrao.toString()) {
            window.sessionStorage.removeItem('a_fonte');
            console.log('cache removido!');
        }

    });

    temCacheFonte();

    function temCacheFonte() {
        var cache = window.sessionStorage.getItem('a_fonte');
        var doCache = window.sessionStorage.getItem('a_fonte').split(",").map(Number);

        console.log(doCache[1]);

        if (cache) {
            $('p, #main-menu, #footer-area').css('font-size', doCache[0] + 'px');
            $('h1').css('font-size', doCache[1] + 'px');
            $('h2').css('font-size', doCache[2] + 'px');
            $('.views-field-title').find('a').css('font-size', doCache[0] + 'px');
        }
    };

});