/**
 * 
 */

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