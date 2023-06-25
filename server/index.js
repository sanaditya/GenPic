import express from "express";
import * as dotenv from 'dotenv';
import cors from 'cors'
import connectDB from "./mongodb/connect.js";
import postsRoutes from "./routes/postsRoutes.js"
import createImage from "./routes/dalleRoutes.js"

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.use('/api/v1/post', postsRoutes);
app.use('/api/v1/dalle', createImage)



app.get('/', async (req, res) => {
    res.status(200).json({
        message: 'Hello from GenPic!',
    });
})

const startServer = async () => {

    try {
        connectDB(process.env.MONGODB_URL)
    } catch (err) {
        console.log(err)
    }

    app.listen(8080, () => console.log('Server started on http://localhost:8080'))
}

startServer();
