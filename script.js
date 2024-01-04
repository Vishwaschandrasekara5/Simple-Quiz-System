// script.js

let currentQuestion = 1;
let score = 0;

function showQuestion(questionNumber) {
    const questions = document.querySelectorAll('.question');
    questions.forEach((question, index) => {
        if (index + 1 === questionNumber) {
            question.style.display = 'block';
        } else {
            question.style.display = 'none';
        }
    });
}

function nextQuestion() {
    if (currentQuestion < 10) {
        currentQuestion++;
        showQuestion(currentQuestion);
        document.getElementById('nextBtn').style.display = 'block';
    }

    if (currentQuestion === 10) {
        document.getElementById('submitBtn').style.display = 'block';
        document.getElementById('nextBtn').style.display = 'none';
    }
}

function prevQuestion() {
    if (currentQuestion > 1) {
        currentQuestion--;
        showQuestion(currentQuestion);
    }

    if (currentQuestion < 10) {
        document.getElementById('submitBtn').style.display = 'none';
        document.getElementById('nextBtn').style.display = 'block';
    }
}

function submitQuiz() {
    const answers = {
        q1: 'a', // Correct answer for question 1
        q2: 'b', // Correct answer for question 2
        q3: 'a', // Correct answer for question 3
        q4: 'c', // Correct answer for question 4
        q5: 'b', // Correct answer for question 5
        q6: 'a', // Correct answer for question 6
        q7: 'b', // Correct answer for question 7
        q8: 'b', // Correct answer for question 8
        q9: 'c', // Correct answer for question 9
        q10: 'b', // Correct answer for question 10
    };

    const form = document.getElementById('quiz-form');
    const resultsContainer = document.getElementById('results-container');
    const results = document.getElementById('results');

    let score = 0;
    let userAnswers = {};

    // Check each question's answer
    for (let i = 1; i <= Object.keys(answers).length; i++) {
        const selectedAnswer = document.querySelector(`input[name="q${i}"]:checked`);
        
        if (selectedAnswer) {
            userAnswers[`q${i}`] = selectedAnswer.value;

            if (selectedAnswer.value === answers[`q${i}`]) {
                score++;
            }
        } else {
            userAnswers[`q${i}`] = 'Not marked';
        }
    }

    // Calculate percentage
    const totalQuestions = Object.keys(answers).length;
    const percentage = (score / totalQuestions) * 100;

    // Determine the color based on the percentage
    let color = '';
    if (percentage < 40) {
        color = 'red';
    } else if (percentage >= 40 && percentage <= 75) {
        color = 'blue';
    } else {
        color = 'lightgreen';
    }

    // Display results with correct and wrong answers and colored percentage
    let resultHTML = `You scored ${score} out of ${totalQuestions}.<br>`;
    resultHTML += `<span style="color: ${color}">Percentage: ${percentage.toFixed(2)}%</span><br><br>`;

    for (let i = 1; i <= totalQuestions; i++) {
        resultHTML += `Question ${i}: Your answer - ${userAnswers[`q${i}`]}, Correct answer - ${answers[`q${i}`]}<br>`;
    }

    results.innerHTML = resultHTML;
    resultsContainer.style.display = 'block';
    form.style.display = 'none';
}

