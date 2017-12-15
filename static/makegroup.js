
window.onload = function() {
	
	new Draggable("group1");
    new Draggable("group2");
    new Draggable("group3");
    new Draggable("group4");
   $("make").observe("click",make);
   var nofd = $$(".group");
   for(var i = 0; i < nofd.length; i++){
		nofd[i].observe("dblclick",showGroup);
	}
	$("join").observe("click",joinaccept);
};

function make(){
	 window.location.href="make.html"
}


function showGroup(){
	 window.location.href="showgroup.html"
}

function joinaccept(){
	$("join").disabled = true;
	
	$("form").removeChild($("form").firstChild);

}