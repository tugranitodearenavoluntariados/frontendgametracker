import React, { useEffect, useState } from "react";
import axios from "axios";

const ListaResenas = ({ juegoId, resenasIniciales = [] }) => {
  const [resenas, setResenas] = useState(resenasIniciales);

  useEffect(() => {
    const fetchResenas = async () => {
      if (!juegoId) return;
      try {
        const response = await axios.get(`http://localhost:5000/api/reviews/juego/${juegoId}`);
        setResenas(response.data);
      } catch (error) {
        console.error("Error al traer reseñas:", error);
      }
    };
    fetchResenas();
  }, [juegoId]);

  const eliminarResenaBackend = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/reviews/${id}`);
      setResenas(prev => prev.filter(r => r._id !== id));
    } catch (error) {
      console.error("Error al eliminar reseña:", error);
    }
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <h4>Reseñas:</h4>
      {resenas.length === 0 ? <p>No hay reseñas todavía.</p> :
        resenas.map(resena => (
          <div key={resena._id} style={{ border: "1px solid #ccc", padding:"5px", marginBottom:"5px" }}>
            <p><strong>Puntuación:</strong> {resena.puntuacion} ⭐</p>
            <p>{resena.textoResena}</p>
            <p><em>Horas jugadas:</em> {resena.horasJugadas}</p>
            <p><em>Dificultad:</em> {resena.dificultad}</p>
            <p><em>Recomendaría:</em> {resena.recomendaria ? "Sí" : "No"}</p>
            <button onClick={() => eliminarResenaBackend(resena._id)} style={{marginTop:"5px", background:"red", color:"white", border:"none", padding:"3px 6px", borderRadius:"3px"}}>Eliminar reseña</button>
          </div>
        ))
      }
    </div>
  );
};

export default ListaResenas;
