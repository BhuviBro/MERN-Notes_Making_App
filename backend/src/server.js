import express from 'express'
import notesRoutes from './Routes/notesRoutes.js'
import { connectDB } from './Config/db.js';
import dotenv from 'dotenv'
import rateLimiter from './middleware/ratelimiter.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT;

//Middleware
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

