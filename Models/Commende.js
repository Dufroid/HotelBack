const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Comande = new Schema(
  {
    idProdui: [
        {
          type: Schema.Types.ObjectId,
          ref: "Medicament",
        },
      ],
     Client:
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      PT:
      {
        type: Number,
      },
      Com: []
  },

  { timestamps: true }
);

const Comandes = mongoose.model("Comande", Comande);

module.exports = Comandes;
