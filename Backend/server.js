import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import connectDb from './config/db.js';
import authRouter from './routes/auth.routes.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.routes.js';
import geminiResponse from './gemini.js';
import dns from "dns";
dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4"]);


const app = express()
app.use(cors({
    origin:[
        "http://localhost:5173",
        "https://nova-voice-assistant-gamma.vercel.app"
    ],
    credentials:true
}));
const port = process.env.PORT || 5000
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRouter);
app.use("/api/user",userRouter);




app.listen(port,()=>{
    connectDb();
    console.log("server started");
})

