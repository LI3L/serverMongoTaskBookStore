const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const orderItem = new Schema({
    bookId: Schema.Types.ObjectId,
    quantity: Number
})
const orderSchema = new Schema({
  items: [orderItem],
  totalPrice: Number,

  createdAt: { type: Date, default: Date.now },
});

const Order = model("order", orderSchema);
module.exports = Order;
