var slider = document.getElementById("myRange");
var output = document.getElementById("difficulty");

output.innerHTML = Math.floor(slider.value / 100); // Display the default slider value

var timeOn = 1000;
var timeOff = 1500;
// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
	output.innerHTML = Math.floor(this.value / 100);
	
	timeOn = 2200 - slider.value;
	timeOff = 2200 - (slider.value * 1.5);
	
}

var cnt = 0;
var getRand = function () {
	return(Math.floor(Math.random() * 9));
}
var home = $("#home");
var reset = $("#reset");
var score = $("#score");
var trgt = $('.trgt');
var emptyColor = "#636363";
var clickColor = "#212121";
var fullColor = "rgb(80,160,253)";
score.text(cnt);

reset.on("click", (event) => {
	cnt = 0;
	score.text(cnt);
})

home.on("click", (event) => {
	window.location.href = './index.html';
})

var makeColor = function (rand, color) {
	trgt.eq(rand).css({"background-color":color});
	trgt.eq(rand).attr("id", color);
};

trgt.on('click', function(e) {
	var index = trgt.index( this );
	if (trgt.eq(index).attr("id") === fullColor)
	{
		cnt++;
		score.text(cnt);
		makeColor(index, clickColor);
	}
});

setInterval(() => {
	var rand = getRand();
	makeColor(rand, fullColor);
	setTimeout(() => makeColor(rand, emptyColor), timeOn);
}, timeOff)