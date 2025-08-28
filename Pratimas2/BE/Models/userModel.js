import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: [true, "Username already exists"],
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email already exists"],
    },
    password: {
        type: String,
        required: true,
        minLength: [6, "Password must be at least 6 characters long"],
    },
    myArticles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "News",
        },
    ],
});

userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) {
        throw new Error("User not found");
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
        throw new Error("Invalid credentials");
    }
    return user;
};
const User = mongoose.model("User", userSchema);

export default User;
