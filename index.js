$(document).ready(function () {
    var remainingQuestions = -1;
    var rightQuestions = 0;
    var wrongQuestions = 0;
    var editor = new JsonEditor("editor");


    const urlParams = new URLSearchParams(window.location.search);
    const exam = urlParams.get('exam');

    if (exam) {
        try {
            var decodedBase = atob(exam);
            editor.setValue(decodedBase);
            startExam();
        } catch {
            alert("Invalid exam data")
        }
    }

    $("#create-btn").click(function () {
        startExam();
    });


    function startExam() {
        var questionArray;
        try {
            var jsonString = editor.getValue();
            questionArray = JSON.parse(jsonString);
            remainingQuestions = questionArray.length;
        } catch (e) {
            console.error(e);
            alert("Invalid JSON");
            return;
        }
        createQuestions(questionArray, $("#exam"));
        $("#start").hide()
        $("#share").show()
        $("#share input").text("https://psbds.github.io/hey-copilot-help-me-study/?exam=" + btoa(jsonString))
    }

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

    $("#share-btn").on('click', function () {
        var text = $("#share input").text();
        var textarea = document.createElement('textarea');
        textarea.textContent = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        alert('Share link copied to clipboard');

    });
});