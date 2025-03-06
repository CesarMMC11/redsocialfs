    const multer = require('multer');
    const path = require('path');

    // Configuración de multer
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Carpeta donde se guardarán los archivos
        },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nombre del archivo
        }
    });

    const upload = multer({ 
        storage: storage,
        limits: { fileSize: 1024 * 1024 * 5 }, // Limite de tamaño de archivo (5 MB en este caso)
        fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Solo se permiten imágenes'));
    }
    }
    });

    module.exports = upload;
