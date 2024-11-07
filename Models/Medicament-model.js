const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Medicament = new Schema(
  {
    Nom: {
      type: String,
      required: true,
    },
    quantite: {
      type: Number,
      default: 0,
    },
    pu: {
      type: Number,
    },
    mg: {
      type: Number,
    },
    type: {
      type: String,
    },
    Description: {
      type: String,
      required: true,
    },
    Admin: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },

  { timestamps: true }
);

const Medicaments = mongoose.model("Medicament", Medicament);

module.exports = Medicaments;
