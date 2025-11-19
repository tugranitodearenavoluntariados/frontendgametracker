import React, { useState } from "react";
import axios from "axios";

const FormularioResena = ({ juegoId, onNuevaResena }) => {
  const [puntuacion, setPuntuacion] = useState(5);
  const [textoResena, setTextoResena] = useState("");
  const [horasJugadas, setHorasJugadas] = useState(0);
  const [dificultad, setDificultad] = useState("Normal");
  const [recomendaria, setRecomendaria] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const nuevaResena = { juegoId, puntuacion, textoResena, horasJugadas, dificultad, recomendaria };
      const response = await axios.post("http://localhost:5000/api/reviews", nuevaResena);

      setTextoResena("");
      setHorasJugadas(0);
      setPuntuacion(5);
      setDificultad("Normal");
      setRecomendaria(true);

      if (onNuevaResena) onNuevaResena(response.data);
    } catch (error) {
      console.error("Error al crear reseña:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "10px", border: "1px solid #ccc", padding: "10px", borderRadius: "5px" }}>
      <h4>Agregar reseña:</h4>
      <label>Puntuación:
        <select value={puntuacion} onChange={(e) => setPuntuacion(Number(e.target.value))}>
          {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
        </select>
      </label><br/>
      <label>Texto de la reseña:<textarea value={textoResena} onChange={(e) => setTextoResena(e.target.value)} required /></label><br/>
      <label>Horas jugadas:<input type="number" value={horasJugadas} onChange={(e) => setHorasJugadas(Number(e.target.value))} min="0" /></label><br/>
      <label>Dificultad:
        <select value={dificultad} onChange={(e) => setDificultad(e.target.value)}>
          <option value="Fácil">Fácil</option>
          <option value="Normal">Normal</option>
          <option value="Difícil">Difícil</option>
        </select>
      </label><br/>
      <label>¿Recomendaría?<input type="checkbox" checked={recomendaria} onChange={(e) => setRecomendaria(e.target.checked)} /></label><br/>
      <button type="submit">Agregar reseña</button>
    </form>
  );
};

export default FormularioResena;
