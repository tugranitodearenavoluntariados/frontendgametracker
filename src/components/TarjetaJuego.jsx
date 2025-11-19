import React from "react";

const TarjetaJuego = ({ juego, onEliminar, onVerResenas }) => {
  return (
    <div className="game-card">
      <img
        src={juego.imagenPortada || "https://via.placeholder.com/250x150"}
        alt={juego.titulo}
        className="game-img"
      />
      <h3>{juego.titulo}</h3>
      <p>Género: {juego.genero}</p>
      <p>Plataforma: {juego.plataforma}</p>
      <div className="card-buttons">
        <button className="btn-primary" onClick={onVerResenas}>
          Ver Reseñas
        </button>
        <button className="btn-danger" onClick={onEliminar}>
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default TarjetaJuego;
