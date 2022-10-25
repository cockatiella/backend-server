import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";


const app = express();
dotenv.config();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors());
// app.use('/auth', authRoute);

//error handling
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
    }
);

//connect to db
app.get('/', (req, res) => {
    res.send('Hello World!👋');
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`✨Server running on port: ${PORT}✨`);
        });
    })
    .catch((error) => {
        console.log(error.message);
    });     
