/**
 * 
 */

(function(controle){
	
	"use strict"
	
var contador = $(".cartao").length;

$(".novoCartao")
		.submit(
				function(event) {

					var campoConteudo = $(".novoCartao-conteudo");
					var conteudo = campoConteudo.val().trim(); //.replace(/\n/g,
	//						"<br>").replace(/\*\*/, "<b>").replace(/\*\*/,
	//						"</b>").replace(/\*/, "<i>").replace(/\*/, "</i>");

					if (conteudo) {

/*						contador++;

						var botaoRemove = $("<button>")
							.addClass("opcoesDoCartao-remove")
							.attr("data-ref",contador)
							.text("Remover")
							.click(removeCartao);

						var opcoes = $("<div>").addClass("opcoesDoCartao")
								.append(botaoRemove);

						var tipoCartao = decideTipoCartao(conteudo);

						var conteudoTag = $("<p>").addClass("cartao-conteudo")
								.append(conteudo);

						$("<div>").attr("id", "cartao_" + contador).addClass(
								"cartao").addClass(tipoCartao).append(opcoes).append(conteudoTag)
								.prependTo(".mural");*/
						
						controle.adicionaCartao(conteudo);
						$(document).trigger("precisaSincronizar");

					}

					campoConteudo.val("");
					event.preventDefault();
				});
})(controladorDeCartoes)