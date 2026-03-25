 require("dotenv").config()
 const app = require("./src/app")
const { createServer } = require("http");
const { Server } = require("socket.io");
const generateResponse = require('./src/service/ai.service');
const cors = require("cors")
const connectToDB = require("./src/db/db")
const httpServer = createServer(app);

connectToDB()
const io = new Server(httpServer, { 
    cors:{
        origin: "http://localhost:5173",
    }
 })



 app.get("/",(req,res)=>{
    res.send("hello world");
    
 })
 const chathistory = [
 
 ]
io.on("connection", (socket) => {
console.log("A user connected");

socket.on("ai", async(data)=>{
    console.log(data);
    chathistory.push ({
        role:"user",
        parts:[{text:data}]
    })
    const response = await generateResponse(chathistory)
    chathistory.push ({
        role:"model",
        parts:[{text:response}]
    }) 
    console.log(response);
    socket.emit("ai-response",response)
    
})
});

httpServer.listen(3000 ,()=>{
    console.log("Server is running on the port 3000");
    
});