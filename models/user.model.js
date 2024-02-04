const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        pseudo: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 15,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            validate: [isEmail],
            lowercase: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            max: 1024,
            minlength: 6
        },
        picture: {
            type: String,
            default: "./uploads/profil/random-user.png"
        },
        poste: {
            type: String,
            max: 1024,
        },
        numero: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
)

// Cryptage du mot de passe
userSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

// Décryptage du mot de passe
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({email})
    if (user) {
        const auth = await bcrypt.compare(password, user.password)
        if (auth){
            return user
        }
        throw Error('Incorrect password')
    }
    throw Error('Incorrect email')
}

const UserModel = mongoose.model('user', userSchema)

module.exports = UserModel;