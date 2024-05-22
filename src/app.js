import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.js';
import userRouter from './routes/user.js';
import adminRouter from './routes/admin.js';
import novelRouter from './routes/novel.js';
import authorRouter from './routes/author.js';
import categoryRouter from './routes/category.js';
import collectionRouter from './routes/collection.js';
// import searchRouter from './routes/search.js';
// import forumRouter from './routes/forum.js';
import commentRouter from './routes/comment.js';
import { Server as socketIo } from 'socket.io';
import http from 'http';
import {configureCloudinary} from './configCloud.js';

configureCloudinary();
const app = express();
const server = http.createServer(app);
const io = new socketIo(server);
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());

app.post('/send-message', (req, res) => {
  const { user, message } = req.body;

  // Gửi tin nhắn đến tất cả các kết nối
  const messageData = {
    user,
    message,
    timestamp: new Date().toLocaleTimeString(),
  };
  io.emit('chatMessage', messageData);

  res.json({ success: true, message: 'Message sent successfully' });
});

//midleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
// show status of api in dev env
if ((process.env.NODE_ENV = 'development')) {
  app.use(morgan('dev'));
}
//config socket.io for connection
io.on('connection', (socket) => {
  console.log('A user connected');

  // Xử lý sự kiện khi người dùng gửi tin nhắn
  socket.on('chatMessage', (data) => {
    io.emit('chatMessage', data); // Gửi tin nhắn đến tất cả các kết nối (admins và users)
  });
});

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/api/novel', novelRouter);
app.use('/api/author', authorRouter);
app.use('/api/category', categoryRouter);
app.use('/api/collection', collectionRouter);
// app.use('api/forum', forumRouter);
// app.use('api/search', searchRouter);
app.use('/api/comment', commentRouter);

export { app, server, io };
