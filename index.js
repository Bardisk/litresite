const express = require('express');
const multer = require('multer');
const fs = require('fs');

const app = express();
const port = 3000;

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8'));
    }
  }),
  encoding: 'utf-8'
});

app.get('/oj/*', function(req, res) {
  res.redirect('http://litrehinn.top:8080/');
});

app.get('*', function(req, res) {
  // console.log(req.originalUrl);
  const routeName = req.params[0];
  // res.send("get route " + routeName);
  const destPath = req.originalUrl.endsWith('/') ? __dirname + routeName + '/index.html' : __dirname + routeName;
  res.sendFile(destPath, err => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.status(404).send('<h1>404 Not Found</h1>');
      } else {
        console.error(`Error sending file: ${err}`);
        res.sendStatus(500);
      }
    }
  });
});


app.post('/upload', upload.single('file'), (req, res, next) => {
  res.send('文件上传成功');
});

app.listen(port, () => {
  console.log(`Server started, at${port}`);
});
