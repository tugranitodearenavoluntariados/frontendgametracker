import React, { useEffect, useState } from "react";
import FormularioJuego from "./components/FormularioJuego";
import TarjetaJuego from "./components/TarjetaJuego";
import "./App.css";

const App = () => {
  const [juegos, setJuegos] = useState([]);
  const [resenaModal, setResenaModal] = useState(null);
  const [nuevaResena, setNuevaResena] = useState({ autor: "", comentario: "" });

  const cargarJuegos = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/games");
      const data = await res.json();
      setJuegos(data);
    } catch (error) {
      console.error("Error al cargar juegos:", error);
    }
  };

  useEffect(() => {
    cargarJuegos();
  }, []);

  const agregarJuego = (nuevo) => setJuegos([nuevo, ...juegos]);

  const eliminarJuego = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/games/${id}`, {
        method: "DELETE",
      });
      
      if (res.ok) {
        setJuegos(prevJuegos => 
          prevJuegos.filter((j) => j._id.toString() !== id.toString())
        );
        
        if (resenaModal && resenaModal._id.toString() === id.toString()) {
          setResenaModal(null);
        }
      } else {
        const errorData = await res.json();
        console.error("No se pudo eliminar el juego:", errorData.message);
      }
    } catch (error) {
      console.error("Error al eliminar juego:", error);
    }
  };

  // FUNCIÓN PARA AGREGAR RESEÑA
  const agregarResena = async (e) => {
    e.preventDefault();
    if (!nuevaResena.autor.trim() || !nuevaResena.comentario.trim()) {
      alert("Por favor completa todos los campos");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/reviews/${resenaModal._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevaResena),
      });

      if (res.ok) {
        const juegoActualizado = await res.json();
        
        // Actualizar el juego en el estado
        setJuegos(prevJuegos => 
          prevJuegos.map(j => 
            j._id === juegoActualizado._id ? juegoActualizado : j
          )
        );
        
        // Actualizar el modal
        setResenaModal(juegoActualizado);
        
        // Limpiar el formulario
        setNuevaResena({ autor: "", comentario: "" });
        
        console.log("Reseña agregada correctamente");
      } else {
        console.error("Error al agregar reseña");
      }
    } catch (error) {
      console.error("Error al agregar reseña:", error);
    }
  };

  const estadisticas = {
    total: juegos.length,
    completados: juegos.filter((j) => j.completado).length,
    pendientes: juegos.filter((j) => !j.completado).length,
  };

  return (
    <div className="app-layout">
      <header className="header">
        <h1>GameTracker</h1>
      </header>

      <div className="content-wrapper">
        <aside className="sidebar">
          <h2>Estadísticas</h2>
          <p>Total de juegos: {estadisticas.total}</p>
          <p>Completados: {estadisticas.completados}</p>
          <p>Pendientes: {estadisticas.pendientes}</p>
        </aside>

        <main className="main-content">
          <FormularioJuego onJuegoAgregado={agregarJuego} />

          <div className="grid-juegos">
            {juegos.map((juego) => (
              <TarjetaJuego
                key={juego._id}
                juego={juego}
                onEliminar={() => eliminarJuego(juego._id)}
                onVerResenas={() => setResenaModal(juego)}
              />
            ))}
          </div>
        </main>
      </div>

      {resenaModal && (
        <div className="modal-fondo" onClick={() => setResenaModal(null)}>
          <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
            <h2>Reseñas de {resenaModal.titulo}</h2>
            
            {/* FORMULARIO PARA AGREGAR RESEÑA */}
            <form onSubmit={agregarResena} className="formulario-resena">
              <h4>Agregar Reseña</h4>
              <input
                type="text"
                placeholder="Tu nombre"
                value={nuevaResena.autor}
                onChange={(e) => setNuevaResena({...nuevaResena, autor: e.target.value})}
                required
              />
              <textarea
                placeholder="Tu comentario"
                value={nuevaResena.comentario}
                onChange={(e) => setNuevaResena({...nuevaResena, comentario: e.target.value})}
                required
                rows="3"
              />
              <button type="submit">Agregar Reseña</button>
            </form>

            {/* LISTA DE RESEÑAS EXISTENTES */}
            <div className="lista-resenas">
              <h4>Reseñas Existentes ({resenaModal.resenas ? resenaModal.resenas.length : 0})</h4>
              {resenaModal.resenas && resenaModal.resenas.length > 0 ? (
                resenaModal.resenas.map((r, i) => (
                  <div key={i} className="resena-card">
                    <strong>{r.autor}:</strong> {r.comentario}
                  </div>
                ))
              ) : (
                <p>No hay reseñas aún. ¡Sé el primero en comentar!</p>
              )}
            </div>

            <button
              className="cerrar-modal"
              onClick={() => setResenaModal(null)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;