const Book = require("../models/book");
const {
  getAllOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
    getMaxOrder,
    getMostPopularGeners,
    getSumTotalPrice,
    getMost5PopularAuthors
} = require("../services/orders");

module.exports = {
  listOrders: async (req, res) => {
    try {
      const orders = await getAllOrders();
      res.json(orders);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getMaxTotalPrice: async (req, res) => {
    try {
      const start = req.params.start;
      const end = req.params.end;
      const order = await getMaxOrder(start,end);

      res.json(order);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getMostPopularGeners: async (req, res) => {
    try {
      const start = new Date(req.params.start);
      const end = new Date(req.params.end);
      const order = await getMostPopularGeners(start, end);
      res.json(order);
    } catch (err) {
      res.status(500).send(err);
    }

  },
    getMost5PopularAuthors: async (req, res) => {
        try {
            const start = new Date(req.params.start);
            const end = new Date(req.params.end);
            const order = await getMost5PopularAuthors(start, end);
            res.json(order);
        } catch (err) {
            res.status(500).send(err);
        }
    },
    getSumTotalPrice: async (req, res) => {
        try {
            const start = new Date(req.params.start);
            const end = new Date(req.params.end);
            const order = await getSumTotalPrice(start, end);
            res.json(order);
        } 
        catch (err) {
            res.status(500).send(err);
        }
    },


  getOrder: async (req, res) => {
    try {
      const id = req.params.id;
      const order = await getOrder(id);
      res.json(order);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  createOrder: async (req, res) => {
    try {//bookid,quantity
      const ordersData = req.body;
      const ordersArray = Array.isArray(ordersData)
        ? ordersData
        : [ordersData];
      let totalPrice = 0;
      const items = [];
      let flag = true;
      for (const orderData of ordersArray) {
        const { bookId,quantity  } = orderData;
        const book = await Book.findById(bookId);
        if(!book)flag = false;
        if(book.quantity < quantity)flag = false;
        totalPrice += book.price * quantity;
        await Book.updateOne({ _id: bookId }, { quantity: book.quantity - quantity })
        const newItem = {bookId,quantity};
        items.push(newItem);
      }
      if(!flag)throw new Error("invalid data");
      const newOrder = await createOrder(items, totalPrice);
      res.json(newOrder);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  updateOrder: async (req, res) => {
    try {
      const id = req.params.id;
      const updateData = req.body;
      const newAuthor = await updateOrder(id, updateData);
      res.json(newAuthor);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  deleteOrder: async (req, res) => {
    try {
      const id = req.params.id;
      const newOrder = await deleteOrder(id);
      res.json(newOrder);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
