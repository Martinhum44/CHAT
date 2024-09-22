const aMONGOOSE = require("mongoose")

const messageModel = new aMONGOOSE.Schema({
    content:{
        required:[true,"please provide a message content"],  
        type:String,
        maxlength:[150,"message cannot be longer than 150 characters"]
    },
    timestamp:{ 
        required:true,
        type: String,
    },  
    author:{ 
        required:true, 
        type: String
    },
    room:{
        required:true,
        type: String
    }
})

const accountModel = new aMONGOOSE.Schema({
    username:{
        type:String,
        required:[true,"please provide a username"],
        minlength:[1,"please provide a username"]
    },
    password:{
        type:String,
        required:[true,"please provide a password"],
        minlength:[8,"password must be at least 8 characters"]
    },
    rooms:{
        type:Array,
        default:["Meetcord-Main-Chat"]
    }
})

const roomModel = new aMONGOOSE.Schema({
    name:{
        type:String,
        required: [true, "Please provide a room name"],
        minlength: [1, "name cannot be empty"]
    },
    joinerCode:{
        type:String,
        required: [true, "Please provide a joinerCode"],
        minlength:[1,"joinerCode cannot be empty"]
    }
})

module.exports = {messageModel:aMONGOOSE.model("Message",messageModel),accountModel:aMONGOOSE.model("Accountery",accountModel),roomModel:aMONGOOSE.model("Room",roomModel)} 