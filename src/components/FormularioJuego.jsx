import React, { useState } from "react";

const FormularioJuego = ({ onJuegoAgregado }) => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar que la URL no esté vacía
    if (!imagen.trim()) {
      alert("Por favor ingresa una URL de imagen");
      return;
    }

    const nuevoJuego = { 
      titulo: titulo.trim(), 
      descripcion: descripcion.trim(), 
      imagen: imagen.trim(), 
      completado: false 
    };

    try {
      const res = await fetch("http://localhost:5000/api/games", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoJuego),
      });
      
      if (res.ok) {
        const data = await res.json();
        onJuegoAgregado(data);
        
        // Limpiar campos después de agregar
        setTitulo("");
        setDescripcion("");
        setImagen("");
      } else {
        console.error("Error al agregar juego");
      }
    } catch (err) {
      console.error("Error al agregar juego:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="formulario-juego">
      <h4>Agregar Juego</h4>
      
      <label>Título:</label>
      <input
        type="text"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        required
        placeholder="Ingresa el título del juego"
      />
      
      <label>Descripción:</label>
      <textarea
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        placeholder="Descripción del juego"
      ></textarea>
      
      <label>URL de imagen:</label>
      <input
        type="url"
        value={imagen}
        onChange={(e) => setImagen(e.target.value)}
        required
        placeholder="https://ejemplo.com/imagen.jpg"
      />
      
      <button type="submit">Agregar</button>
    </form>
  );
};

export default FormularioJuego;