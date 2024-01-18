const Book = require("../models/book");

module.exports = {
  getAllBooks: async (pageNumber) => {
    return Book.find({})
      .skip(pageNumber * 10)
      .limit(10);
  },
  getBook: async (strId) => {
    return Book.findOne({ _id: strId });
  },
  createBook: async (
    title,
    publishingYear,
    geners,
    authors,
    quantity,
    price
  ) => {
    const newBook = new Book({
      title,
      publishingYear,
      geners,
      authors,
      quantity,
      price,
    });
    return newBook.save();
  },
  updateBook: async (id,updateData) => {
    return Book.updateOne({ _id: id }, updateData);
  },
  deleteBook: async (strId) => {
    return Book.deleteOne({ _id: strId });
  },
  getBookByTitle: async (title) => {
    console.log(title);
    return Book.find({ title: { $regex: title, $options: "i" } });
  },
  getBookByGenre: async (genre, pageNumber) => {
    return Book.find({ geners: genre })
      .skip(pageNumber * 10)
      .limit(10);
  },
  getBookByAuthor: async (author) => {
    return Book.aggregate([
      {
        $lookup: {
          from: "authors",
          localField: "authors",
          foreignField: "_id",
          as: "author",
        },
      },
      { $match: { "author.name": author } },
    ]);
  },
  getBookByYear: async (year,secondYear) => {
    return Book.find({ publishingYear: { $gte: year, $lte: secondYear } });
  },
  getBookByAuthorCountry: async (country) => {
    return Book.aggregate([
      {
        $lookup: {
          from: "authors",
          localField: "authors",
          foreignField: "_id",
          as: "author",
        },
      },
      { $match: { "author.country": country } },
    ]);
  },
};