$(document).ready(function () {

    var remainingQuestions = -1;
    var rightQuestions = 0;
    var wrongQuestions = 0;
    var editor = new JsonEditor("editor");


    $("#create-btn").click(function () {
        var questionArray;
        try {
            questionArray = JSON.parse(editor.getValue());
            remainingQuestions = questionArray.length;
        } catch (e) {
            alert("Invalid JSON");
            return;
        }
        createQuestions(questionArray, $("#exam"));
        $("#start").hide()
    });


    $(document).on('click', '.question-option', function () {
        var isCorrect = onQuestionClicked($(this));
        remainingQuestions--;

        if (isCorrect) {
            rightQuestions++;
        } else {
            wrongQuestions++;
        }

        if (remainingQuestions === 0) {
            showResult($("#results"), rightQuestions, wrongQuestions);
        }
    });

    $("#copy-btn").on('click', function () {
        var text = $("#sample-prompt").text();
        var textarea = document.createElement('textarea');
        textarea.textContent = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        alert('Text copied to clipboard');

    });
});