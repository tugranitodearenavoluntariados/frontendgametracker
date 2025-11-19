import React, { useEffect, useState } from "react";
import axios from "axios";

const EstadisticasPersonales = () => {
  const [juegos, setJuegos] = useState([]);
  const [resenas, setResenas] = useState([]);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const juegosResponse = await axios.get("http://localhost:5000/api/games");
        const resenasResponse = await axios.get("http://localhost:5000/api/reviews");

        setJuegos(juegosResponse.data);
        setResenas(resenasResponse.data);
      } catch (error) {
        console.error("Error al traer datos:", error);
      }
    };
    fetchDatos();
  }, []);

  const totalJuegos = juegos.length;
  const juegosCompletados = juegos.filter(j => j.completado).length;
  const totalHorasJugadas = resenas.reduce((acc,r) => acc + r.horasJugadas,0);
  const promedioPuntuacion = resenas.length > 0 ? (resenas.reduce((acc,r) => acc + r.puntuacion,0)/resenas.length).toFixed(2) : 0;

  return (
    <div style={{ border:"1px solid #ccc", padding:"15px", margin:"10px", borderRadius:"5px" }}>
      <h2>Estadísticas Personales</h2>
      <p>Total de juegos en biblioteca: <strong>{totalJuegos}</strong></p>
      <p>Juegos completados: <strong>{juegosCompletados}</strong></p>
      <p>Total de horas jugadas: <strong>{totalHorasJugadas}</strong></p>
      <p>Promedio de puntuación de reseñas: <strong>{promedioPuntuacion} ⭐</strong></p>
    </div>
  );
};

export default EstadisticasPersonales;
