const User  = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { nextTick } = require("process");

module.exports = {
    register: async (req, res)=>{

            try {
                const user = new User(req.body)
                // const newUser = await user.save({name: 'User',user_type: 'U'})
                const newUser = await user.save()
                //const admin = await user.save({name: 'Admin',user_type: 'A'})
                    console.log(newUser);
                    console.log("Successfully Registered!")
                    res.json(newUser)
                }
                catch (err) {
                    console.log("Registration not successful!")
                    res.status(400).json(err)
                }
    },

        login: async (req, res)=>{
            try{ 
            const userRecord = await User.findOne({email: req.body.email})
                if(userRecord === null){
                    res.status(400).json({message: "Invalid Login Attempt"})
                }
                else{
                    const isPasswordValid = await bcrypt.compare(req.body.password, userRecord.password)
                            if(isPasswordValid){
                                console.log("password is valid");
                                res.cookie(
                                    "usertoken",
                                    // jwt.sign(
                                    //     {
                                    //         id: userRecord._id,
                                    //         email: userRecord.email,
                                    //         username: userRecord.username
                                    //     },
                                    jwt.sign(
                                        {
                                            id: userRecord._id,
                                            email: userRecord.email,
                                            //username: userRecord.username,
                                            user_type: userRecord.user_type,
                                            name: userRecord.name

                                        },


                                
                                        process.env.JWT_SECRET
                                    ),
                                        {
                                            httpOnly: true,
                                            expires: new Date(Date.now() + 9000000)
                                        }
                                ).json({
                                    message: "Succesfully",
                                    userLoggedIn: userRecord.username,
                                    userId: userRecord._id
                                });
                            }
                            else{
                                res.status(400).json({message: "Invalid Login Attempt"})
                            }
                        }}
                        catch(err){
                                console.log(err);
                                res.status(400).json({ message: "Invalid Attempt" });
                            }
                    },
        logout: (req, res) => {
            console.log("logging out");
            res.clearCookie("usertoken");
            res.json({
            message: "You have successfully logged out!",
            });
        },

        getLoggedInUser: async (req, res)=>{
            try{
                const user = await  User.findOne({_id: req.jwtpayload.id})
                console.log(user);
                res.json(user)
            }catch(err){
                console.log(err);
            }},

            findAllUsers: async (req, res) => {
                try{
                    const allUsers = await User.find()
                    res.json(allUsers);
                        }
                    catch(err){
                        console.log("Find All Users failed");
                        res.json({ message: "Something went wrong in findAll", error: err })
                    }
            },
            deleteOneUser: (req, res)=>{
                User.deleteOne({_id: req.params.id})
                    .then((deletedUser)=>{
                        console.log(deletedUser);
                        res.json(deletedUser);
                    })
                    .catch((err)=>{
                        console.log("deleteOneUser() failed");
                        res.json({ message: "Something went wrong in deleteOneUser()", error: err })
                    })
            },

            updateUser: async (req, res) => {
                try {
                    const update = await User.findOneAndUpdate({_id: req.params.id},
                        req.body,
                        {new: true, runValidators: true}
                        )
                    res.json(update)
                } catch (err) {
                    console.log("Something went wrong in updateUser")
                    res.status(400).json({message: "Something went wrong in update", error: err})
                }
            },

}