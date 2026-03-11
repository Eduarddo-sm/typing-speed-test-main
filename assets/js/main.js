import words from "./data.json" with {type: "json"};
const difficulties = document.querySelectorAll(".button__difficulty");
const mode = document.querySelectorAll(".button__mode");
const typeSettings = {
    diffculty: "easy",
    mode: "timed"
}

difficulties.forEach(button => {
    button.addEventListener('click', ()=>{
        difficulties.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        typeSettings.diffculty = button.getAttribute("data-tab");
        startTyping();
    })
})

mode.forEach(button => {
    button.addEventListener('click', ()=>{
        mode.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        typeSettings.mode = button.getAttribute("data-tab");
    })
})

function startTyping(){
    const diffculty = typeSettings.diffculty;
    const mode = typeSettings.mode;
    const passage = words[diffculty];
    const randomIndex = Math.floor(Math.random() * passage.length);
    const text = passage[randomIndex].text;

    renderText(text);
}

function renderText(text){
    const container = document.getElementById("card__text");
    container.innerHTML = "";
    text.split("").forEach(letter => {
        const span = document.createElement('span')
        span.textContent = letter;
        container.appendChild(span);
    })
}



