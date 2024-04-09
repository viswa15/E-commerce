import JWT from 'jsonwebtoken'
import userModels from "../models/userModels.js"


export const requireSignIn = async (req,res,next) =>{
    try{
        const decode = JWT.verify(req.headers.authorization,process.env.JWT_SECRET)
        req.user = decode
        next();
    }catch(e){
        console.log(e)
    }
}

//admin access
export const isAdmin = async(req,res,next) =>{
    try{
        const user = await userModels.findById(req.user._id)
        if(user.role !== 1){
            return res.send({
                success : false,
                message : "UnAuthorized Access, only Admins can access",
            })
        }else{
            next()
        }
    }catch(e){
        console.log(e)
        res.status(401).send({
            success : false,
            e,
            message : "Error in middleware"
        })
    }
}