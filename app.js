const express = require('express');
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/book');
const articleRoutes = require('./routes/article');
const podcastRoutes = require('./routes/podcast');
const translateRoutes = require('./routes/translate');
const teacherRoutes = require('./routes/teacher');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const courseRoutes = require('./routes/course');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const app = express();

// images upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now()+'.jpg');
    }
});
const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(new Error('file type not supported!'));
    }
}
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});

// MIDDLEWARES
app.use(cors());
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(upload.single('image'));
app.use('/auth', authRoutes);
app.use('/api', courseRoutes, bookRoutes, podcastRoutes, translateRoutes, articleRoutes, teacherRoutes);
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({ message: message });
});

// CONNECT TO DB
mongoose.connect('mongodb://127.0.0.1:27017/LMS').then(() => {
    console.log('Connected to DB!');
}).catch((error) => {
    console.log(error);
})

// LISTENING TO THE SERVER
app.listen(5000);

