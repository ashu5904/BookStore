const Product = require('../models/productSchema.js');

exports.productFetchController = (req, res) => {
    Product.find({})
    .exec((err, result) => {
        if(err || !result){
            return res.status(400).json({
                message: "Error in fetching"
            })
        }

        return res.status(200).json({
            products: result
        })
    })
}