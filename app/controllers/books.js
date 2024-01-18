const {
    getAllBooks,
    getBook,
    createBook,
    getBookByGenre,
    getBookByAuthor,
    getBookByTitle,
    updateBook,
    getBookByYear,
    deleteBook
} = require("../services/books");

module.exports = {
  listBooks: async (req, res) => {
    try {
      const books = await getAllBooks(req.query.pageNumber);
      res.json(books);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getBook: async (req, res) => {
    try {
      const id = req.params.id;
      const book = await getBook(id);
      res.json(book);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getBookByYear: async (req, res) => {
    try{
      const year = req.params.year.split("-")[0];
      const secondYear = req.params.year.split("-")[1];
      const book = await getBookByYear(year, secondYear);
      res.json(book);
    }catch(err){res.status(500).send(err);}
  },
  getBookByGenre: async (req, res) => {
    try {
      const genre = req.params.genre;
      const pageNumber = req.query.pageNumber;
      const book = await getBookByGenre(genre,pageNumber);
      res.json(book);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getBookByAuthor: async (req, res) => {
    try {
      const author = req.params.author;
      const book = await getBookByAuthor(author);
      res.json(book);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getBookByTitle: async (req, res) => {
    try {
      const title = req.params.title;
      const book = await getBookByTitle(title);
      res.json(book);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  createBook: async (req, res) => {
    try {
      const booksData = req.body;
      const booksArray = Array.isArray(booksData) ? booksData : [booksData];
      const createdBooks = [];
      for (const bookData of booksArray) {
        const { title, publishingYear, geners, authors, quantity, price } =bookData;
        const newBook = await createBook(
          title,
          publishingYear,
          geners,
          authors,
          quantity,
          price
        );
        createdBooks.push(newBook);
      }

      res.json(createdBooks);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  updateBook: async (req, res) => {
    try {
      const id = req.params.id;
      const updateData= req.body;
      const newBook = await updateBook(id,updateData);
      res.json(newBook);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  deleteBook: async (req, res) => {
    try {
      const id = req.params.id;
      const newBook = await deleteBook(id);
      res.json(newBook);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  
};