require('dotenv').config()

const SERVER_PORT = process.env.SERVER_PORT,

NOTIFICATION_CHANNEL = 'synoption-notifications';

const http =  require('http');
const { Server }  = require("socket.io");
const bodyParser = require('body-parser')
const express = require('express');
var cors = require('cors');
const socket = require('./socket');
const app = express();

app.use(cors());

app.use(bodyParser.json());



const io = new Server(SERVER_PORT, {
    cors: {
        origin: "*"
    },
    pingTimeout: 60000
});


io.close();

const httpServer = http.createServer(app);

httpServer.listen(SERVER_PORT, ()=>{
    console.log('Listening to incoming client connections on port ' + SERVER_PORT)

});

function socketConnect(socket, channel){
    
        console.log(`user connecting ${socket.id} ${channel}`);
    
        socket.on("send_message", (data)=>{
            console.log("message recived", data)
        })
    
        // let interval = setInterval( ()=>{
    
        //     let obj = {
        //         channel,
        //         "key": getKey(),
        //         "duration": 1,
        //         "date": '2022-05-01',
        //         "atm": generateRandomNumber(),
        //         "drr25": generateRandomNumber(),
        //         "drr10": generateRandomNumber(),
        //         "dbf25": generateRandomNumber(),
        //         "dbf10": generateRandomNumber()
        //     }
         
        //     socket.emit(`${channel}-data-listen`,obj)
        // }, 1000);

    
        socket.on('disconnect',  ()=>{
            console.log(`user disconnecting ${socket.id}`);          
        })
    
}

io.attach(httpServer);



const RR_BF = io.of("/data-table");

// const CALL_PUT = io.of("/call-put");

RR_BF.on("connection", 
 (socket) =>{
    socketConnect(socket, "rr-bf");
 }

);

// CALL_PUT.on("connection", 
// (socket) =>{
//     socketConnect(socket, "call-pu");
//  }
// );

app.post('/post_data', (req, res)=>{

    RR_BF.emit("rr-bf-data-listen", req.body);

    RR_BF.emit("call-put-data-listen", req.body);

    setTimeout( ()=>{
        res.send({ status: 'SUCCESS' });
    }, 2500);
 
});





