import words from "./data.json" with {type: "json"};
const difficulties = document.querySelectorAll(".button__difficulty");
const mode = document.querySelectorAll(".button__mode");
const input = document.getElementById("card__input");
const btnStart = document.getElementById("button__start");
const textContainer = document.querySelector(".card__content");
let time = 60;
let timeStarted = false;
let interval;
const typeSettings = {
    diffculty: "easy",
    mode: "timed"
}
let stats = {
    wpm: 0,
    accuracy: 0,
    bwpm: 0
}



difficulties.forEach(button => {
    button.addEventListener('click', () => {
        difficulties.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        typeSettings.diffculty = button.getAttribute("data-tab");
        startTyping();
    })
})

mode.forEach(button => {
    button.addEventListener('click', () => {
        mode.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        typeSettings.mode = button.getAttribute("data-tab");
    })
})

function startTyping() {
    input.value = ""
    time = 60;
    const diffculty = typeSettings.diffculty;
    const mode = typeSettings.mode;
    const passage = words[diffculty];
    const randomIndex = Math.floor(Math.random() * passage.length);
    const text = passage[randomIndex].text;

    renderText(text);
}

function renderText(text) {
    const container = document.getElementById("card__text");
    container.innerHTML = "";
    text.split("").forEach(letter => {
        const span = document.createElement('span')
        span.textContent = letter;
        container.appendChild(span);
    })
}


function start() {
    input.addEventListener("input", handleInput);

    function handleInput() {
        const spans = document.querySelectorAll("#card__text span");
        const typedText = input.value.split("");

        if (typeSettings.mode == "timed" && timeStarted == false) {
        timeStarted = true;
        startTimer();
    }

        spans.forEach((span, index) => {
            const letter = typedText[index];
            span.classList.remove("active");
            if (letter == null) {
                span.classList.remove("correct", "wrong");
            } else if (letter === span.textContent) {
                span.classList.add("correct");
                span.classList.remove("wrong");
            } else {
                span.classList.add("wrong");
                span.classList.remove("correct");
            }

            if (index === typedText.length) {
                span.classList.add("active");
            }
        });

         if (typedText.length == spans.length) {
                const correct = document.querySelectorAll("#card__text span.correct").length;
                stats.accuracy = (correct / spans.length) * 100;
                updateWPM();
                resetTime();
            }

    }
}

function startTimer() {
    interval = setInterval(()=>{
        time--;

        const timerContainer = document.querySelector(".nav__time span");
        timerContainer.textContent = time;

        if (time < 10){
            timerContainer.textContent = `0${time}`;
        }

        if(time <= 0){
            resetTime();
        }
    }, 1000);
}

function updateWPM(){
    const containerWPM = document.querySelector(".nav__wpm span");
    const correctChars = document.querySelectorAll("#card__text span.correct").length;
    const timePassed = 60 - time;
    stats.wpm = Math.round((correctChars / 5) / (timePassed / 60));
    containerWPM.textContent = stats.wpm;

    if (stats.wpm > stats.bwpm){
        const bestWPM = document.querySelector(".header__record span");
        stats.bwpm = stats.wpm;
        bestWPM.textContent = stats.wpm;
    }
}

function resetTime(){
    console.log("ola");
    timeStarted = false;
    clearInterval(interval);
}

btnStart.addEventListener("click", () =>{
    const container = document.querySelector(".card__start");
    container.style.display = "none";
    input.focus();
    start();
})

textContainer.addEventListener("click", ()=>{
    input.focus();
})

startTyping()



