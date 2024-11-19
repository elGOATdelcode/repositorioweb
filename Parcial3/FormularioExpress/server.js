const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { jsPDF } = require('jspdf');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
app.use(cors());
const PORT = 3000;

// Configurar carpetas 
const uploadFolder = path.join(__dirname, 'archivosrec');
const pdfFolder = path.join(__dirname, 'archivosgen');

if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder);
}

if (!fs.existsSync(pdfFolder)) {
    fs.mkdirSync(pdfFolder);
}

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
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb('Error: Solo se permiten imágenes (JPEG, JPG, PNG)');
    },
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/archivosrec', express.static(uploadFolder));
app.use('/archivosgen', express.static(pdfFolder));

// Ruta para formulario
app.post('/submit', upload.single('photo'), (req, res) => {
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

    // Guardar el PDF en la carpeta 'generated_pdfs' con un nombre único
    const pdfFilename = `${Date.now()}-${name.replace(/\s+/g, '_')}.pdf`;
    const pdfPath = path.join(pdfFolder, pdfFilename);
    doc.save(pdfPath);

  
    res.send(`
        <h2>¡Formulario recibido exitosamente!</h2>
        <p>Nombre: ${name}</p>
        <p>Correo Electrónico: ${email}</p>
        <p>Foto: <a href="/archivosrec/${photoFilename}" target="_blank">Ver Foto</a></p>
        <p>PDF Generado: <a href="/archivosgen/${pdfFilename}" target="_blank">Descargar PDF</a></p>
        <a href="/">Volver al formulario</a>
    `);
});


app.listen(PORT, () => {
    console.info(`Servidor corriendo en el puerto ${PORT}`);
});
