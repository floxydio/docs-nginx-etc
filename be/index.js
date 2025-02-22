const express = require("express")
const cors = require("cors")
const db = require("./database/database")
const port = 3500
const bodyParser = require("body-parser")

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))



app.get("/v1/todo", async (req, res) => {
    console.log("HIT")
    db.connection.query("SELECT * FROM todo", (err, result) => {
        if (err) return err
        return res.status(200).json({ status: 200, data: result, message: "Successfully Get Data" })
    })
})

app.post("/v1/create-todo", async (req, res) => {
    db.connection.query(`INSERT INTO todo(todo,is_done) VALUES ('${req.body.todo}', '${req.body.is_done}')`, (err, result) => {
        if (err) return err

        return res.status(201).json({ status: 201, message: "Success Created" })
    })
})



// === SAME API BUT EXAMPLE FOR MICROSERVICE  / You Can Comment If Not Used ===

const todoRouter = express.Router()
todoRouter.get("/find", async (req, res) => {
    console.log("HIT")
    db.connection.query("SELECT * FROM todo", (err, result) => {
        if (err) return err
        return res.status(200).json({ status: 200, data: result, message: "Successfully Get Data" })
    })
})

todoRouter.post("/create", async (req, res) => {
    db.connection.query(`INSERT INTO todo(todo,is_done) VALUES ('${req.body.todo}', '${req.body.is_done}')`, (err, result) => {
        if (err) return err

        return res.status(201).json({ status: 201, message: "Success Created" })
    })
})

app.use("/v1/todo", todoRouter)


app.listen(port, '0.0.0.0', () => {
    console.log("Running on 3500 - TODO")
})