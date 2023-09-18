








import React, { useState, useEffect } from 'react';

function ChessClock() {


const [tiempo, settiempo] = useState(200)


  const [player1Time, setPlayer1Time] = useState(tiempo); // ACA SE PONE EL TIEMPO
  const [player2Time, setPlayer2Time] = useState(tiempo); // ACA SE PONE EL TIEMPO
  const [activePlayer, setActivePlayer] = useState(null); // Jugador activo (1 o 2)
  const [isPaused, setIsPaused] = useState(false); // ESTADO PARA PAUSAR EL TIEMPO

/*ESTADO PARA CAMBIAR EL COLOR DE <FONDO></FONDO*/
const [speed, setSpeed] = useState(100); // Estado para cambiar la velocidad







  useEffect(() => {
    let interval;

    if (!isPaused) {
      if (activePlayer === 1 && player1Time > 0) {
        interval = setInterval(() => {
          setPlayer1Time(player1Time - 1);
        }, speed); // VELOCIDAD DE RELOJ
      } else if (activePlayer === 2 && player2Time > 0) {
        interval = setInterval(() => {
          setPlayer2Time(player2Time - 1);
        }, speed); //VELOCIDAD DE RELOJ
      }
    }

    if (player1Time === 0) {
      let ganador2 = document.querySelector(".jugador2win");
      ganador2.classList.add("aparecer");
    } else if (player2Time === 0) {
      let ganador1 = document.querySelector(".jugador1win");
      ganador1.classList.add("aparecer");
    }

    return () => clearInterval(interval);
  }, [activePlayer, player1Time, player2Time, isPaused]);

  const handleClick = (player) => {
    setActivePlayer(player);
    setIsPaused(false); // Reanudar los relojes cuando se cambia de jugador





  };

  const togglePause = () => {
    setIsPaused(!isPaused); // Cambiar el estado de pausa
  };

  const resetClock = () => {
   clearInterval(player1Time);
    clearInterval(player2Time);
    setPlayer1Time(tiempo);
    setPlayer2Time(tiempo);

    setActivePlayer(null);
    setIsPaused(false); // Asegúrate de que los relojes no estén en pausa al reiniciar
  };


  const valor = (event) => {
    let elemento = event.currentTarget.textContent;
    let numero = parseFloat(elemento);
 
   
  
    if (!isNaN(numero)) {
      console.log(numero);
     setPlayer1Time(elemento*60)
      setPlayer2Time(elemento*60)
    settiempo(elemento*60)
    } else {
      console.log("No es un número válido");
    }


  
  }



const ocular_alclick = () => {
  let menu = document.querySelector(".fondo_menu");
    menu.classList.toggle("trasladar")
    let menu2 = document.querySelector(".cont_menu");
    menu2.classList.toggle("agrandar_letras")
}





const trasladar = () => {

  let menu = document.querySelector(".fondo_menu");
  menu.classList.toggle("trasladar")
  let menu2 = document.querySelector(".cont_menu");
  menu2.classList.toggle("agrandar_letras")


}







/*CODIGO PARA EL BOTON DE EDITAR EL TIEMPO */



const [newMinutes, setNewMinutes] = useState(''); // Estado para almacenar los minutos
const [newSeconds, setNewSeconds] = useState(''); // Estado para almacenar los segundos

const handleSetTime = () => {
  const minutesValue = parseInt(newMinutes);
  const secondsValue = parseInt(newSeconds);
  
  if (!isNaN(minutesValue) && !isNaN(secondsValue)) {
    const totalSeconds = minutesValue * 60 + secondsValue;
    setPlayer1Time(totalSeconds);
    setPlayer2Time(totalSeconds);
    settiempo(totalSeconds)
    setNewMinutes('');
    setNewSeconds('');
  }
};


























  return (
    <>
<header>
<div className="cont_header">
<a  onClick={trasladar}  className='icono'  ><i class="fa-solid fa-bars"></i></a>
<h2>RELOJ DE <span>AJEDREZ</span></h2>

</div>
</header>




<div className="fondo_menu">
<div className="cont_menu">

<div className="cont_x">
<a onClick={trasladar}  className='equis'><i class="fa-solid fa-xmark"></i></a>
</div>
<div className="opciones">


<h3   ><i class="fa-solid fa-fire"></i><div className="tiempo">
  <p>Veloz</p>

  <p  onClick={ocular_alclick}   ><a  onClick={valor} >1.00</a></p>

  </div></h3>



  <h3   ><i class="fa-solid fa-bolt"></i><div className="tiempo">
  <p>Rapido</p>

  <p  onClick={ocular_alclick}  ><a  onClick={valor} >3.00</a></p>

  </div></h3>




  <h3  ><i class="fa-solid fa-bolt"></i><div className="tiempo">
  <p>Rapido</p>
  <p  onClick={ocular_alclick} ><a  onClick={valor} >5.00</a></p>

  </div></h3>




  <h3  ><i class="fa-solid fa-clock"></i><div className="tiempo">
  <p>Normal</p>
  <p  onClick={ocular_alclick} ><a onClick={valor}>15.00</a></p>

  </div></h3>






  <h3   ><i class="fa-solid fa-pencil"></i><div className="tiempo">
  <p>Editar</p>
<a  >0.00</a>
  </div></h3>




</div>



</div>



</div>



































































<div className="cont_confg">
        <input
          type="number"
          placeholder="Minutos"
          value={newMinutes}
          onChange={(e) => setNewMinutes(e.target.value)}
        />
        <input
          type="number"
          placeholder="Segundos"
          value={newSeconds}
          onChange={(e) => setNewSeconds(e.target.value)}
        />
        <input
          type="number"
          placeholder="Velocidad (ms)"
          value={speed}
          onChange={(e) => setSpeed(parseInt(e.target.value))}
        />
        <button onClick={handleSetTime}>Establecer Tiempo</button>
      </div>







    <div className="chess-clock">
      <h1 className='jugador2win desaparecer'>El jugador 2 es el ganador</h1>
      <h1 className='jugador1win desaparecer'>El jugador 1 es el ganador</h1>

      <div
        className={`player ${activePlayer === 1 ? 'active fondo_color' : ''} boton boton1     `}
        onClick={() => { handleClick(1) }}
      >
        <h2>Jugador 1</h2>
        <div className="time"><h1>{Math.floor(player1Time / 60)}:{player1Time % 60}</h1></div>
      </div>

      <div className="controls">
        <a onClick={resetClock}><i class="fa-solid fa-forward"></i> Reiniciar</a>
        <a onClick={togglePause}>{isPaused ? <><i class="fa-solid fa-stop"></i>Reanudar</> : <> <i class="fa-solid fa-play"></i>Pausa</>}</a>
      </div>

      <div
        className={`player ${activePlayer === 2 ? 'active fondo_color' : ''} boton boton2  `}
        onClick={() => { handleClick(2)}}
      >
        <h2>Jugador 2</h2>
        <div className="time"><h1>{Math.floor(player2Time / 60)}:{player2Time % 60}</h1></div>
      </div>
    </div>

    </>
  );
}

export default ChessClock;