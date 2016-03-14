$(document).ready(function() {
   $('#fullpage').fullpage({
        anchors: ['firstPage', 'secondPage', '3rdPage', '4thpage', 'lastPage'],
        sectionsColor: ['null', '#3b384b', '#3b384b','#f5a1bb'],
        menu: "menu",
        afterRender: function(){
        	console.log("After render!");
        	//Here more code can be executed.
        } 
      });
    });


//#ade0d8