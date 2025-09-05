const { addWeeks } = require("date-fns/addWeeks")
const { Roles } = require("../config/Code_Roles")
const GoogleUser = require("../models/GoogleUser")
const User = require("../models/User")
const { googlelogin } = require("./login")


const getuserdata = async (id) => {
    try {
        const googleuser = await GoogleUser.findOne({ _id: id })
        const emailuser = await User.findOne({ _id: id })
        console.log(googleuser, emailuser)
        if (googleuser != null & emailuser == null) {
            return googleuser.Userdata
        }
        else if (emailuser != null & googleuser == null) {
            return emailuser.Userdata
        }
        else {
            return {}
        }
    } catch (error) {
        throw new Error(error)
    }
}

const getalluserdata = async () => {
    try {
        const googleuser = await GoogleUser.find()
        const emailuser = await User.find()

        if (googleuser || emailuser) {
            return { Users: [...googleuser, ...emailuser] }
        } else {
            return { message: "User not found" }
        }
    } catch (error) {
        throw new Error(error)
    }
}

const selectrole = (type) => {
    if (type == "school" || type == "college") {
        return Roles.Student
    }
    else if (type == "tutor") {
        return Roles.Tutor
    }
    else {
        return Roles.User
    }
}

const Onboardingfinish = async (id, data) => {
    try {
        const googleuser = await GoogleUser.findOne({ _id: id })
        const emailuser = await User.findOne({ _id: id })
        if (googleuser != null & emailuser == null) {
            const newdata = { ...googleuser.Userdata, OnBoardingfinish: true, ...data }
            const updateuser = await GoogleUser.findByIdAndUpdate(id, {
                $set: {
                    Userdata: newdata,
                    Role: selectrole(data.educationType)
                }
            }, { new: true })
        }
        else if (emailuser != null & googleuser == null) {
            const newdata = { OnBoardingfinish: true, ...data }
            const updateuser = await User.findByIdAndUpdate(id, {
                $set: {
                    Userdata: newdata,
                    Role: selectrole(data.educationType)
                }
            }, { new: true })
            return { message: "Wellcome to Learnzily" }
        }
        else {
            return {}
        }
    } catch (error) {
        throw new Error(error)
    }
}

const getaccdet = async (id) => {
    try {
        const googleuser = await GoogleUser.findOne({ _id: id })
        const emailuser = await User.findOne({ _id: id })

        if (googleuser == null & emailuser != null) {
            return {id:emailuser.id, Role:emailuser.Role}
        }
        else if (googleuser != null & emailuser == null) {
            return {id:googleuser.id, Role:googleuser.Role}
        }
        else{
            return {}
        }
    } catch (error) {

    }
}

module.exports = { getuserdata, getalluserdata, Onboardingfinish ,getaccdet}