function showResult(resultsEl, rightQuestions, wrongQuestions) {
    if (rightQuestions >= wrongQuestions) {
        resultsEl.addClass("alert-success");
    } else {
        resultsEl.addClass("alert-warning");
    }

    $("#correctCount").text(rightQuestions);
    $("#totalCount").text(rightQuestions + wrongQuestions);
    resultsEl.show();
}