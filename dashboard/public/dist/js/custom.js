'use strict'

function embedBuilder(){
let btn = document.getElementById("createBuilderBtn")
if (btn.innerHTML === "Create Embed") {

    btn.innerHTML = "Cancel";
    

btn.classList.remove("btn-success")
btn.classList.add("btn-danger")
  } else {

    btn.innerHTML = "Create Embed";

btn.classList.add("btn-success")
btn.classList.remove("btn-danger")
  }


let builder = document.getElementById('embedBuilder'); 
builder.classList.toggle("hidden");
}

	window.setTimeout(function() {

    $(".alert").fadeTo(500, 0).slideUp(500, function(){

        $(this).remove(); 

    });

}, 4000);

function createProgressbar(id, duration, callback) {

  var progressbar = document.getElementById(id);

  progressbar.className = 'progressbar';

  var progressbarinner = document.createElement('div');

  progressbarinner.className = 'inner';

  progressbarinner.style.animationDuration = duration;

  if (typeof(callback) === 'function') {

    progressbarinner.addEventListener('animationend', callback);

  }

  progressbar.appendChild(progressbarinner);

  progressbarinner.style.animationPlayState = 'running';

}

addEventListener('load', function() {

  createProgressbar('progressbar', '4s');

});