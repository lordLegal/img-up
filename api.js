const express = require('express');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const rateLimit = require('express-rate-limit');

app.use(bodyParser.urlencoded({ extended: true }));
const secret = "SuP3Rs3cR3T";

const auth = (req, res, next) => {
  var token;
  if(req.headers.authorization != undefined) {
    
    token = req.headers.authorization.split(' ')[1] ;
  }else {
    token = req.query.jwt;
  }
  
  

  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded.user;
    next();
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
};

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

app.use(cors());

app.post('/upload', auth, upload.single('file'), (req, res) => {
   
  const file = req.file;
  if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
  }
  fs.rename(file.path, 'uploads/' + file.originalname, (err) => {
    if (err) throw err;
    res.send('File uploaded and stored in local directory');
  });
});

app.get('/files', auth, (req, res) => {
   
  fs.readdir('uploads', (err, files) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(files);
    }
  });
});

app.get('/download', auth, function(req, res){
   
  var file_name = req.query.fn;
  fs.readdir("uploads", (err, files) => {
  if (err) {
    res.status(500).send(err);
  } else {
    if(files.includes(file_name)){
      const file = `uploads/`+ file_name;
      res.download(file);
    }else {
      res.send("File not found");
    }
  }
  });
  
 
});

app.post('/login', rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, 
}), async (req, res) => {
  const { username, password } = req.body;
  const user = await getUser(username);
  if (!user) {
    return res.status(401).send('Invalid username or password');
  }
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).send('Invalid username or password');
  }

  const jwt = genJWT(user);
  res.send({ jwt });
});

function genJWT(user) {
  const payload = {
    sub: user.id,
    exp: Date.now() + 60 * 60 * 1000, // 1 hour
  };
  return jwt.sign(payload, secret);
}

async function getUser(username) {
  return {
    id: 1,
    username: 'user1',
    password: '$2a$10$TdA1U0eXS5ltUWQ41pmtgumw0Tl4vWB8XEF/525Tp8zI2YlQqGbee',//Password
  };
}

app.get('/verify', (req, res) => {
  if(req.headers.authorization == undefined) {
    return false;
  }
  const token = req.headers.authorization.split(' ')[1];

  jwt.verify(token, secret, (error, decoded) => {
    if (error) {
      return res.status(401).send('Unauthrized');
    }
  });
  res.send('Success');
});

app.listen(2000, () => {
  console.log('Server listening on port 2000');
});
