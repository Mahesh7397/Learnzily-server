const GoogleUser = require('../models/GoogleUser')
const bcrypt = require('bcrypt');
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const {Roles}=require('../config/Code_Roles')



const emaillogin = async (password, email) => {
    try {
        let userdb = await User.findOne({ email })
  
        if (!userdb) {
            return { message: 'User Not Found' }
        }
        else {
            const veriy=await bcrypt.compare(password, userdb.password)
            if (veriy) {
                // verify the password in bcrypt
                const user={
                    id:userdb.id,
                    Role:userdb.Role
                }
                const token = jwt.sign(user,process.env.ACCESS_TOKEN)
                return { message: 'login successfuly', Gatetoken:`b1c2a3d4-${userdb.Role}-7890-abcd-ef1234567890`, accessToken:token} // send the access token
            }
            else {
                return { message: 'incorrect Password' }
            }

        }
    } catch (error) {
       return error
    }
}

const googlelogin = async (email, googleid,data) => {
    try {
        let userdb = await GoogleUser.findOne({ email })
        if (!userdb) {
            const googleUser = new GoogleUser({ email, googleId: googleid, Userdata:{...data,OnBoardingfinish:false},Role:Roles.User })
            await googleUser.save()
            let afuserdb = await GoogleUser.findOne({ email })
            const token = jwt.sign({ id:afuserdb.id, Role:afuserdb.Role},process.env.ACCESS_TOKEN)
            return { message: 'login successfuly', Gatetoken:`b1c2a3d4-${afuserdb.Role}-7890-abcd-ef1234567890`, accessToken:token}
        }
        else {
            if (userdb.googleId === googleid) {
               
                const token = jwt.sign({ id:userdb.id, Role:userdb.Role},process.env.ACCESS_TOKEN)
                return { message: 'login successfuly', Gatetoken:`b1c2a3d4-${userdb.Role}-7890-abcd-ef1234567890`, accessToken:token}
             // send the access token 
            }
            return { message: 'error' }
        }
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = { emaillogin, googlelogin }