const axios = require('axios');
//create a server object:


const generateRandomNumber =() =>{
   
    let val=  Math.ceil(Math.random() * 99) * (Math.round(Math.random()) ? 1 : -1);
    return val/10;
}

const getKey = () =>{

    return Math.ceil(Math.random() * 10);
}

const MAX_LEN = 10;
let queue = [];

function getFromQueue(){

    return queue.shift();
}

function pushToQueue(data){

    if(queue.length < MAX_LEN){
        queue.push(data);
    }

}

let interval = setInterval( ()=>{
    
    let obj = {
        "key": getKey(),
        "duration": 1,
        "date": '2022-05-01',
        "atm": generateRandomNumber(),
        "drr25": generateRandomNumber(),
        "drr10": generateRandomNumber(),
        "dbf25": generateRandomNumber(),
        "dbf10": generateRandomNumber()
    }
    console.log("push to queue")
    pushToQueue(obj);
    
}, 1000);

let interval2 = setInterval( ()=>{
    if(!isSending){
     let obj = getFromQueue();
     console.log("get from queue")
     if(obj !== undefined){
        console.log("sending...", obj);
        sendData(obj);
     }
    }else{
        console.log("request pending. queue length"+ queue.length)
    }
}, 500);


let isSending = false;
function sendData(data){

    isSending = true;

    axios.post('http://localhost:3001/post_data',data)
      .then(response => {
 
        isSending = false;
      })
      .catch(error => {
        console.log("error");

        isSending = false;

        if(interval){
            clearInterval(interval);
        }
      });
}

