import words from "./data.json" with {type: "json"};

const difficulty = document.querySelectorAll('.button__difficulty');
const mode = document.querySelectorAll('.button__mode');
const typeSettings = {
    difficulty: "easy",
    mode: "timed"
}

//difficulty é uma array que tem todos os botões de dificuldade. A gente chama esse array de botoês e para cada botão, utilizando um forEach, que fisga todos os botões, então a gente declara para cada botão dentro de difficulty, um evento de escuto utilizando colchetes
difficulty.forEach(button => {
    //dentro do forEach, definimos cada botão com a var button, e então criamos para cada button um evento de escuta, ou seja, cada botão ao ser  clicado fará a mesma ação, que será remover a classe active de todos os botões conforme difficulty, e de´pos adicionar no button do difficulty clicado a classe active.
    button.addEventListener('click', () =>{
        difficulty.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        //pega a informaçao e joga na lista criada
        typeSettings.difficulty = button.getAttribute('data-tab');

        startGame();
    })
})

mode.forEach(button => {
    button.addEventListener('click', () =>{
        mode.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        //pega a informaçao e joga na lista criada
        typeSettings.mode = button.getAttribute('data-tab');

        startGame();
    })
})



function startGame() {
    const difficulty = typeSettings.difficulty;
    const mode = typeSettings.mode;

    //controle de fluxo
    console.log("difficulty:", difficulty);
    console.log("mode:", mode);

    const passages = words[difficulty];

    const randomIndex = Math.floor(Math.random() * passages.length);

    const text = passages[randomIndex].text;
    console.log(text);
}