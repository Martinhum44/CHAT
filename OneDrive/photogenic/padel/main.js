const express = require("express")
const http = require("http")
const { messageModel, accountModel, roomModel } = require("./models/task.js")
const connect = require("./db/connect")
const notFound = require("./middleware/notfound.js")
const handler = require("./middleware/handler.js")
const socketio = require("socket.io")
const wrapper = require("./middleware/asyncwrapper.js")
const { createCustomError } = require("./middleware/error.js")
const moment = require("moment")
const axios = require("axios")
require("dotenv").config()

const app = express()
app.use(express.json())
app.use("/frontend", express.static("./public"))

app.put("/", wrapper(async (req, res) => {
    const { author, content, room } = req.body
    await messageModel.create({ content: content, author: author, timestamp: moment().format("h:mm a"), room: room })
    await io.emit("message", { author: author, timestamp: moment().format("h:mm a"), content: content, room: room })
    res.status(200).json({ message: req.body, success: true })
}))

app.post("/accounts", wrapper(async (req, res, next) => {
    console.log(req.body)
    const accounts = await accountModel.find({})
    console.log(accounts)
    if (await accountModel.find({}).length != 0) {
        if (accounts.find((account) => {
            console.log(account)
            return account.username == req.body.username
        })) {
            return next(createCustomError(`username ${req.body.username} already exists`, 400))
        }
    }

    await accountModel.create({ username: req.body.username, password: req.body.password })
    res.status(200).json({ message: req.body, success: true })
}))

app.put("/:ACCOUNT/:PASSWORD", wrapper(async (req, res, next) => {
    const { ACCOUNT, PASSWORD } = req.params
    const { joinerCode } = req.body

    const accounts = await accountModel.find({})

    const account = accounts.find((element) => {
        console.log(element.username, element.password, ACCOUNT, PASSWORD)
        return element.password == PASSWORD && element.username == ACCOUNT
    })

    const Mrooms = (await roomModel.find({}))

    const room = Mrooms.find(room => {
        return room.joinerCode == joinerCode
    })
    console.log("ROOM: " + room)

    if (!account) {
        return next(createCustomError(`Username and Password do not match`, 400))
    }

    const dupicheck = account.rooms.find(roomy => {
        try {
            console.log("roomy: " + roomy)
            console.log("room.name: " + room.name)
            return room.name == roomy
        } catch (e) { }
    })
    if (dupicheck) {
        return next(createCustomError(`Already joined that room`, 400))
    }

    if (!room) {
        return next(createCustomError(`Invalid joinerCode ${joinerCode}`, 400))
    }

    const rooms = account.rooms
    rooms.push(room.name)
    console.log(rooms)
    const roomery = await accountModel.findOneAndUpdate({ username: ACCOUNT }, { $set: { rooms: rooms } }, { new: true, runValidators: true, returnOriginal: false })
    console.log(roomery)
    res.status(200).json({ room: room, success: true })
}))

app.delete("/:ACCOUNT/:PASSWORD/:NAME", wrapper(async (req, res) => {
    try {
        const { ACCOUNT, PASSWORD, NAME } = req.params
        const accounts = await accountModel.find({})
        const account = accounts.find((element) => {
            console.log(element.username, element.password, ACCOUNT, PASSWORD)
            return element.password == PASSWORD && element.username == ACCOUNT
        })
        var rooms = account.rooms
        rooms = rooms.filter(element => {return NAME != element})
        const roomery = await accountModel.findOneAndUpdate({ username: ACCOUNT }, { $set: { rooms: rooms } }, { new: true, runValidators: true, returnOriginal: false })
        console.log(roomery)
        res.status(200).json({ room: NAME, success: true })
    } catch (e) { }
}))

app.post("/rooms", wrapper(async (req, res, next) => {
    const { name, joinerCode } = req.body
    const rooms = await roomModel.find({})
    console.log(rooms)
    const _ = rooms.find(element => {
        try { return element.name == name || element.joinerCode == joinerCode } catch (e) { }
    })
    if (_) {
        return next(createCustomError("JoinerCode or name already exists", 400))
    }
    roomModel.create({ name, joinerCode })

    res.status(200).json({ room: req.body, success: true })
}))

app.get("/", wrapper(async (req, res) => {
    res.status(200).json({ mesages: await messageModel.find({}), success: true })
}))

app.get("/rooms/:ROOM", wrapper(async (req, res, next) => {
    const { ROOM } = req.params
    const rooms = await roomModel.find({})

    const room = rooms.find(element => {
        return element.name == ROOM
    })

    if (!room) {
        return next(createCustomError("Could not find room " + ROOM, 404))
    }

    res.status(200).json({ room: room, success: true })
}))

app.get("/:ACCOUNT/:PASSWORD", wrapper(async (req, res, next) => {
    const { ACCOUNT, PASSWORD } = req.params
    const accounts = await accountModel.find({})

    const account = accounts.find((element) => {
        console.log(element.username, element.password, ACCOUNT, PASSWORD)
        return element.password == PASSWORD && element.username == ACCOUNT
    })

    if (!account) {
        return next(createCustomError(`Username and Password do not match`, 404))
    }

    res.status(200).json({ account: account, success: true })
}))

app.get("/accounts", wrapper(async (req, res) => {
    const acc = await accountModel.find({})

    rooms = acc.map(idk => {
        const { username, rooms } = idk
        return { username, rooms }
    })

    res.status(200).json({ accounts: rooms, success: true })
}))

app.use(notFound)
app.use(handler)

console.log(app)

const server = http.createServer(app)
const io = socketio(server)

io.on("connection", async user => {
    console.log("SOMEONE CONNECTED")
    user.emit("message", "Welcome To Meetcord! Remember: You're here to meet!")
    //await axios.put("http://localhost:3000/",{author:"GreeterBot",content:"A new friend has joined the chat :D",timestamp:123})
    user.on("disconnect", async () => {
        //await axios.put("http://localhost:3000/",{author:"GreeterBot",content:"A user has left the chat :(",timestamp:123})
    })
})

io.on("join", async (data) => {
    console.log(data)
    await axios.put("http://localhost:3000/",{author:"GreeterBot",content:`User ${data.username} joined the room!!!`,room:data.room})
})

io.on("leave", async (data) => {
    await axios.put("http://localhost:3000/",{author:"GreeterBot",content:`User ${data.username} left the room`,room:data.room})
})

async function main() { 
    await connect(process.env.CONNECTION_STRING)
    server.listen(3000, () => { console.log("listening on port 3k") })
}

main()

