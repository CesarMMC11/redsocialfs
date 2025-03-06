import React, { useState } from "react";

const Comment = ({ comment, onCommentUpdated, onCommentDeleted }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(comment.title);
  const [editContent, setEditContent] = useState(comment.content);

  // Para efectos de demostración, asumimos que el usuario actual es el propietario del comentario
  const isOwner = true;

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/comments/${comment.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editTitle,
          content: editContent,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsEditing(false);
        onCommentUpdated(data.comment);
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Error al actualizar el comentario:", error);
      alert("Error al actualizar el comentario");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este comentario?")) {
      try {
        const response = await fetch(`http://localhost:3000/api/comments/${comment.id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          onCommentDeleted(comment.id);
        } else {
          const data = await response.json();
          alert("Error: " + data.error);
        }
      } catch (error) {
        console.error("Error al eliminar el comentario:", error);
        alert("Error al eliminar el comentario");
      }
    }
  };

  return (
    <div className="comment">
      {isEditing ? (
        <div className="edit-comment-form">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="form-control mb-2"
          />
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="form-control mb-2"
            rows="3"
          ></textarea>
          <div className="button-group">
            <button onClick={handleUpdate} className="btn btn-success btn-sm">
              Guardar
            </button>
            <button onClick={() => setIsEditing(false)} className="btn btn-secondary btn-sm ml-2">
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="comment-header">
            <div className="user-info">
              {comment.User && (
                <>
                  <img 
                    src={comment.User.profileImg ? `http://localhost:3000/uploads/${comment.User.profileImg}` : "/placeholder.svg?height=40&width=40"} 
                    alt={comment.User.username} 
                    className="user-avatar" 
                  />
                  <span className="username">{comment.User.username}</span>
                </>
              )}
              <span className="comment-date">
                {new Date(comment.createdAt).toLocaleDateString()}
              </span>
            </div>
            {isOwner && (
              <div className="comment-actions">
                <button onClick={() => setIsEditing(true)} className="btn btn-outline-primary btn-sm">
                  Editar
                </button>
                <button onClick={handleDelete} className="btn btn-outline-danger btn-sm ml-2">
                  Eliminar
                </button>
              </div>
            )}
          </div>
          <h4 className="comment-title">{comment.title}</h4>
          <p className="comment-content">{comment.content}</p>
        </>
      )}
    </div>
  );
};

export default Comment;