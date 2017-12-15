window.onload = function() {
   $("make").observe("click",moveMake);
   $("find").observe("click",moveFind);
};

function moveMake(){
	 window.location.href="setgroup.html"
	 
}

function moveFind(){
	window.location.href="grouplist.html"
}