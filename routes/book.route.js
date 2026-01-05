const { Router } = require("express")
const bookController = require("../controllers/book.controller")

const bookRouter = Router()

bookRouter.get("/get", bookController.getAllBooks)

bookRouter.get("/get/:id", bookController.getBookById)

bookRouter.post("/add", bookController.addBook)

bookRouter.put("/update/:id", bookController.updateBook)

bookRouter.delete("/delete/:id", bookController.deleteBook)

module.exports = bookRouter
