import express from "express";
import dotenv from "dotenv"; // dotenv module loads environmental variables from .env file to process.env
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config(); // to use dotenv, neet to make configuration


// initial connection to mongoDB
//whenever we connected to back-end server we going to call this function 
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB")
    } catch (error) {
        throw(error);
    }
}

/*mongoose.connection will listen our connection and 
if there is a disconnection problem, we can log the propblem as below.
In this case if it is disconnected, it will try again to connect*/
mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!")
})

// ----- MIDDLEWARES ----- //

app.use(cookieParser());
app.use(express.json()); // used to get request from the insomnia app. It parses incoming requests with JSON payloads and is based on body-parser.

// whenever we make request for an endpoint, it is going to use our route
app.use("/api/auth", authRoute); // when path domain/api/auth, use authRoute
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

// errror handle middleware
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.errorMessage || "Something went wrong!";
    return res.status(errorStatus).json({
        success:false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,  // explains the error detail
    })
})


// to run the application, listen a port 
app.listen(8000, ()=> {
    connect();
    console.log("connected to backend");
});