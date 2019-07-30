/* 
    Acessibilidade
*/
jQuery(document).ready(function($) {
    
    var
        contraste = false;
        // containers
        bg_escuro = 'header, td, #page-wrap, .footer_credit, .views-field-title, .item-list ul, .ui-widget-content, .page-galerias .views-row-odd, .a-libras';
        // textos
        cor_clara = 'label, p, h1, h2, h3, h4, h5, h6, #sub-srv';
        links = 'a';
        // formulários e campos
        color_bg_border = 'input, textarea, button';
        // filtro p&b para imagens
        gray_filter = 'img, figure, aside, iframe';
        // svgs
        svg = 'svg path';
        // mudar bg: elemento pai / mudar cor: elementos filhos
        herdeiros = 'body, table, tr, td, .box-content, .tab-content, .page-title';
        // encontrar links dentro
        encontra_link = '.social-icons, .ui-tabs-active .ui-state-active';
        // bg branco
        contrario_bg = '.menu-wrap';
        // encontra a detro do elemtno pai, torna preto
        contrario_a_color = '#main-menu';
        // encontra h2 no elemento pai, torna preto
        contrario_h2_color = '.block-views, .block-panels-mini, .block-twitter-block';

    /*
        Alto contraste
    */
    $('#aContraste').click(function() {
        contraste = !contraste;  
        if(contraste) {
            $(bg_escuro).addClass('a-bg');
            $(links).addClass('a-color');
            $(cor_clara).addClass('a-color-x');
            $(gray_filter).addClass('a-img');
            $(color_bg_border).addClass('a-form');
            $(herdeiros).addClass('a-color-bg');
            $(encontra_link).find('a').addClass('a-color-bg');
            // $(contrario_bg).addClass('a-bg-x');
            // $(contrario_a_color).find('a').addClass('a-color');
            $(contrario_h2_color).find('h2').addClass('a-color');
            $(svg).addClass('a-svg-x');
            // cacheia
            window.sessionStorage.setItem('a_contraste', '1');
            console.log('contraste ativado');
        }
        else {
            $(bg_escuro).removeClass('a-bg');
            $(links).removeClass('a-color');
            $(cor_clara).removeClass('a-color-x');
            $(gray_filter).removeClass('a-img');
            $(color_bg_border).removeClass('a-form');
            $(herdeiros).removeClass('a-color-bg');
            $(encontra_link).find('a').removeClass('a-color-bg');
            // $(contrario_bg).removeClass('a-bg-x');
            // $(contrario_a_color).find('a').removeClass('a-color');
            $(contrario_h2_color).find('h2').removeClass('a-color');
            $(svg).removeClass('a-svg-x');
            // remove cache
            window.sessionStorage.removeItem('a_contraste');
        }

    });

    // verifica se tem cache
    if (window.sessionStorage.getItem('a_contraste')) {
        $('#aContraste').click();
    }

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
    // foco no conteúdo principal
    $('#aConteudo').click(function() {
        irPara('#page-wrap');
    });
    // menu de navegação
    $('#aMenu').click(function() {
        irPara('.menu-wrap');
    });
    // barra de busca
    $('#aBusca').click(function() {
        $('#edit-search-block-form--2').focus();
        irPara('.region-user-menu');
    });
    // rodapé
    $('#aRodape').click(function() {
        irPara('#footer');
    });

    /* 
        Tamanho da fonte
    */

    // obter tamanhos padrão
    var tP = parseInt($('p').css('font-size'));
    var tH1 = parseInt($('h1').css('font-size'));
    var tH2 = parseInt($('h2').css('font-size'));
    var t11 = 11;
    // guardar
    let tamPadrao = [tP, tH1, tH2, t11];
    console.log('guardou tam padrão: ' + tamPadrao);

    // elementos do site
    site_11 = '.a-links a, #sub-srv, .copyright'; 
    site_14 = 'p, #main-menu, #footer-area, .breadcrumb, #block-panels-mini-blocos-panels .item-list li a';
    site_links = '.views-field-title, .social-icons';



    // aumentar fonte
    $('#aFonteMaior').click(function() {

        if (t11 < 15) { t11 += 1; }
        if (tP < 18) { tP += 2; }
        if (tH1 < 28) { tH1 += 2; }
        if (tH2 < tamPadrao[1]) { tH2 += 2; }

        $(site_11).css('font-size', t11 + 'px');
        $(site_14).css('font-size', tP + 'px');
        $('h1').css('font-size', tH1 + 'px');
        $('h2').css('font-size', tH2 + 'px');
        $(site_links).find('a').css('font-size', tP + 'px');

        // salvar tamanho atual
        var tamAtual = [tP, tH1, tH2, t11];
        // cacheia
        window.sessionStorage.setItem('a_fonte', tamAtual);
        console.log('aumentou: ' + tamAtual);
    });

    // diminuir fonte
    $('#aFonteMenor').click(function() {

        if (t11 > 11) { t11 -= 1; }

        if (tP > tamPadrao[0]) {
            tP -= 2;
        }
        if (tH1 > tamPadrao[1]) {
            tH1 -= 2;
        }
        if (tH2 > tamPadrao[2]) {
            tH2 -= 2;
        }

        $(site_11).css('font-size', t11 + 'px');
        $(site_14).css('font-size', tP + 'px');
        $('h1').css('font-size', tH1 + 'px');
        $('h2').css('font-size', tH2 + 'px');
        $(site_links).find('a').css('font-size', tP + 'px');

        // salvar tamanho atual
        var tamAtual = [tP, tH1, tH2, t11];
        // cacheia
        window.sessionStorage.setItem('a_fonte', tamAtual);
        console.log('diminuiu: ' + tamAtual);

        // quando o tamnho diminuido se igualar ao padrão o cache é removido
        if (tamAtual.toString() == tamPadrao.toString()) {
            window.sessionStorage.removeItem('a_fonte');
            console.log('cache da fonte removido');
        }
    });


    // verifica se tem cache
    if (window.sessionStorage.getItem('a_fonte')) {
        var doCache = window.sessionStorage.getItem('a_fonte').split(",").map(Number);
        console.log('tem cache de fonte', doCache);

        $(site_11).css('font-size', doCache[3] + 'px');
        $(site_14).css('font-size', doCache[0] + 'px');
        $('h1').css('font-size', doCache[1] + 'px');
        $('h2').css('font-size', doCache[2] + 'px');
        $(site_links).find('a').css('font-size', doCache[0] + 'px');
    }
    // senao define padrao
    else {
        console.log('sem cache de fonte');
        $(site_11).css('font-size', tamPadrao[3] + 'px');
        $(site_14).css('font-size', tamPadrao[0] + 'px');
        $('h1').css('font-size', tamPadrao[1] + 'px');
        $('h2').css('font-size', tamPadrao[2] + 'px');
        $(site_links).find('a').css('font-size', tamPadrao[0] + 'px');
    }

    /*
        Libras
    */

    $('#aLibras').click(function() {
        $('.a-libras').toggle('a-libras-clicado');
        $('.menu-wrap, #page-wrap').addClass('a-index');
    });

});