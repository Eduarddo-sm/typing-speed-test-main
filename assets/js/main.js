import words from "./data.json" with {type: "json"};
const difficulties = document.querySelectorAll(".button__difficulty");
const mode = document.querySelectorAll(".button__mode");
const input = document.getElementById("card__input");
const btnStart = document.getElementById("button__start");
const textContainer = document.querySelector(".card__content");
const buttonRestart = document.getElementById("button__restart");
const contentContainer = document.querySelector(".card__content");
const difficultySelectMobile = document.getElementById("difficultySelect");
const modeSelectMobile = document.getElementById("modeSelect");
let testStarted = false;
let time = 60;
let timeStarted = false;
let interval;
const typeSettings = {
    difficulty: "easy",
    mode: "timed"
}
let stats = {
    wpm: 0,
    accuracy: 0,
    bwpm: 0
}


difficultySelectMobile.addEventListener("change", () => {
    typeSettings.difficulty = difficultySelectMobile.value;
    startTyping();
});

modeSelectMobile.addEventListener("change", () => {
    typeSettings.mode = modeSelectMobile.value;
});

difficulties.forEach(button => {
    button.addEventListener('click', () => {
        difficulties.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        typeSettings.difficulty = button.getAttribute("data-tab");
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
    const difficulty = typeSettings.difficulty;
    const mode = typeSettings.mode;
    const passage = words[difficulty];
    const randomIndex = Math.floor(Math.random() * passage.length);
    const text = passage[randomIndex].text;

    getStats();
    renderText(text);
    testStarted = true;
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


    input.addEventListener("input", handleInput);

    function handleInput() {
        if (!testStarted) return;
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
                updateWPM();
                updateAccuracy();
                callModal();
                resetTime();
                saveStats();
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

function updateAccuracy(){
    const containerAccuracy = document.querySelector(".nav__accuracy span");
    const totalChar = document.querySelectorAll("#card__text span").length;
    const correct = document.querySelectorAll("#card__text span.correct").length;
    console.log(totalChar, correct)
    stats.accuracy = Math.floor((correct / totalChar) * 100);
    console.log((correct / totalChar) * 100);
    containerAccuracy.textContent =` ${stats.accuracy}%`;

}

function resetTime(){
    timeStarted = false;
    clearInterval(interval);
}

btnStart.addEventListener("click", () =>{
    const container = document.querySelector(".card__start");
    container.style.display = "none";
    input.focus();
    startTyping();
})

textContainer.addEventListener("click", ()=>{
    input.focus();
})

contentContainer.addEventListener("click", (event)=>{
    const container = document.querySelector(".card__start");
    const divSize = contentContainer.getBoundingClientRect();
    
    const clickY = event.clientY - divSize.top;
    const divHalf = divSize.height / 3

    const display = getComputedStyle(container).display;


    if (clickY < divHalf) {
        if (display == "flex") {
            container.style.display = "none";
            startTyping();
            input.focus();
        } else {
            return
        }
    } 
})

function saveStats(){
    localStorage.setItem("stats", JSON.stringify(stats));
}

function getStats(){
    const user = JSON.parse(localStorage.getItem("stats"));
    if (user == null) return;
    stats.bwpm = user.bwpm;
    const containerBWPM = document.querySelector(".header__record span");
    containerBWPM.textContent = user.bwpm;

    const containerAccuracy = document.querySelector(".nav__accuracy span");
    containerAccuracy.textContent = `${user.accuracy}%`;
}

function callModal(){
    const containerModal = document.querySelector("#modal");
    const containerContent = document.querySelector(".container__content");
    const title = document.querySelector(".modal__text h1");
    const subtitle = document.querySelector(".modal__text p");
    const wpm = document.querySelector(".wpm__box span");
    const accuracy = document.querySelector(".accuracy__box span");
    const characterCorrect = document.querySelector(".character__box .char__correct");
    const characterWrong = document.querySelector(".character__box .char__wrong");
    const correct = document.querySelectorAll("#card__text span.correct").length;
    const wrong = document.querySelectorAll("#card__text span.wrong").length;
    const button = document.querySelector("#modal button");
    const imgModal = document.querySelector("#modal img");
    const user = JSON.parse(localStorage.getItem("stats"));

    if (stats.accuracy <= 90){
            accuracy.style.color = "hsl(354, 63%, 57%)";
    }

    if (!localStorage.getItem("stats")){
        containerModal.style.display = "flex";
        containerContent.style.display = "none";

        title.textContent = "Baseline Established!";
        subtitle.textContent = "You've set the bar. Now the real challenge begins-time to beat it.";
        imgModal.src = "./assets/images/icon-completed.svg";
        wpm.textContent = stats.wpm;
        accuracy.textContent = `${stats.accuracy}%`;

        characterCorrect.textContent = correct;
        characterWrong.textContent = wrong;

        button.textContent = "Beat This Score";
    } else if (stats.wpm > user.bwpm) {
        
        containerModal.style.display = "flex";
        containerContent.style.display = "none";
        imgModal.src = "./assets/images/icon-new-pb.svg";
        title.textContent = "High Score Smashed!";
        subtitle.textContent = "Youre getting fast. That was incredible typing.";
        containerModal.style.setProperty("--bg-win", 'url("./assets/images/pattern-confetti.svg")');
        containerModal.style.setProperty("--scale", "scale(1.2)");
        containerModal.style.setProperty("--left", "0px");
        containerModal.style.setProperty("--top", "530px")
        wpm.textContent = stats.wpm;
        accuracy.textContent = `${stats.accuracy}%`;

        characterCorrect.textContent = correct;
        characterWrong.textContent = wrong;

        button.textContent = "Beat This Score";
    } else {
        containerModal.style.display = "flex";
        containerContent.style.display = "none"
        wpm.textContent = stats.wpm;
        imgModal.src = "./assets/images/icon-completed.svg"
        accuracy.textContent = `${stats.accuracy}%`;
        characterCorrect.textContent = correct;
        characterWrong.textContent = wrong;
    }
}

buttonRestart.addEventListener("click", ()=>{
    const containerModal = document.querySelector("#modal");
    const containerContent = document.querySelector(".container__content");
    const containerStart = document.querySelector(".card__start");

    containerStart.style.display = "flex";
    containerModal.style.display = "none";
    containerContent.style.display = "flex";
})


startTyping();




