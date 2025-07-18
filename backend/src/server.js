import express from 'express'
import notesRoutes from './Routes/notesRoutes.js'
import { connectDB } from './Config/db.js';
import dotenv from 'dotenv'
dotenv.config();


const app = express();
const PORT = process.env.PORT;


connectDB();


//middleware
app.use(express.json());
//Routes here
app.use("/api/notes",notesRoutes)

app.listen(PORT, () => {
    console.log(`Server is Running on PORT ${PORT}`);
})

