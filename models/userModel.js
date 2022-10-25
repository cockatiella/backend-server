import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 20,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    maxlength: 1024,
  },
});

//pre executes before the save method
userSchema.pre("save", async function (next) {
  try {
    //salt count determines encryption level
    const saltCount = 12;
    //generate encryption key based on salt count
    const salt = await bcrypt.genSalt(saltCount);
    //hash password with salt
    const hashedPassword = await bcrypt.hash(this.password, salt);
    //replace plain text password with hashed password
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.post("save", function (next) {
  console.log("document saved");
});

userSchema.statics.verifyUser = async function (email, password, next) {
  try {
    //find user by email
    const user = await UserModel.findOne({ email });
    //if user does not exist, throw error
    const verified = await bcrypt.compare(password, user.password);
    if (!verified) {
      const err = new Error("Invalid credentials");
      err.status = 401;
      throw err;
    }
    user.password = undefined;
    return user;
  } catch (error) {
    next(error);
  }
};

const User = mongoose.model("User", userSchema);

export default User;
