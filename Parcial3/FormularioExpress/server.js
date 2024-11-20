const express = require('express');
const multer = require('multer');
const path = require('path');
const { jsPDF } = require('jspdf');
const bodyParser = require('body-parser');
const cors = require('cors');
const { check, validationResult } = require('express-validator');
const fs = require('fs');

const app = express();
app.use(cors());
const PORT = 3000;

// Configurar carpetas 
const uploadFolder = path.join(__dirname, 'archivosrec');
const pdfFolder = path.join(__dirname, 'archivosgen');

// Configuración de Multer 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolder);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/archivosrec', express.static(uploadFolder));
app.use('/archivosgen', express.static(pdfFolder));

// Ruta para formulario
app.post('/submit', upload.single('photo'), [
    check('name').notEmpty().withMessage('El nombre es obligatorio'),
    check('email').isEmail().withMessage('Debe ser un email válido'),
    check('photo').custom((value, { req }) => {
        if (!req.file) {
            throw new Error('La foto es obligatoria');
        }
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(req.file.mimetype);
        const extname = filetypes.test(path.extname(req.file.originalname).toLowerCase());
        if (mimetype && extname) {
            return true;
        } else {
            throw new Error('Solo se permiten imágenes (JPEG, JPG, PNG)');
        }
    }),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Eliminar el archivo subido si existe
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email } = req.body;
    const photoPath = req.file.path;
    const photoFilename = req.file.filename;

    const doc = new jsPDF();

    // Agregar texto al PDF
    doc.setFontSize(16);
    doc.text(`Nombre: ${name}`, 10, 20);
    doc.text(`Correo Electrónico: ${email}`, 10, 30);

    // Agregar la foto al PDF
    const imageData = fs.readFileSync(photoPath, { encoding: 'base64' });
    const ext = path.extname(photoFilename).toLowerCase().substring(1);
    const mimeType = ext === 'jpg' || ext === 'jpeg' ? 'JPEG' : 'PNG';

    // Ajustar tamaño de la imagen según el tamaño del PDF
    doc.addImage(`data:image/${mimeType};base64,${imageData}`, mimeType, 10, 40, 50, 50);

    // Guardar el PDF en la carpeta 'archivosgen' con un nombre único
    const pdfFilename = `${Date.now()}-${name.replace(/\s+/g, '_')}.pdf`;
    const pdfPath = path.join(pdfFolder, pdfFilename);
    doc.save(pdfPath);

    res.send(`
        <h2>¡Formulario recibido exitosamente!</h2>
        <p>Nombre: ${name}</p>
        <p>Correo Electrónico: ${email}</p>
        <p>PDF Generado: <a href="/archivosgen/${pdfFilename}" target="_blank">Descargar PDF</a></p>
        
    `);
});

app.listen(PORT, () => {
    console.info(`Servidor corriendo en el puerto ${PORT}`);
});
