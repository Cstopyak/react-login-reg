const  User  = require('../models/user.model');
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');

module.exports = {
    register: (req, res) => {
            console.log("LoginReg Controller")
            User.create(req.body)
                .then(user => {
                    res
                        .cookie(
                            "usertoken",
                            jwt.sign({ _id: user._id}, process.env.SECRET_KEY),
                            {
                                httpOnly: true,
                            }
                        )
                        .json({ msg: "Success!", user: { 
                            firstName: user.firstName, lastName: user.lastName
                        }});
                })
                .catch(err => res.json(err.errors));
    },

    login: (req, res) => {
        console.log("my login error")
        User.findOne({email:req.body.email})
            .then( user => {
                if (user == null) {
                    res.status(400).json({msg:"invalid login"})
                    res.cookie()
                }
                else{
                    bcrypt.compare(req.body.password, user.password)
                    .then(isValid =>{

                        if(isValid === true){
                            res
                                .cookie(
                                    "usertoken",
                                    jwt.sign({ _id: user._id}, process.env.SECRET_KEY),
                                    {
                                        httpOnly: true,
                                    }
                                )
                                .json({ msg: "Success!", user: { 
                                    firstName: user.firstName, lastName: user.lastName
                                }});

                        }
                        else{
                            consolg.log('KALSJHDLSKJFH')
                            res.status(400).json({msg:"INVALID LOGIN ATTEMPT!!!"})
                        }
                    })
                    .catch(err =>{
                        console.log(err)
                        res.status(400).json({msg:"INVALID LOGIN ATTEMPT!!!"})})
                }
                
            })
            .catch(err => res.status(400).json(err.errors));
    },
    logout: (req, res) => {
        res.clearCookie('usertoken');
        res.sendStatus(200);
    }
}