const difficulty = document.querySelectorAll('.button__difficulty');
const mode = document.querySelectorAll('.button__mode');

//difficulty é uma array que tem todos os botões de dificuldade. A gente chama esse array de botoês e para cada botão, utilizando um forEach, que fisga todos os botões, então a gente declara para cada botão dentro de difficulty, um evento de escuto utilizando colchetes
difficulty.forEach(button => {
    
    button.addEventListener('click', () =>{
        difficulty.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    })
})

mode.forEach(button => {
    button.addEventListener('click', () =>{
        mode.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    })
})