## Write Your Own Adventure

This assignment brings together every component in the Backbone framework. Although it's not necessary to use any specific part of Backbone, building a rich single-page application becomes a lot easier when you do; we're going to have practice with it.

### Details

Implement a Choose Your Own Adventure-style book editor. You'll need to allow someone to create pages in book, with action-based links to other book pages ("if you want to do X, turn to page Y").

Each page should at least have

* a title
* text-based content (which should show up in a multiline `<textarea>`)
* one or more links to other pages - each link should have a description and a page number

Users should be able to:

* See a table of contents, or a list of all "pages"
* See the content on an existing page
* Create new pages
* Edit existing pages
* Delete existing pages
* Copy the page's URL and link to it
* Link to other **existing** pages from any page, with a description for that link

### Normal Mode

Create this, using at least one instance of every significant part of Backbone. You should create, and use

* A `Backbone.model` to represent a single page
* A `Backbone.collection` to represent all pages
* `Backbone.sync` to interact with the provided endpoints
* `Backbone.view`s for the individual pages and the table of contents
* A `Backbone.router` for permalinks and as controller-level logic

As usual, server-side endpoints already exist that you should take advantage of.

* Get list = **GET** `/api/page`
* Get specific = **GET** `/api/page/:pageId`
* Create = **POST** `/api/page`
* Edit specific = **PUT** `/api/pages/:pageId`
* Delete specific = **DELETE** `/api/pages/:pageId`

This is a difficult and time-intensive assignment. Take some time and mental energy, and consider how you're going to build and organize everything before you start, lest you go down a rabbit hole working on impossible or sloppy code and waste several hours.