$(document).ready(function () {

    $("#start").on('click', trivia.startGame);
    $("#remaining-time").hide();
    $("#subButton").hide();
    $('#results').hide();

});
$(document).ready(function () {
    $("#subButton").on('click', submitQuestions)



    function submitQuestions() {

        var check1 = $("input[name='q0']:checked").val();
        var check2 = $("input[name='q1']:checked").val();
        var check3 = $("input[name='q2']:checked").val();
        var check4 = $("input[name='q3']:checked").val();
        var check5 = $("input[name='q4']:checked").val();

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


        $('#game').hide();
        $('#subButton').hide();

        // show start button to begin a new game
        $('#start').show();


    }
});


var trivia = {
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 90,
    timerOn: false,
    timerId: '',

    questions: {
        q1: 'Which is worlds largest continent?',
        q2: 'Which is worlds largest ocean?',
        q3: 'Which is worlds longest river?',
        q4: 'Which is worlds largest desert?',
        q5: "How many continents are there in the world?",

    },
    options: {
        q1: ['Asia', 'Europe', 'Australia', 'Antartica'],
        q2: ['Indian', 'Atlantic', 'Pacific', 'Arctic'],
        q3: ['Amazon', 'Nile', 'Yellow', 'Congo'],
        q4: ['Thar', 'Gobi', 'Kalahari', 'Sahara'],
        q5: ['4', '5', '7', '6'],
    },
    answers: {
        q1: 'Asia',
        q2: 'Pacific',
        q3: 'Nile',
        q4: 'Sahara',
        q5: '7',
    },
    // trivia methods
    // method to initialize game
    startGame: function () {
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

        // ask  question
        trivia.Question();

    },
    // method to loop through and display questions and options 
    Question: function () {

        $('#question').html('');
        trivia.timer = 90;
        $('#timer').removeClass('last-seconds');
        $('#timer').text(trivia.timer);

        // to prevent timer speed up
        if (!trivia.timerOn) {
            trivia.timerId = setInterval(trivia.timerRunning, 1000);
        }
        var questionsArray = Object.entries(trivia.questions);

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
        $('#timer').text(trivia.timer);
        trivia.timer--;
        if (trivia.timer === -1) {
            submitQuestions();
        }

    }
}
