import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import CreateComment from "./CreateComment";

const CommentList = ({ postID }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/api/comments/post/${postID}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setComments(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching comments:", err);
      setError("No se pudieron cargar los comentarios. Por favor, intenta de nuevo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postID]);

  const handleCommentCreated = (newComment) => {
    setComments((prevComments) => [newComment, ...prevComments]);
  };

  const handleCommentUpdated = (updatedComment) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === updatedComment.id ? updatedComment : comment
      )
    );
  };

  const handleCommentDeleted = (commentId) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== commentId)
    );
  };

  return (
    <div className="comments-section">
      <h3>Comentarios ({comments.length})</h3>
      
      <CreateComment postID={postID} onCommentCreated={handleCommentCreated} />
      
      {loading ? (
        <p>Cargando comentarios...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : comments.length > 0 ? (
        <div className="comments-list">
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              onCommentUpdated={handleCommentUpdated}
              onCommentDeleted={handleCommentDeleted}
            />
          ))}
        </div>
      ) : (
        <p>No hay comentarios todavía. ¡Sé el primero en comentar!</p>
      )}
    </div>
  );
};

export default CommentList;