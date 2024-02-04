const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema(
    {
        posterId: {
            type: String,
            required: true,
        },
        denomination: {
            type: String,
            trim: true,
            required: true,
        },
        quantite: {
            type: Number,
            required: true,
        },
        fournisseur: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            default: "",
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('item', ItemSchema)