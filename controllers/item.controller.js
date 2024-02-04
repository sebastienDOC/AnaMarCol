const ItemModel = require('../models/item.model')
const UserModel = require('../models/user.model')
const ObjectID = require('mongoose').Types.ObjectId

module.exports.readItem = (req, res) => {
    ItemModel.find()
        .then(docs => {
            res.send(docs);
        })
        .catch(err => {
            console.log('Error to get data: ' + err);
            res.status(500).send('Internal Server Error');
        });
};

module.exports.createItem = async (req, res) => {
    const newItem = new ItemModel({
        posterId: req.body.posterId,
        denomination: req.body.denomination,
        quantite: req.body.quantite,
        fournisseur: req.body.fournisseur,
        // image: req.body.image
    })

    try {
        const item = await newItem.save()
        return res.status(200).json(item)
    } catch (err){
        return res.status(400).send(err)
    }
}

module.exports.updateItem = async (req, res) => {
    try {
        if (!ObjectID.isValid(req.params.id)) {
            return res.status(400).send('ID Unknown : ' + req.params.id);
        }

        const updatedRecord = {
            denomination: req.body.denomination,
            quantite: req.body.quantite,
            fournisseur: req.body.fournisseur,
            // image: req.body.image
        };

        const updatedItem = await ItemModel.findByIdAndUpdate(
            req.params.id,
            { $set: updatedRecord },
            { new: true }
        );

        if (!updatedItem) {
            return res.status(404).send('Item not found');
        }

        res.send(updatedItem);
    } catch (error) {
        console.log("Update error : " + error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports.deleteItem = async (req, res) => {
    try {
        if (!ObjectID.isValid(req.params.id)) {
            return res.status(400).send('ID Unknown : ' + req.params.id);
        }

        const deletedItem = await ItemModel.findOneAndDelete({ _id: req.params.id });

        if (!deletedItem) {
            return res.status(404).send('Item not found');
        }

        res.send(deletedItem);
    } catch (error) {
        console.log("Delete error : " + error);
        res.status(500).send('Internal Server Error');
    }
};
