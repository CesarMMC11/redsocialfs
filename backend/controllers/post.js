const express = require('express');
const router = express.Router();
const { Post } = require('../models');
const multer = require('multer');
const path = require('path');
const upload = require('../config/multer');


// Crear publicación
router.post('/create', upload.single('img'), async (req, res) => {
    try {
    const { title, content, userID } = req.body;
    const img = req.file ? req.file.filename : null;

    const newPost = await Post.create({ title, content, img, userID });

    res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener todas las publicaciones
router.get('/', async (req, res) => {
    try {
    const posts = await Post.findAll();
    res.status(200).json(posts);
    } catch (error) {
    res.status(500).json({ error: error.message });
    }
});

// Obtener una publicación por ID
router.get('/:id', async (req, res) => {
    try {
    const { id } = req.params;
    const post = await Post.findByPk(id);

    if (!post) {
    return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json(post);
    } catch (error) {
    res.status(500).json({ error: error.message });
    }
});

// Actualizar publicación
router.put('/:id', upload.single('img'), async (req, res) => {
    try {
    const { id } = req.params;
    const { title, content } = req.body;
    const img = req.file ? req.file.filename : null;

    const post = await Post.findByPk(id);

    if (!post) {
        return res.status(404).json({ error: 'Post not found' });
    }

    post.title = title || post.title;
    post.content = content || post.content;
    post.img = img || post.img;

    await post.save();

    res.status(200).json({ message: 'Post updated successfully', post });
    } catch (error) {
    res.status(500).json({ error: error.message });
    }
});

// Eliminar publicación
router.delete('/:id', async (req, res) => {
    try {
    const { id } = req.params;
    const post = await Post.findByPk(id);

    if (!post) {
        return res.status(404).json({ error: 'Post not found' });
    }

    await post.destroy();

    res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
    res.status(500).json({ error: error.message });
    }
});

module.exports = router;
