const express = require('express');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const router = express.Router();
const Chat = require('../models/Chat.js');

server.listen(4000);

// socket io
io.on('connection', (socket) => {
  console.log('User connected');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
  socket.on('save-message', (data) => {
    console.log(data);
    io.emit('new-message', { message: data });
  });
});
/* GET ALL CHATS */
router.get('/', (req, res, next) => {
  Chat.find((err, products) => {
    if (err) return next(err);
    return res.json(products);
  });
});

/* GET SINGLE CHAT BY ID */
router.get('/:id', (req, res, next) => {
  Chat.findById(req.params.id, (err, post) => {
    if (err) return next(err);
    return res.json(post);
  });
});

/* SAVE CHAT */
router.post('/', (req, res, next) => {
  Chat.create(req.body, (err, post) => {
    if (err) return next(err);
    return res.json(post);
  });
});

/* UPDATE CHAT */
router.put('/:id', (req, res, next) => {
  Chat.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
    if (err) return next(err);
    return res.json(post);
  });
});

/* DELETE CHAT */
router.delete('/:id', (req, res, next) => {
  Chat.findByIdAndRemove(req.params.id, req.body, (err, post) => {
    if (err) return next(err);
    return res.json(post);
  });
});

module.exports = router;
