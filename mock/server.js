const fs = require('fs');
const bodyParser = require('body-parser');
const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');

const server = jsonServer.create();
// const router = jsonServer.router('./mock/database.json')
const userDB = JSON.parse(fs.readFileSync('./mock/users.json', 'UTF-8'));

server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

const SECRET_KEY = '123456789';

const expiresIn = '1h';

// Create a token from a payload
function createToken(payload){
  return jwt.sign(payload, SECRET_KEY, {expiresIn})
}

// Verify the token
function verifyToken(token){
  return  jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ?  decode : err);
}

// Check if the user exists in database
function isAuthenticated({email, password}){
  return userDB.users.findIndex(user => user.email === email && user.password === password) !== -1;
}

// Register New User
server.post('/auth/register', (req, res) => {
  console.log("register endpoint called; request body:");
  console.log(req.body);
  const {email, password} = req.body;

  if(isAuthenticated({email, password}) === true) {
    const status = 401;
    const message = 'Email and Password already exist';
    res.status(status).json({status, message});
    return;
  }

  // users.json 에 user 추가
  fs.readFile('./users.json', (err, data) => {
    if (err) {
      const status = 401;
      const message = err;
      res.status(status).json({status, message });
      return;
    }

    // Get current users data
    const parseUserData = JSON.parse(data.toString());

    // Get the id of last user
    const lastItemId = parseUserData.users[data.users.length-1].id;

    //Add new user
    parseUserData.users.push( {id: lastItemId + 1, email: email, password: password} ); //add some data
    const writeData = fs.writeFile('./users.json', JSON.stringify(data), (err, result) => {  // WRITE
      if (err) {
        const status = 401;
        const message = err;
        res.status(status).json({status, message});
        return;
      }
    });
  });

// Create token for new user
  const accessToken = createToken({email, password});
  console.log("Access Token:" + accessToken);
  res.status(200).json({accessToken});
});

// Login to one of the users from ./users.json
server.post('/auth/login', (req, res) => {
  console.log("login endpoint called; request body:");
  console.log(req.body);

  const {email, password} = req.body;
  if (isAuthenticated({email, password}) === false) {
    const status = 401;
    const message = 'Incorrect email or password';
    res.status(status).json({status, message});
    return;
  }
  const accessToken = createToken({email, password})
  console.log("Access Token:" + accessToken);
  res.status(200).json({accessToken});
});

server.use(/^(?!\/auth).*$/,  (req, res, next) => {
  const authorization=req.headers.authorization;

  if (authorization === undefined || authorization.split(' ')[0] !== 'Bearer') {
    const status = 401;
    const message = 'Error in authorization format';
    res.status(status).json({status, message});
    return;
  }
  try {
    const verifyTokenResult = verifyToken(authorization.split(' ')[1]);

    if (verifyTokenResult instanceof Error) {
      const status = 401;
      const message = 'Access token not provided';
      res.status(status).json({status, message});
      return;
    }
    next();
  } catch (err) {
    const status = 401;
    const message = 'Error access_token is revoked';
    res.status(status).json({status, message});
  }
});

// server.use(router)

server.listen(3001, () => {
  console.log('Run Auth API Server');
});
