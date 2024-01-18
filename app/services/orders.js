const Order = require("../models/order");

module.exports = {
  getAllOrders: async () => {
    return Order.find({});
  },
  getOrder: async (strId) => {
    return Order.findOne({ _id: strId });
  },
  createOrder: async (items,totalPrice) => {
    const newOrder = new Order({ items,totalPrice});
    return newOrder.save();
  },
  updateOrder: async (id, updateData) => {
    return Order.updateOne({ _id: id }, updateData);
  },
  deleteOrder: async (strId) => {
    return Order.deleteOne({ _id: strId });
  },
getMaxOrder: async (start,end) => {
    return await Order.find({createdAt:{$gte:start,$lte:end}}).sort({totalPrice:-1}).limit(1);
},
getMost5PopularAuthors: async (start,end) => {
    return await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: start,
            $lte: end,
          },
        },
      },
      {
        $unwind: "$items",
      },
      {
        $lookup: {
          from: "books",
          localField: "items.bookId",
          foreignField: "_id",
          as: "book",
        },
      },
      {
        $unwind: "$book",
      },
      {
        $unwind: {
          path: "$book.authors",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $lookup: {
          from: "authors",
          localField: "book.authors",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $unwind: {
          path: "$author",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $group: {
          _id: "$author.name",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort:
          {
            sort: -1,
          },
      },
      {
        $limit:
          5,
      },
    ]);
},
getSumTotalPrice: async (start,end) => {
    return await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: start,
            $lte: end,
          },
        },
      },
      {
        $group: {
          _id: null,
          sum: {
            $sum: "$totalPrice",
          },
        },
      },
    ]);
},
getMostPopularGeners: async (start,end) => {
    return await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: start,
            $lte: end,
          },
        },
      },
      {
        $unwind: "$items",
      },
      {
        $lookup: {
          from: "books",
          localField: "items.bookId",
          foreignField: "_id",
          as: "book",
        },
      },
      {
        $unwind: "$book",
      },
      {
        $unwind: {
          path: "$book.geners",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $group: {
          _id: "$book.geners",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
      {
        $limit: 3,
      },
    ]);
},
};
