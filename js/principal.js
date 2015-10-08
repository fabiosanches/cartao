document.querySelector("#mudaLayout").addEventListener("click", function() {

	var mural = document.querySelector(".mural");

	mural.classList.toggle("mural--linhas");

	if (mural.classList.contains("mural--linhas")) {

		this.textContent = "Blocos";
	} else {

		this.textContent = "Linhas";
	}
});

var botoes = document.querySelectorAll(".opcoesDoCartao--remove");

for (var i = 0; i < botoes.length; i++) {

	botoes[i].addEventListener("click", removeCartao);
}

var contador = $(".cartao").length;

$(".novoCartao")
		.submit(
				function(event) {

					var campoConteudo = $(".novoCartao-conteudo");
					var conteudo = campoConteudo.val().trim(); //.replace(/\n/g,
	//						"<br>").replace(/\*\*/, "<b>").replace(/\*\*/,
	//						"</b>").replace(/\*/, "<i>").replace(/\*/, "</i>");

					if (conteudo) {

						contador++;

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
								.prependTo(".mural");
					}

					campoConteudo.val("");
					event.preventDefault();
				});


$("#busca").on("input",function() {
	
	var busca = $(this).val().trim();
	
	if (busca.length) {
		
		$(".cartao").hide().filter(function() {
//		$(".cartao").addClass("cartao--esconde").removeClass("cartao").filter(function() {
			
//			$(".cartao");log
//			$(".cartao").removeClass("cartao");
			
			return $(this).find(".cartao-conteudo")
							.text()
							.match(new RegExp(busca,"gi")
							);
		}).show();
//		}).addClass("cartao");

//		$(".cartao").addClass("cartao");
//		$(".cartao").removeClass("cartao--esconde");
	} else {
		$(".cartao").show();
		
//		$(".cartao").removeClass("cartao--esconde");
//		$(".cartao").addClass("cartao");
	}
});

$("#pegaInfo").click(function() {
	$.getJSON("https://ceep.herokuapp.com/cartoes/instrucoes", function(res){
		
		console.dir(res);
		
		res.instrucoes.forEach(function(instrucao) {
			controladorDeCartoes.adicionaCartao(instrucao.conteudo, instrucao.cor);
		});
	});
});


(function(){
	
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
				controladorDeCartoes.adicionaCartao(cartao.conteudo);
			});
		}
);

$("#sync").click(function() {
	
	$("#sync").removeClass("botaoSync--sincronizado");
	$("#sync").addClass("botaoSync--esperando");
	
	var cartoes = [];
	

	
	$(".cartao").each(function(){
		var cartao = {};
		cartao.conteudo = $(this).find(".cartao-conteudo").html();
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
			
			var quantidadeRemovidos = controladorDeCartoes.idUltimoCartao() - res.quantidade;
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


})()