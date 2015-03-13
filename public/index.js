
var PageModel = Backbone.Model.extend({

	defaults: {
		text: "missing text"
	},

	createPage: function(context, option1, option2){



	},

	getPage: function(){


	},

	displayPage: function(){


	}


})


var PagesCollection = Backbone.Collection.extend({

	url: "api/page",

	model: PageModel,




})

var PageView = Backbone.View.extend({



})

var TocView = Backbone.View.extend({



})

var PageRouter = Backbone.Router.extend({

	routes: {
		"": "showTOC",
		"page/:pageNumber": "showPage"
	},

	showTOC : function(){

	    $.ajax({
	    	url: "/api/toc/",
	     	method: "GET",
	    	success: function(result) {
	        	console.log(result);
	       		appendTOC(result)
	    	}
	    })

	},

	showPage : function(number){

	    $.ajax({
	    	url: "/api/page/" + number,
	     	method: "GET",
	    	success: function(result) {
	        	console.log(result);
	        	var p = result.paragraphs;
	        	var o = result.links;
	        	appendPage(p,o);
	    	}
	    })

	}

})



var appendPage = function(p, o){

	$('.main').html("");

	var localObj = {
		text1: p[0],
		text2: p[1],
		text3: p[2],
		text4: p[3],
		option1_link: o[0].page,
		option2_link: o[1].page,
		option1: o[0].sentence,
		option2: o[1].sentence
	};

	$('.main').append(templates.pageContent(localObj));

}

var newPageInput = function(){

	$('.new-page').on("click", function(){
		$('.new-page').hide();
		$('.text-input-area').show();
	})

	var page = {} ;

	$('.input-button').on('click', function(){

		page.text = $('.text-input').val();
		page.op1 = $('.option1-text').val();
		page.op2 = $('.option2-text').val();
		page.page1 = $('.option1-page').val();
		page.page2 = $('.option2-page').val();

		console.log(page)

		$('.text-input').val("");
		$('.option').val("")
		$('.text-input-area').hide();
		$('.new-page').show();

		if(page.text === "" || page.op1 === "" || page.op2 === "" || page.page1 === "" || page.page2 === "")
			{console.log("no page created"); return}

		if(_.isNumber(page.page1*1) && _.isNumber(page.page2*1)){
		}
		else {
			console.log("no page created"); return
		}

		$.ajax({
			url: "api/page",
			method: "POST",
			data: page,
			success: function(data){
				console.log(data)
			}

		})
	})

}

var templates = {}



$(document).on("ready", function(){

	templates.pageContent = Handlebars.compile($('#page-content-template').html());
	templates.toc = Handlebars.compile($('#toc-template').html());
	templates.tocItem = Handlebars.compile($('#toc-item-template').html());


	Backbone.history.start();

	newPageInput();

})


