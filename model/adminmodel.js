const {default: mongoose} =  require("mongoose")

const profileSchema = new mongoose.Schema({
    user :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        unique: true,
    },
    bio :{
        type: String,
    },

    profilePicture :{
        type: String,
    },

    skills : [{
        name: String,
        level:{type: String,
            enum:['Beginner', 'Intermediate', 'Advanced'],
        default:'Beginner'
        }
    }],

    github: {
        type : String,
    },

    linkedin : {
        type: String,
    },

    portfolioUrl:{
        type: String,
    }


})

const Profile = mongoose.model("profile", profileSchema);
module.exports = profile;
