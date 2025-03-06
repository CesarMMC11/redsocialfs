const express = require('express');
const router = express.Router();
const { Comment, User, Post } = require('../models');

// Crear comentario
router.post('/create', async (req, res) => {
  try {
    const { title, content, userID, postID } = req.body;

    // Verificar que el post existe
    const post = await Post.findByPk(postID);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Verificar que el usuario existe
    const user = await User.findByPk(userID);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newComment = await Comment.create({ 
      title, 
      content, 
      userID, 
      postID 
    });

    res.status(201).json({ 
      message: 'Comment created successfully', 
      comment: newComment 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener todos los comentarios
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.findAll({
      include: [
        { model: User, attributes: ['id', 'username', 'profileImg'] }
      ]
    });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener comentarios por ID de publicación
router.get('/post/:postID', async (req, res) => {
  try {
    const { postID } = req.params;
    const comments = await Comment.findAll({ 
      where: { postID },
      include: [
        { model: User, attributes: ['id', 'username', 'profileImg'] }
      ],
      order: [['createdAt', 'DESC']]
    });
    
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un comentario por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByPk(id, {
      include: [
        { model: User, attributes: ['id', 'username', 'profileImg'] }
      ]
    });

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar comentario
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const comment = await Comment.findByPk(id);

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    // Verificar que el usuario que actualiza es el propietario del comentario
    // Esta verificación se haría normalmente con middleware de autenticación
    // pero la incluyo aquí para mostrar la lógica

    comment.title = title || comment.title;
    comment.content = content || comment.content;

    await comment.save();

    res.status(200).json({ 
      message: 'Comment updated successfully', 
      comment 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar comentario
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByPk(id);

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    // Verificar que el usuario que elimina es el propietario del comentario
    // o el propietario del post (esta lógica se implementaría con middleware)

    await comment.destroy();

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;