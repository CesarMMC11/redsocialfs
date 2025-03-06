import React, { useState } from "react";

const CreateComment = ({ postID, onCommentCreated }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  
  // Para efectos de demostración, usamos un userID fijo.
  // En un entorno real, usarás la información del usuario autenticado.
  const userID = 1;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/comments/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          userID,
          postID,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Limpia campos y notifica al componente padre
        setTitle("");
        setContent("");
        onCommentCreated(data.comment);
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Error al crear el comentario:", error);
      alert("Error al crear el comentario");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <h3>Añadir un comentario</h3>
      <div className="form-group">
        <label htmlFor="title">Título:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="content">Comentario:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="form-control"
          rows="3"
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary">
        Publicar comentario
      </button>
    </form>
  );
};

export default CreateComment;