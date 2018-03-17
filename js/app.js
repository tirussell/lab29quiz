var questions = [{
	title: 'Which cheese has holes?',
	answers: ['Swiss', 'Cheddar','Manchego', 'Mozarella'],
	correct: 0
	},
	{
		title: 'Which cheese is named after a place in England?',
		answers: ['Swiss', 'Cheddar','Manchego', 'Mozarella'],
		correct: 1
	},
	{
		title: 'Which cheese is made from sheep\'s milk?',
		answers: ['Swiss', 'Cheddar','Manchego', 'Mozarella'],
		correct: 2
	},
	{
		title: 'Which cheese is string cheese made from?',
		answers: ['Swiss', 'Cheddar','Manchego', 'Mozarella'],
		correct: 3
	}];


var score = 0;
var currentQuestion = 0;

$(document).ready(function(){
	displayQuestion();

	$('ul').on('click', 'li', function(e){
		// alert("You clicked " + $(e.currentTarget).text());
		$('.selected').removeClass('selected');
		$(e.currentTarget).addClass('selected');
		$('a').addClass('ready');
	})

	$('a').click(function(e){
		e.preventDefault();
		if ($(e.currentTarget).hasClass('ready')) {
			// get the id of the slected answer
			var guess = $('.selected').attr('id');
			// checkif the id is the same as the corect answer id
			checkAnswer(guess);
			
		} else if ($(e.currentTarget).hasClass('restart')) {
			currentQuestion = 0;
			score = 0;
			$(e.currentTarget).removeClass('restart').text('Submit Answer');
			displayQuestion();
		} else {
			// yell at the user
			alert("Select an answer first, dummy!");
		}
	});
});


function displayQuestion() {
	if (currentQuestion < questions.length) {
		updateScore();
		var question = questions[currentQuestion];
		$('h2').text(question.title);
		$('ul').html('');
		$('.ready').removeClass('ready');
		for (var i = 0; i < question.answers.length; i++) {
			$('ul').append('<li id="' + i + '">' + question.answers[i] + '</li>');
		}
	} else {
		doSummary();
	}
}

function checkAnswer(guess) {
	var question = questions[currentQuestion];
	if (question.correct == guess) {
		score++;
	}
	currentQuestion++;
		displayQuestion();

}

function updateScore() {
	$('.questions span').text((currentQuestion+1) + "/" + questions.length);
	$('.score span').text(score);
}

function doSummary() {
	$('ul').html('');
	$('.ready').removeClass('ready').addClass('restart').text('Restart Quiz');
	$('.score span').text(score);
	$('h2').text('Congratulations! You scored ' + (score/questions.length)*100 + "%");
}