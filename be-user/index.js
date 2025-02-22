const express = require("express")
const cors = require("cors")
const db = require("./database/database")
const port = 3800
const bodyParser = require("body-parser")

const app = express()


app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))


app.get("/v1/users", async (req, res) => {

    db.connection.query("SELECT * FROM users", (err, result) => {
        if (err) return err
        return res.status(200).json({ status: 200, data: result, message: "Successfully Get Data" })
    })
})

app.post("/v1/create-user", async (req, res) => {
    db.connection.query(`INSERT INTO users(name,email,feedback) VALUES ('${req.body.name}', '${req.body.email}','${req.body.feedback}')`, (err, result) => {
        if (err) return err

        return res.status(201).json({ status: 201, message: "Success Created" })
    })
})


// === SAME API BUT EXAMPLE FOR MICROSERVICE / You Can Comment If Not Used ===
const userRoutes = express.Router()

userRoutes.get("/find", async (req, res) => {

    db.connection.query("SELECT * FROM users", (err, result) => {
        if (err) return err
        return res.status(200).json({ status: 200, data: result, message: "Successfully Get Data" })
    })
})

userRoutes.post("/add", async (req, res) => {
    db.connection.query(`INSERT INTO users(name,email,feedback) VALUES ('${req.body.name}', '${req.body.email}','${req.body.feedback}')`, (err, result) => {
        if (err) return err

        return res.status(201).json({ status: 201, message: "Success Created" })
    })
})
// Register Group Prefix
app.use("/v1/users", userRoutes)


app.listen(port, '0.0.0.0', () => {
    console.log("Running on 3800 - USER")
})