/* document.getElementById('form').addEventListener('submit', players); */

let btnOpction = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newbtn = document.getElementById("new-game");
let restart = document.getElementById("restart");
let message = document.getElementById("message");

let mensaje = "";
let winner= "";
/* 
let player1 ="Fabi" ;

let player2 ="Hanni" ; */



function recibir() {
    let player1 = document.getElementById('player1').value;
    let player2 = document.getElementById('player2').value;
    console.log('Jugando:', player1,' y ', player2);
    }


// patron
 // posiciones del arreglo
let patron =[
    [0,1,2],
    [0,3,6],
    [2,5,8],
    [6,7,8],
    [3,4,5],
    [1,4,7],
    [0,4,8],
    [2,4,6],
];
 // player X juega primero
let xTurno = true;
let count = 0;

// ocultar todos los botones
const disableButtons =()=>{
    btnOpction.forEach((element)=>(element.disable=true));
    //mostrar 
    popupRef.classList.remove("hide");

};

//Mostrar todos  los botones (para new gane y restart)
const enableButtons = ()=>{
    btnOpction.forEach((element)=>{
        element.innerText= "";
        element.disable = false;

    });
    popupRef.classList.add("hide");
};

// funcion que se ejecuta cuando el player gana
const win = (letter) =>{
    disableButtons();
    recibir();

    if(letter == "X"){
        message.innerHTML = "  X ha ganado!!"
        mensaje = "  X ha ganado!!"
        winner = player1.value;
        console.log(winner)
        console.log( player1 ,' Ha ganado con X!')
    }else{
        message.innerHTML = "  O ha ganado!!"
        mensaje = "  O ha ganado!!"
        winner = player2.value;
        console.log(winner)
        console.log(player2 ,' Ha ganado con O!')
    };

   

    const resultado={
        mensaje,
        winner
    };
   
    if (localStorage.getItem('resultados')=== null){
        // si es nulo
        let resultados = [];
        resultados.push(resultado);
        localStorage.setItem('resultados', JSON.stringify(resultados));
    } else {
        // si existe
        let resultados = JSON.parse( localStorage.getItem('resultados'));
        resultados.push(resultado);
        localStorage.setItem('resultados', JSON.stringify(resultados));
    }
    

    window.location.reload();

};

// 
const draw=()=>{
    disableButtons();
    message.innerHTML = "Juego Terminado";
};

// nuevo juego
newbtn.addEventListener("click", ()=>{count = 0; enableButtons();});
restart.addEventListener("click", ()=>{count = 0; enableButtons();});

// logica
const winChecker =()=>{
    for(let i of patron){
        let [element1, element2, element3]=[
            btnOpction[i[0]].innerText,
            btnOpction[i[1]].innerText,
            btnOpction[i[2]].innerText,
        ];
        if(element1 !="" && (element2 !="")&(element3 !="")){
            if (element1 == element2 && element2== element3) {
                win(element1);
                
            }
        }


    }

    
};

btnOpction.forEach((element)=>{
    element.addEventListener("click", ()=>{
        if (xTurno) {
            xTurno= false;
            element.innerText = "X";
            element.disable=true;
            
        }else{
            xTurno= true;
            element.innerText = "O";
            element.disable=true;
        }
        count +=1;
        if (count == 9) {
            draw();
            
        }
        winChecker();
    });
});

function list() {
    let resultados = JSON.parse ( localStorage.getItem('resultados'));
    let winsView = document.getElementById('wins');
    winsView.innerHTML ='';

    if (resultados == null) {
        resultados = 0;  
    }
 
    for (let i = 0; i < resultados.length; i++) { 
    console.log(resultados[i])
     let mensaje = resultados[i].mensaje;
     let winner = resultados[i].winner;
    
     winsView.innerHTML += `
     <tr>
      <th scope="row">${winner}</th>
      <td>${mensaje}</td>
    </tr>
    `;
 
 }
 }

 list();
window.onload = enableButtons;

