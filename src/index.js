const path = require('path');
const express = require('express');
const morgan = require('morgan');
const {engine} = require('express-handlebars');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({
  extended: true // option của thư viện
})); // đây middleware xử lí dữ liệu từ form lên
app.use(express.json()); // XMLHttpRequest, fetch, axios, gửi dữ liệu từ phía client thì đây là nơi xử lí code js

// HTTP logger
// app.use(morgan('combined')); // hiển thị thông tin chi tiết về mỗi yêu cầu HTTP, bao gồm địa chỉ IP, method, URL, mã trạng thái, và thời gian phản hồi.

// Template engine
app.engine('hbs', engine({
  extname: ".hbs" // sửa lại đuôi handlebars thành hbs
}));
app.set('view engine', 'hbs');

// Định nghĩa thư mục chứa các view
app.set('views', path.join(__dirname, 'resources/views'));

// console.log('PATH: ', path.join(__dirname, 'resources/views'));

// Router
app.get('/', (req, res) => {   // req = request: chứa nội dung yêu cầu của người dùng / res = respone: chưa nội dung trả về phía client có thể tùy chỉnh
  res.render('home');
});

app.get('/news', (req, res) => {  
  // console.log(req.query.q);  // in ra object trong url
  res.render('news');
});

app.get('/search', (req, res) => {
  res.render('search');
});

app.post('/search', (req, res) => {
  console.log(req.body); // dữ liêu ở form data sẽ được lưu vào biến body
  res.send('');
});
// 127.0.0.1 ---> localhost
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
