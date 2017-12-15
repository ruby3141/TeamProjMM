window.onload = function() {
   $("back").observe("click",moveOrigin);
   $("make").observe("click",moveList);
};

function moveOrigin(){
	window.location.href="main.html"
}

function moveList(){
	window.location.href="grouplist.html"
}

