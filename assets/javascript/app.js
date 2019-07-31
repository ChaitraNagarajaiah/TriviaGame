$(document).ready(function () {

    // event listeners
    $("#start").on('click', trivia.startGame);
    $("#remaining-time").hide();
    $('#subButton').hide();


});
function submitQuestions() {

    var check1 = $("input[name='q0']:checked").val();
    var check2 = $("input[name='q1']:checked").val();
    var check3 = $("input[name='q2']:checked").val();
    var check4 = $("input[name='q3']:checked").val();
    var check5 = $("input[name='q4']:checked").val();
    var check6 = $("input[name='q5']:checked").val();
    var check7 = $("input[name='q6']:checked").val();

    var answeresArray = Object.entries(trivia.answers);
    var answerKey;
    for (answerKey of answeresArray) {
        console.log(answerKey[0] + answerKey[1]);
        if (answerKey[0] == 'q1') {
            if (!$("input[name='q0']:checked").val()) {
                trivia.unanswered++;
            }
            else if (answerKey[1] == check1) {
                trivia.correct++;
            } else {
                trivia.incorrect++;
            }

        }
        else if (answerKey[0] == 'q2') {
            if (!$("input[name='q1']:checked").val()) {
                trivia.unanswered++;
            }
            else if (answerKey[1] == check2) {
                trivia.correct++;
            } else {
                trivia.incorrect++;
            }
        }
        else if (answerKey[0] == 'q3') {
            if (!$("input[name='q2']:checked").val()) {
                trivia.unanswered++;
            }
            else if (answerKey[1] == check3) {
                trivia.correct++;
            } else {
                trivia.incorrect++;
            }
        }
        else if (answerKey[0] == 'q4') {
            if (!$("input[name='q3']:checked").val()) {
                trivia.unanswered++;
            }
            else if (answerKey[1] == check4) {
                trivia.correct++;
            } else {
                trivia.incorrect++;
            }
        }
        else if (answerKey[0] == 'q5') {
            if (!$("input[name='q4']:checked").val()) {
                trivia.unanswered++;
            }
            else if (answerKey[1] == check5) {
                trivia.correct++;
            } else {
                trivia.incorrect++;
            }
        }
        else if (answerKey[0] == 'q6') {
            if (!$("input[name='q5']:checked").val()) {
                trivia.unanswered++;
            }
            else if (answerKey[1] == check6) {
                trivia.correct++;
            } else {
                trivia.incorrect++;
            }
        }
        else if (answerKey[0] == 'q7') {
            if (!$("input[name='q6']:checked").val()) {
                trivia.unanswered++;
            }
            else if (answerKey[1] == check7) {
                trivia.correct++;
            } else {
                trivia.incorrect++;
            }
        }
    }
    console.log(trivia.correct);
    console.log(trivia.incorrect);
    console.log(trivia.unanswered);
    $('#results')
        .html('<h3>Thank you for playing!</h3>' +
            '<p>Correct: ' + trivia.correct + '</p>' +
            '<p>Incorrect: ' + trivia.incorrect + '</p>' +
            '<p>Unaswered: ' + trivia.unanswered + '</p>' +
            '<p>Please play again!</p>');
    $('#results').show();

    // hide game sction
    $('#game').hide();
    $('#subButton').hide();

    // show start button to begin a new game
    $('#start').show();


}

var trivia = {
    // trivia properties
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 90,
    timerOn: false,
    timerId: '',
    // questions options and answers data
    questions: {
        q1: 'Who is actually a chef?',
        q2: 'What does Joey love to eat?',
        q3: 'How many times has Ross been divorced?',
        q4: 'How many types of towels does Monica have?',
        q5: "Who stole Monica's thunder after she got engaged?",
        q6: 'Who hates Thanksgiving?',
        q7: "Who thinks they're always the last to find out everything?"
    },
    options: {
        q1: ['Monica', 'Chandler', 'Rachel', 'Ross'],
        q2: ['Fish', 'Apples', 'Oranges', 'Sandwhiches'],
        q3: ['5', '2', '1', '3'],
        q4: ['3', '8', '11', '6'],
        q5: ['Rachel', 'Phoebe', 'Emily', 'Carol'],
        q6: ['Joey', 'Chandler', 'Rachel', 'Ross'],
        q7: ['Ross', 'Phoebe', 'Monica', 'Chandler']
    },
    answers: {
        q1: 'Monica',
        q2: 'Sandwhiches',
        q3: '3',
        q4: '11',
        q5: 'Rachel',
        q6: 'Chandler',
        q7: 'Phoebe'
    },
    // trivia methods
    // method to initialize game
    startGame: function () {
        // restarting game results
        trivia.currentSet = 0;
        trivia.correct = 0;
        trivia.incorrect = 0;
        trivia.unanswered = 0;
        clearInterval(trivia.timerId);

        // show game section
        $('#game').show();
        $('#subButton').show();

        //  empty last results
        $('#results').html('');

        // show timer
        $('#timer').text(trivia.timer);

        // remove start button
        $('#start').hide();

        $('#remaining-time').show();

        // ask first question
        trivia.nextQuestion();

    },
    // method to loop through and display questions and options 
    nextQuestion: function () {

        $('#question').html('');
        // set timer to 20 seconds each question
        trivia.timer = 90;
        $('#timer').removeClass('last-seconds');
        $('#timer').text(trivia.timer);

        // to prevent timer speed up
        if (!trivia.timerOn) {
            trivia.timerId = setInterval(trivia.timerRunning, 1000);
        }
        var questionsArray = Object.entries(trivia.questions);
        var vv;


        // gets all the questions then indexes the current questions

        var questionContent = Object.values(trivia.questions);
        var question;
        var questionOptionsList = Object.values(trivia.options);
        for (var queLength = 0; queLength < questionContent.length; queLength++) {
            $('#question').append(questionContent[queLength] + '</br>');
            var questionOptions = Object.values(questionOptionsList[queLength]);
            $.each(questionOptions, function (index, key) {
                console.log(questionOptionsList[queLength]);
                $('#question').append($('<input type="radio" id="q' + queLength + '" name="q' + queLength + '" value="' + key + '">' + key + '</input>'));
            })
            console.log(questionContent[queLength]);
            console.log(questionOptionsList[queLength]);
            $('#question').append('</br>');
        }




    },
    // method to decrement counter and count unanswered if timer runs out
    timerRunning: function () {
        // if timer still has time left and there are still questions left to ask
        $('#timer').text(trivia.timer);
        trivia.timer--;
        if (trivia.timer === -1) {

            //$('#timer').addClass('last-seconds');
            submitQuestions();
        }

    }
}
