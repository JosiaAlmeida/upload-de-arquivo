const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const path = require('path')
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    // res.json({ message: "Welcome" })
    res.sendFile(__dirname + '/public/index.html')
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.filename + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage })

app.post('/upload', upload.single('arquivo'), (req, res, next) => {
    const file = req.file
    if (!file) {
        const err = new Error("Selecione um arquivo")
        res.status(400)
        return next(err)
    }

    res.status(201).send("Ok")

    // next()
})

app.listen(3000, () => console.log("Servidor rodando"))