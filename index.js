require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(express.json());
app.use(cors());
app.listen(process.env.PORT || 3000);
const personRoutes = require('./routes/personRoutes');
const labRoutes = require('./routes/laboratoryRoutes');
const authRouter = require('./routes/authRoutes');
app.use('/person', personRoutes);
app.use('/laboratory', labRoutes);
app.use('/auth', authRouter);
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

mongoose
    .connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.apl3q.mongodb.net/personsapi?retryWrites=true&w=majority`,
    )
    .then(() => {
        console.log('Conectado com sucesso');
        app.listen(3000);
    })
    .catch((err) => console.log(err));
