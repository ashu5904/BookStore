const User = require('../models/userSchema');

exports.loginController = (req, res) => {
    const { email, password } = req.body;

    User.find({email: email})
    .exec((err, result) => {
        if(err || !result){
            return res.status(400).json({
                message: "Error in fetching users"
            })
        }

        if(result.length === 1){
            if(result[0].password === password){
                return res.status(200).json({
                    response: 1
                })
            } else {
                return res.status(200).json({
                    response: 0
                })
            }
        } else {
            return res.status(400).json({
                message: "Error in fetching users"
            }) 
        }
    })
}