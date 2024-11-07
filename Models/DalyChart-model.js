const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let DaylyChart = new Schema(
  {
    name: {
      type: String,
    },

    Qty: {
      type: Number,
    },
    Day: {
      type: Number,
    },
    idProduit:
      {
        type: Schema.Types.ObjectId,
        ref: "Medicament",
      },
  },

  { timestamps: true }
);

const DaylyCharts = mongoose.model("DaylyChart", DaylyChart);

module.exports = DaylyCharts;
