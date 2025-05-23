require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();


// const User = require("./models/User"); 

app.use(express.json());

const User = require('./models/User')

app.get("/", (req, res) => {
    res.status(200).json({ msg: "Bem vindo a API!"});
}); 
// app.listen(3000)


// app.get("/user/:id", checkToken, async (req, res) => {
//     const id = req.params.is;

//     const user = await User.findById(id, "-password");

//     if(!user){
//         return res.status(404).json({ msg: "Usuário não encontrado!"});
//     }

//     res.status(200).json({ user });
// });

app.post('/auth/register', async(req, res) => { 
    const {name, email, password, confirmpassword} = req.body

    if(!name){
        return res.status(422).json({ msg: 'O nome é obrigatorio!'})
    }

    if(!email){
        return res.status(422).json({ msg: 'O email é obrigatorio!'})
    }

    if(!password){
        return res.status(422).json({ msg: 'A senha é obrigatoria!'})
    }

    if(password !== confirmpassword){
        return res.status(422).json({ msg: 'As senhas não conferem!'})
    }
    const userExists = await User.findOne( {email: email})

    if(userExists){
        return res.status(422).json({ msg: 'Email já está sendo usado, escolha outro!'})
    }

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    const user = User({
        name,
        email,
        password: passwordHash,
    })

    try{
        await user.save()
        res.status(201).json({msg:'Usuário criado com sucesso!'})
    } catch (error) {
        console.loh(error)
        res.status(500).json({msg: 'Erro no servidor'})
    }
})



const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

// console.log('user: ' + dbUser) 
// console.log('password: ' + dbPassword)

mongoose.connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.wr9w6qa.mongodb.net/authProject?retryWrites=true&w=majority&appName=Cluster0`,
    // `mongodb://localhost:27017/sample_mflix`,
).then(() => {
    app.listen(3000)
    console.log('Conectou ao banco!')
})
.catch((err) => console.log(err))


////////////////////////////////////////////////////////////////
//server.js

// 'use strict'
// const http = require('http');
// const debug = require('debug')('nodeproject:server')
// const express = require('express');

// const app = express();
// const port = normalizePort(process.env.PORT || '3000');
// app.set('port', port);

// const server = http.createServer(app);
// const router = express.Router();

// const route = router.get('/', (req, res, next) => {
//     res.status(200).send({
//         title: "Node Store API",
//         VERSION: "0.0.1"
//     });
// });

// app.use('/', route);

// server.listen(port);
// server.on('error', onError);
// console.log('API rodando na porta ' + port);

// function normalizePort(val) {
//     const port = parseInt(val, 10);

//     if(isNaN(port)){
//         return val;
//     }

//     if(port >= 0){
//         return port;
//     }

//     return false;
// }

// function onError(error) {
//     if(error.syscall !== 'listen') {
//         throw error;
//     }

//     const bid = typeof port === 'string' ?
//     'Pipe ' + port :
//     'Port ' + port;

//     switch (error.code) {
//         case 'EACCES':
//             console.error(bind + ' requeires elevated privileges');
//             process.exit(1);
//             break;
//         case 'EADDRINUSE':
//             console.error(bind + ' is already in use');
//             process.exit(1);
//             break;
//         default:
//             throw error;
//     }
// }