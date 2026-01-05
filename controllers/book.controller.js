const mongoose = require("mongoose")
const bookModel = require("../model/book.model")

const addBook = async (req, res) => {
   const session = await mongoose.startSession()
   session.startTransaction()

   try {
      const body = req.body

      await bookModel
         .create(body)
         .then((book) => {
            console.log("Book added successfully")
            res.status(201).json({
               success: true,
               message: "Book added successfully",
               data: book,
            })
         })
         .catch((err) => {
            res.status(400).json({
               success: false,
               message: "Error in adding book",
               data: err,
            })
         })

      await session.commitTransaction()
      session.endSession()
   } catch (error) {
      await session.abortTransaction()
      session.endSession()

      res.status(400).json({
         success: false,
         message: "Server error",
         data: error,
      })
   }
}

const getAllBooks = async (req, res) => {
   try {
      const allBooks = await bookModel.find({})

      console.log(allBooks.length)

      if (allBooks.length < 1) {
         res.status(400).send("No books found")
      }

      res.status(200).json({
         success: true,
         data: allBooks,
      })
   } catch (err) {
      res.status(400).json({
         success: false,
         data: err,
      })
   }
}

const getBookById = async (req, res) => {
   try {
      const id = req.params.id
      const book = await bookModel.findById(id)

      if (!book) {
         res.status(404).json({
            success: true,
            message: "Book with ID not found",
            data: book,
         })
      }

      res.status(200).json({
         success: true,
         data: book,
      })
   } catch (err) {
      res.status(400).json({
         success: false,
         data: err,
      })
   }
}

const updateBook = async (req, res) => {
   const id = req.params.id
   const body = req.body

   await bookModel
      .findByIdAndUpdate(id, body, { new: true })
      .then((book) => {
         res.status(201).json({
            success: true,
            message: "Book updated successfully",
            data: book,
         })
      })
      .catch((err) => {
         res.status(400).json({
            success: false,
            message: "Book with ID to update not found",
            data: err,
         })
      })
}

const deleteBook = async (req, res) => {
   try {
      const id = req.params.id
      await bookModel
         .findByIdAndDelete(id)
         .then((deletedBook) => {
            res.status(200).json({
               success: true,
               data: deletedBook,
            })
         })
         .catch((err) => {
            res.status(404).json({
               success: false,
               message: "Book with ID not found",
            })
         })
   } catch (err) {
      res.status(500).json({
         success: false,
         data: err,
      })
   }
}

module.exports = {
   addBook,
   getAllBooks,
   getBookById,
   updateBook,
   deleteBook,
}
