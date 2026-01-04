if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
}

let questions = [];
let currentIndex = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEls = document.querySelectorAll(".options span");
const radioEls = document.querySelectorAll("input[name='option']");
const progressEl = document.getElementById("progress");
const nextBtn = document.getElementById("nextBtn");

// Load questions from JSON
fetch("questions.json")
    .then(res => res.json())
    .then(data => {
        questions = data;
        loadQuestion();
    });

function loadQuestion() {
    deselectOptions();

    const q = questions[currentIndex];
    questionEl.textContent = q.question;
    progressEl.textContent = `Question ${currentIndex + 1} / 50`;

    q.options.forEach((opt, index) => {
        optionsEls[index].textContent = opt;
    });
}

function deselectOptions() {
    radioEls.forEach(r => r.checked = false);
}

function getSelected() {
    let selected = null;
    radioEls.forEach((radio, index) => {
        if (radio.checked) selected = index;
    });
    return selected;
}

nextBtn.addEventListener("click", () => {
    const selected = getSelected();

    if (selected === null) {
        alert("Please select an answer!");
        return;
    }

    if (selected === questions[currentIndex].answer) {
        score += 2; // 2 marks per question
    }

    currentIndex++;

    if (currentIndex < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    document.querySelector(".quiz").innerHTML = `
        <h1>Quiz Completed !🎉</h1>
        <h2>Your Score: ${score} / 100</h2>
        <p>Correct Answers: ${score / 2} / 50</p>
        <div class="button-group">
            <button onclick="location.reload()">Restart Quiz</button>
            <button onclick="logout()">Logout</button>
        </div>
    `;
}


function logout() {
    localStorage.clear();
    window.location.href = "login.html";
}

