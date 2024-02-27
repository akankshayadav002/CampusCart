import express from 'express';
import mongoose from 'mongoose';
import { MongoClient, ServerApiVersion } from 'mongodb'
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import { Server as SocketServer } from "socket.io";
dotenv.config();
import messageRoutes from "./routes/messages.js"
const uri = "mongodb+srv://akanksha:Lappy%4089@cluster0.sbkle3g.mongodb.net/?retryWrites=true&w=majority";
// mongoose
//   .connect(process.env.MONGO)
//   .then(() => {
//     console.log('Connected to MongoDB!');
//   })
//   .catch((err) => {
//     console.log(err);
//   });

  const __dirname = path.resolve();
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
mongoose.connect(
  uri,
  {
      useNewUrlParser: true,
      useUnifiedTopology: true
  }).then(data => {
    console.log("Database connected, Host: ", data.connection.host)
  }).catch((err)=>{
    console.log("Something went wrong Err: ", err.message);
  });
   



const app = express();

app.use(express.json());

app.use(cookieParser());

app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);
app.use("/api/messages", messageRoutes);


app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});



// const server = app.listen(process.env.PORT, () =>
//   console.log(`Server started on ${process.env.PORT}`)
// );

// const io = new SocketServer(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     credentials: true,
//   },
// });

// const onlineUsers = new Map();

// io.on("connection", (socket) => {
//   global.chatSocket = socket;

//   socket.on("add-user", (userId) => {
//     onlineUsers.set(userId, socket.id);
//   });

//   socket.on("send-msg", (data) => {
//     const sendUserSocket = onlineUsers.get(data.to);

//     if (sendUserSocket) {
//       socket.to(sendUserSocket).emit("msg-recieve", data.msg);
//     }
//   });
// });

// const server = app.listen(process.env.PORT, () =>
//   console.log(`Server started on ${process.env.PORT}`)
// );

// const io = socket(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     credentials: true,
//   },
// });

// const onlineUsers = new Map();

// io.on("connection", (socket) => {
//   global.chatSocket = socket;

//   socket.on("add-user", (userId) => {
//     onlineUsers.set(userId, socket.id);
//   });

//   socket.on("send-msg", (data) => {
//     const sendUserSocket = onlineUsers.get(data.to);

//     if (sendUserSocket) {
//       socket.to(sendUserSocket).emit("msg-recieve", data.msg);
//     }
//   });
// });

