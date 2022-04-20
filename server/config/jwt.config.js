const jwt = require("jsonwebtoken")

const authenticate = (req, res, next) => { //this authenticate function works as middleware. The 'next' direcive allows us to move from one piece of middleware to another. 
    jwt.verify(req.cookies.usertoken, //this is how we access our 'jsonwebtoken' called 'usertoken'.
        process.env.JWT_SECRET,
        (err, payload)=>{
            if(err){
                console.log(err);
                res.status(401).json({verified: false})
            }
            else{
                console.log(payload);
                req.jwtpayload = payload
                next()
            }
        }
    )
    }
    const authenticateRole = (roleArray) => (req, res, next) => {
    
        
        try {
            console.log("This is the req body " + req.body)
            // const decoded = await jwt.verify(token, process.env.JWT_SECRET);
            const decoded = jwt.verify(req.cookies.usertoken, process.env.JWT_SECRET);//token? or usertoken?
        req.user = {
        
            name: decoded.name,
            user_type: decoded.user_type
        };
        console.log(req.user)
            if(!req.user) {
                return res.status(401).json({
                    success: false,
                    message: 'Session expired',
                    code: 'SESSION_EXPIRED'
                });
                }
                let authorized = false;
                //if user has a role that is required to access any API
                roleArray.forEach(role => {//rolesArray? or roleArray?
                    console.log(req.user)
                authorized = req.user.user_type === role;
                })
                if(authorized) {
                    return next();
                }
                return res.status(401).json({
                    success: false,
                    message: 'Unauthorized',
                })
        } catch (error) {
            console.log(error)
        }

       
       
    }
      module.exports = {
        authenticate,
        authenticateRole,
    }
   


