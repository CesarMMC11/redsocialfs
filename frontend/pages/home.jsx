// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import CreatePost from "../components/createPost";

const Home = () => {
    const [posts, setPosts] = useState([]);

  // Función para obtener las publicaciones del servidor
    const fetchPosts = async () => {
    try {
        const response = await fetch("http://localhost:5174/api/posts/");
        const data = await response.json();
        setPosts(data);
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
    };

    useEffect(() => {
    fetchPosts();
}, []);

  // Cuando se crea una nueva publicación, se agrega al estado (opcionalmente al inicio)
const handleNewPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
};

    return (
    <div className="container">
        <h1>Home</h1>
      {/* Formulario para crear publicaciones */}
        <CreatePost onPostCreated={handleNewPost} />

      {/* Listado de publicaciones */}
    <div className="posts">
        <h2>Publicaciones</h2>
        {posts.length > 0 ? (
            posts.map((post) => (
                <div key={post.id} className="post-card">
                <h3>{post.title}</h3>
                <p>{post.content}</p>
            {post.img && (
                <img
                src={`http://localhost:3000/uploads/${post.img}`}
                alt={post.title}
                style={{ maxWidth: "200px" }}
                />
            )}
            </div>
        ))
        ) : (
        <p>No hay publicaciones disponibles.</p>
        )}
    </div>
    </div>
    );
};

export default Home;
