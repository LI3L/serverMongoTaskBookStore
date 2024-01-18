const Author = require("../models/author");

module.exports = {
  getAllAuthors: async () => {
    return Author.find({});
  },
  getAuthor: async (strId) => {
    return Author.findOne({ _id: strId });
  },
  createAuthor: async (name,country) => {
    const newAuthor = new Author({name,country});
    return newAuthor.save();
  },
    updateAuthor: async ( id,updateData) => {
       return Author.updateOne({_id:id},updateData);
    },
    deleteAuthor: async (strId) => {
        return Author.deleteOne({_id:strId});
    },
};
