window.onload = function() {
	var rbtn = $$("form #btn");
   for(var i = 0; i < rbtn.length; i++){
		rbtn[i].observe("click",moveRoom);
	}
};

function moveRoom(){
	 window.location.href="makegroup.html"
}

