








import React, { useState, useEffect } from 'react';

function ChessClock() {
  const [player1Time, setPlayer1Time] = useState(100); // ACA SE PONE EL TIEMPO
  const [player2Time, setPlayer2Time] = useState(100); // ACA SE PONE EL TIEMPO
  const [activePlayer, setActivePlayer] = useState(null); // Jugador activo (1 o 2)
  const [isPaused, setIsPaused] = useState(false); // ESTADO PARA PAUSAR EL TIEMPO

  useEffect(() => {
    let interval;

    if (!isPaused) {
      if (activePlayer === 1 && player1Time > 0) {
        interval = setInterval(() => {
          setPlayer1Time(player1Time - 1);
        }, 100); // VELOCIDAD DE RELOJ
      } else if (activePlayer === 2 && player2Time > 0) {
        interval = setInterval(() => {
          setPlayer2Time(player2Time - 1);
        }, 100); //VELOCIDAD DE RELOJ
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
    setPlayer1Time(600);
    setPlayer2Time(600);
    setActivePlayer(null);
    setIsPaused(false); // Asegúrate de que los relojes no estén en pausa al reiniciar
  };

  return (
    <div className="chess-clock">
      <h1 className='jugador2win desaparecer'>El jugador 2 es el ganador</h1>
      <h1 className='jugador1win desaparecer'>El jugador 1 es el ganador</h1>

      <div
        className={`player ${activePlayer === 1 ? 'active' : ''} boton`}
        onClick={() => handleClick(1)}
      >
        <h2>Jugador 1</h2>
        <div className="time"><h1>{Math.floor(player1Time / 60)}:{player1Time % 60}</h1></div>
      </div>

      <div className="controls">
        <a onClick={resetClock}><i class="fa-solid fa-forward"></i> Reiniciar</a>
        <a onClick={togglePause}>{isPaused ? 'Reanudar' : 'Pausar'}</a>
      </div>

      <div
        className={`player ${activePlayer === 2 ? 'active' : ''} boton`}
        onClick={() => handleClick(2)}
      >
        <h2>Jugador 2</h2>
        <div className="time"><h1>{Math.floor(player2Time / 60)}:{player2Time % 60}</h1></div>
      </div>
    </div>
  );
}

export default ChessClock;