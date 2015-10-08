/**
 * 
 */

(function(controle){
	
	$("#sync").click(function() {
		$(document).trigger("precisaSincronizar");
	})
	
	var usuario = "testebla@exemplo.com.br";
	
	$.getJSON(
			"https://ceep.herokuapp.com/cartoes/carregar?callback=?",
			{usuario: usuario},
			function(res){
				var cartoes = res.cartoes;
				console.log(cartoes.length + " carregados em " + res.usuario);
	//			console.dir(cartoes);
				cartoes.forEach(function(cartao){
					console.log(cartao.conteudo);
					controle.adicionaCartao(cartao.conteudo);
				});
			}
	);

	$(document).on("precisaSincronizar", function(){
		
		$("#sync").removeClass("botaoSync--sincronizado");
		$("#sync").addClass("botaoSync--esperando");
	});		
	
	$(document).on("precisaSincronizar", function(){
		
		var cartoes = [];
		
		$(".cartao").each(function(){
			var cartao = {};
			cartao.conteudo = $(this).find(".cartao-conteudo").html();
			cartao.cor = $(this).css("background-color");
			cartoes.push(cartao);
	
		});
		
		var mural = {
				usuario: "testebla@exemplo.com.br",
				cartoes: cartoes
		}
	
		$.ajax({
			url: "https://ceep.herokuapp.com/cartoes/salvar",
			method: "POST",
			data: mural,
			success: function(res){
				$("sync").addClass("botaoSync--sincronizado");
				console.log(res.quantidade + " cartões salvos em " + res.usuario);
				
				var quantidadeRemovidos = controle.idUltimoCartao() - res.quantidade;
				console.log(quantidadeRemovidos + " cartões removidos");
			}
			, error: function(){
				console.log("Não foi possível salvar o mural");
			}
			, complete: function(){
				$("#sync").removeClass("botaoSync--esperando");
			}
		});
	});

})(controladorDeCartoes)