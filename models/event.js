const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EventSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models?.Event || mongoose.model("Event", EventSchema);
