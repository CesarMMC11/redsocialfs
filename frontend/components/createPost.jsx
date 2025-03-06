// src/components/CreatePost.jsx
import React, { useState } from "react";

const CreatePost = ({ onPostCreated }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [img, setImg] = useState(null);

  // Para efectos de demostración, usamos un userID fijo.
  // En un entorno real, usarás la información del usuario autenticado.
    const userID = 1;

    const handleSubmit = async (e) => {
    e.preventDefault();

    // Creamos el objeto FormData para enviar la imagen y demás datos
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("userID", userID);
    if (img) {
        formData.append("img", img);
    }

    try {
        const response = await fetch("http://localhost:3000/api/posts/create", {
        method: "POST",
        // Al enviar un FormData, el navegador setea el Content-Type automáticamente
        body: formData,
        });

        const data = await response.json();

        if (response.ok) {
        alert(data.message);
        // Limpia campos y notifica al componente padre
        setTitle("");
        setContent("");
        setImg(null);
        onPostCreated(data.post);
        } else {
        alert("Error: " + data.error);
        }
    } catch (error) {
        console.error("Error al crear la publicación:", error);
        alert("Error al crear la publicación");
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
        <h2>Crear Publicación</h2>
        <div>
        <label htmlFor="title">Título:</label>
        <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
        />
      </div>
      <div>
        <label htmlFor="content">Contenido:</label>
        <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
        ></textarea>
      </div>
      <div>
        <label htmlFor="img">Imagen:</label>
        <input
            type="file"
            id="img"
            accept="image/*"
            onChange={(e) => setImg(e.target.files[0])}
        />
      </div>
      <button type="submit">Crear Publicación</button>
    </form>
  );
};

export default CreatePost;

