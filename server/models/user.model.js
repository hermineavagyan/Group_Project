const mongoose = require('mongoose')
const bcrypt = require ("bcrypt");

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    }
},{timestamps:true})

UserSchema.virtual("confirmPassword")
.get(()=>this._confirmPassword)
.set((value)=>this._confirmPassword = value)

UserSchema.pre("validate", function(next){
if(this.password !== this.confirmPassword){
this.invalidate("confirmPassword", "Passwords must match!!!")
console.log("Passwords don't match!")
}
next()
})
UserSchema.pre("save", function(next){
console.log("in pre save");
    //hashing the password before it's saved to the db
    bcrypt.hash(this.password, 10)
        .then((hashedPassword)=>{
            this.password = hashedPassword;
            next();
        })
})

const User = mongoose.model('User', UserSchema)

module.exports = User