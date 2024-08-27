const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      required: true
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active'
  }
  });

userSchema.pre('save', async function(next) {
if (!this.isModified('password')) {
    return next();
}
const salt = await bcrypt.genSalt(10);
this.password = await bcrypt.hash(this.password, salt);
next();
});

// Compare entered password with hashed password
userSchema.methods.matchPassword = async function(enteredPassword) {
return await bcrypt.compare(enteredPassword, this.password);
};


const Users = mongoose.model('Users', userSchema);

module.exports = Users;