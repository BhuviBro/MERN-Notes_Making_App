import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { connectDB } from './Config/db.js';
import notesRoutes from './Routes/notesRoutes.js'
import rateLimiter from './middleware/ratelimiter.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT;

//Middleware

app.use(cors({
    origin:"http://localhost:5173" //CORS Checker in browser
}));
app.use(express.json());//This middle will PArse JSON bodies : req.body
app.use(rateLimiter);//checks for rateliiiting


// //Simple Custom Middleware
// app.use((req,res,next)=>{
// console.log(`Req method is: ${req.method}\nReq url is: ${req.url}`)
// next();
// })

//Routes here
app.use("/api/notes", notesRoutes)

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is Running on PORT ${PORT}`);
    });
})

