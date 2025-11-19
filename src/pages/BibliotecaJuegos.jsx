import React, { useEffect, useState } from "react";
import axios from "axios";
import TarjetaJuego from "../components/TarjetaJuego";
import FormularioJuego from "../components/FormularioJuego";

const BibliotecaJuegos = () => {
  const [juegos, setJuegos] = useState([]);

  const fetchJuegos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/games");
      setJuegos(response.data);
    } catch (error) {
      console.error("Error al traer juegos:", error);
    }
  };

  useEffect(() => {
    fetchJuegos();
  }, []);

  const agregarJuego = (nuevoJuego) =>
    setJuegos((prev) => [...prev, nuevoJuego]);

  const eliminarJuego = (id) =>
    setJuegos((prev) => prev.filter((j) => j._id !== id));

  const eliminarJuegoBackend = async (id) => {
  try {
    // Corregir "gamess" por "games"
    await axios.delete(`http://localhost:5000/api/games/${id}`);
    eliminarJuego(id);
  } catch (error) {
    console.error("Error al eliminar juego:", error);
  }
};

  return (
    <div className="biblioteca-contenedor">
      <h2>Mi Biblioteca de Juegos</h2>

      {/* Formulario */}
      <FormularioJuego onGuardar={agregarJuego} />

      {/* Grid */}
      <div className="grid-juegos">
        {juegos.map((juego) => (
          <TarjetaJuego
            key={juego._id}
            juego={juego}
            onEliminar={() => eliminarJuegoBackend(juego._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default BibliotecaJuegos;
