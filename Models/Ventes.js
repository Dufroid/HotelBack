const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Vente = new Schema(
  {
    FacNum:
    {
      type: Number,
      default:0
    },
    perDay:
    {
      type: Number,
    },
    idProduit: [
        {
          type: Schema.Types.ObjectId,
          ref: "Medicament",
        },
      ],
     Vendeur:
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      PT:
      {
        type: Number,
      },
      qt:
      {
        type: Number,
      },
      Vendus: []
  },

  { timestamps: true }
);

const Ventes = mongoose.model("Vente", Vente);

module.exports = Ventes;
