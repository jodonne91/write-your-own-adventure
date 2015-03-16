
var PageModel = Backbone.Model.extend({

	defaults: {
		text: "missing text"
	},

	validation: function(text, option1, option2, link1, link2){

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

	createPage: function(text, option1, option2, link1, link2){

		var page = {};

		page.text = text;
		page.op1 = option1;
		page.op2 = option2;
		page.page1 = link1;
		page.page2 = link2;
		//page.num = pageNum;

		if(page.text === "" || page.op1 === "" || page.op2 === "" || page.page1 === "" || page.page2 === "" || page.num === "")
			{console.log("no page created"); return}

		if(_.isNumber(page.page1*1) && _.isNumber(page.page2*1) && _.isNumber(page.num*1)){
		}
		else {
			console.log("no page created"); return
		}

		console.log(this)

		this.create(page);
		this.fetch();


	},

	updatePage: function(id, text, option1, option2, link1, link2){

		var page = {};

		page.text = text;
		page.op1 = option1;
		page.op2 = option2;
		page.page1 = link1;
		page.page2 = link2;
		//page.num = pageNum;

		if(page.text === "" || page.op1 === "" || page.op2 === "" || page.page1 === "" || page.page2 === "")
			{console.log("no page created"); return}

		if(_.isNumber(page.page1*1) && _.isNumber(page.page2*1)){
		}
		else {
			console.log("no page created"); return
		}

		console.log(this)

		this.sync("update", pages.get(id).set(page),{success: function(){pages.fetch()}});

	}




})

var PageView = Backbone.View.extend({

	tagName: "div",

	className: "page-content",

	model: PageModel,

	initialize: function(){
		this.render();
	},

	render: function(){
		//this.$el.html(templates.pageContent());
	}


})

var TocView = Backbone.View.extend({

	tagName: "tr",

	className: "toc-item",

	initialize: function() {

  	},

	render: function() {

	}


})

var PageRouter = Backbone.Router.extend({

	routes: {
		"": "showTOC",
		"page/:pageNumber": "showPage",
		"edit/:pageNumber": "editPage"
	},

	showTOC : function(){
		$('header').show();
		pages.fetch({success: function(){displayTocItems()}})
	},

	showPage : function(number){

		$('header').hide();
		$('.append-to').html("")

		try{
			var pageObj = pages.get(number).toJSON()	
		}
		catch(error){
			var pageObj = {text: "no page content"}
		}

		$('.append-to').append(templates.pageContent(pageObj));


		//append to page

	},

	editPage: function(number){
		try{
			var model = pages.get(number).toJSON();
		}
		catch(error){
			var model = {text: "Oops, no content."}
		}

		$('header').hide();
		$('.append-to').html("");
		$('.append-to').append(templates.editItem(model))

		$('.confirm-edit').on('click', function(){
			var id = $(this).attr("id")
			console.log(id)
			pages.updatePage(id, $('.text-edit').val(), $('.option1-edit').val(), $('.option2-edit').val(), $('.page1-edit').val(), $('.page2-edit').val())
			window.location = "#";
		})

		$('.cancel-edit').on('click', function(){

			//handles by link in button to '#'

		})
	}

})


var deleteButton = function(){
	$('.delete-button').on('click', function(){
		var id = $(this).attr("id")
		pages.get(id).destroy();
		displayTocItems();
	})
}

var tocButtonListener = function(){
    $('.show-toc-button').on('click', function(){

		displayTocItems();

	})
}

var displayTocItems = function(){
	pages.fetch({success: function(){

		$('.append-to').html("")
		$('.append-to').append(templates.toc())

		_.each(pages.toJSON(), function(page){
			$('.toc-list').append(templates.tocItem(page))
		})

		tocButtonListener();
		deleteButton();

	}});



}


var newPageInput = function(){

	$('.new-page').on("click", function(){
		$('.new-page').hide();
		$('.text-input-area').show();
	})

	$('.input-button').on('click', function(){

		pages.createPage($('.text-input').val(), $('.option1-text').val(), $('.option2-text').val(), $('.option1-page').val(), $('.option2-page').val())
		displayTocItems();
		//console.log(page)

		$('.text-input').val("");
		$('.option').val("")
		$('.text-input-area').hide();
		$('.new-page').show();

		// pages.create(page)
		// pages.fetch();

	})

}

var templates = {};
var pages;
var toc;
var router;


var resetServer = function(){
	_.each(pages.toArray(), function(page){
		console.log(page);
		page.destroy();
	})
	pages.fetch();
}

function deleteAll(){
	$('.delete-all-button').on('click', function(){
		resetServer()
		displayTocItems();
	})
}


$(document).on("ready", function(){

	templates.pageContent = Handlebars.compile($('#page-content-template').html());
	templates.toc = Handlebars.compile($('#toc-template').html());
	templates.tocItem = Handlebars.compile($('#toc-item-template').html());
	templates.editItem = Handlebars.compile($('#edit-item-template').html());

	pages = new PagesCollection;
	toc = new TocView;
	router = new PageRouter;
	pages.fetch();

	Backbone.history.start();

	newPageInput();
	deleteAll();
	renderSample();
})

var renderSample = function(){
	$('.sample-book-button').on('click', function(){
		_.each(book, function(page){
			pages.create(page)
		})
		displayTocItems();
	})
}


