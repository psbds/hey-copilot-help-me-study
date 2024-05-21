function createQuestions(questionArray, examElement) {
    var counter = 0
    for (var question of questionArray) {
        var questionEl = $(`
        <div class='question-box card border-dark mb-3'>
            <div class='card-header'>Question ${(counter + 1)}</div>
            <div class='card-body'>
                <div class='card-title'>${question.question}</div>
                ${question.options.map((option, index) => createQuestion(option, counter, index)).join('')}
        </div>
        `)
        examElement.append(questionEl);
        counter++;
    }
}

function createQuestion(option, questionNumber, optionNumber) {
    return `
    <div>
        <input type="radio" class="form-check-input question-option" name="question-${questionNumber}-${optionNumber}" value="${option.value}" data-correct="${option.isCorrect}"> ${option.value}
    </div>
    `;
}

function onQuestionClicked(pickElement) {
    var isCorrect = pickElement.data('correct');
    if (isCorrect) {
        pickElement.after("<span style='float: right'>Correct</span>")
    } else {
        pickElement.after("<span style='float: right'>Incorrect</span>")
    }


    for (var child of pickElement.parent().parent().children()) {
        element = $(child).find('.question-option')
        elName = $(element).attr('name')
        elName = $(element).attr('disabled', 'true')
        if (element.data('correct') === true) {
            element.parent().css('color', 'green')
        } else {
            element.parent().css('color', 'red')
        }
    }

    return isCorrect;
}