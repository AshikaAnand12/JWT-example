const express = require("express");

const jwt = require("jsonwebtoken");

const app = express();

app.get("/api", (req, res) => {

    res.send({
  
      message: "API without token"
  
    });
  
  });

app.get("/apiwithtoken", verifyToken, (req, res) =>{
    jwt.verify(req.token, "secretkey", (err, authData) => {

        if (err) {
    
        res.sendStatus(403);
    
        } else {
    
        res.send({
    
            message: "GET API with token"
    
        });
    
        }
    
    });
})

app.post("/api/posts", verifyToken, (req, res) => {
//string "secretkey" is the key given in jwt.sign
jwt.verify(req.token, "secretkey", (err, authData) => {

    if (err) {

    res.sendStatus(403);

    } else {

    res.send({

        message: "POST created - POST API with token",

        authData

    });

    }

});

});

//jwt token generation
app.post("/api/login", (req, res) => { 

    //valid user
    const user = {

        id: 1,

        username: "john",

        email: "john@gmail.com"

    };
  //jwt sign for encryption. "secretkey" is a string created by user used as key for encrytpion
jwt.sign({ user: user }, "secretkey", (err, token) => {

    res.send({

    token

    });

});

});


function verifyToken(req, res, next) {

const bearerHeader = req.headers["authorization"];

if (typeof bearerHeader !== "undefined") {

    const bearerToken = bearerHeader.split(" ")[1];

    req.token = bearerToken;

    next();

} else {

    res.sendStatus(403);

}

}

app.listen(3000,(req,res)=>{
    console.log('Server running on port 3000')
})
