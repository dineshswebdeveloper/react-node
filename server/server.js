const express = require("express");
const server = express();
const port = 4000;
const cors = require("cors");
const db = {data:[{username:"admin",password:"123",role:"admin"},{username:"dinesh",password:"123",role:"user"}]}
const jwt=require('jsonwebtoken')
const cookieParser = require('cookie-parser')

// ----------Middleware--------------

server.use(cors());
server.use(express.json());
server.use(cookieParser())

// ---------Jwt functions-----------



// ----------API--------------

server.post("/login", (req, res) => {
  const currUser = req.body;
  const oldUser = db.data.filter((ele) => ele.username == currUser.username);
  if (!oldUser.length > 0) {
        return res.status(403).json({ status: "user does not exist" });
  } else if (oldUser[0].password === currUser.password) {
        const accessToken = jwt.sign({username:oldUser[0].username,role:oldUser[0].role},"dinesh1",{expiresIn:'10s'})
        const refreshToken = jwt.sign({username:oldUser[0].username,role:oldUser[0].role},"dinesh2",{expiresIn:'1d'})
        res.cookie('jwt',refreshToken)  // {maxAge:60*60*1000}
        return res.status(200).json({role:oldUser[0].role,accessToken});
  } else {
        return res.json({ status: "password does not match" });
  }
});
const authenticateToken=(req,res,next)=>{
  const refreshToken = req.cookies['jwt']
  //const refreshToken =req.headers['authorization']?.split(' ')[1]
  if (!refreshToken) {
      return res.status(400).json({status:"user not authorised"}) 
  }
    jwt.verify(refreshToken,'dinesh2',(err,decoded)=>{
      if (err) return res.status(400).json({status:`jwt-varify-error : ${err}`})
      req.user=decoded
      return next()
  })
}
server.get("/login", authenticateToken,(req, res) => {
    res.json({status:req.headers,user:req.user})
});

// ----------Listening--------------
server.listen(port, (err) => {
  err
    ? console.log(err.message)
    : console.log(`server is running on ${port} port`);
});
