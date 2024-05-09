import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is require'],
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: validator.isEmail
    },
    Password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, "Password length should be greater than 6 character"],
    },
    location: {
        type: String,
        default: "India",
    },
},
    { timestamps: true }
);
userSchema.pre('save', async function () {
    if (!this.isModified) return;
    const salt = await bcrypt.genSalt(10)
    this.Password = await bcrypt.hash(this.Password, salt);
});

userSchema.methods.comparePassword = async function (userPassword) {
    const isMatch = await bcrypt.compare(userPassword, this.Password);
    return isMatch;
};

userSchema.methods.createJWT = function () {
    return JWT.sign({ userId: this._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
}

export default mongoose.model("User", userSchema);