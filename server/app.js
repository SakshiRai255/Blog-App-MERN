import dotenv from "dotenv";
import express from "express";
import BlogDatabase  from "./configure/BlogDatabase.js"
import router from "./routes/UserRoute.js";
import blogRoute from "./routes/BlogRoute.js"
import cors from 'cors'


dotenv.config();

const app = express();


// to serve images for public
app.use(express.static('public'));
app.use('/images',express.static("images"));

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));



BlogDatabase();

// Middleware
app.use("/api/user",router)
app.use("/api/blog",blogRoute)




export default app