const {
  getAllAuthors,
  getAuthor,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} = require("../services/authors");

module.exports = {
  listAuthors: async (req, res) => {
    try {
      const authors = await getAllAuthors();
      res.json(authors);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getAuthor: async (req, res) => {
    try {
      const id = req.params.id;
      const author = await getAuthor(id);
      res.json(author);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  createAuthor: async (req, res) => {
    try {
      const authorsData = req.body;
      const authorsArray = Array.isArray(authorsData) ? authorsData : [authorsData];
      const createAuthors = [];
      for (const authorData of authorsArray) {
        const { name,country } = authorData;
        const newAuthor = await createAuthor(
          name,
          country
        );
        createAuthors.push(newAuthor);
      }

      res.json(createAuthors);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  updateAuthor: async (req, res) => {
    try {
      const id = req.params.id;
      const updateData =req.body;
      const newAuthor = await updateAuthor(
        id,
        updateData
      );
      res.json(newAuthor);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  deleteAuthor: async (req, res) => {
    try {
      const id = req.params.id;
      const newAuthor = await deleteAuthor(id);
      res.json(newAuthor);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
