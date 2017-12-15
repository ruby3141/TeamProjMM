window.onload = function() {
	
   $("conf").observe("click",make);
    $("back").observe("click",back);
  
};

function make(){
    alert("make group success");
   window.location.href="makegroup.html"
}

function back(){
   window.location.href="makegroup.html"
}
