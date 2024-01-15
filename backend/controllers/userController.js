import User from "../models/userModel.js";
import asyncHandler from '../middleware/asyncHandler.js';
import generateToken from '../utils/generateToken.js';


//@desc     Register User
//@route    POST /api/auth/register
//@access   Public
const registerUser = asyncHandler(async(req, res)=>{
    const {name, email, password} = req.body;

    const userExist = await User.findOne({email});

    if(userExist){
        res.status(400);
        throw new Error("L'utilistaur existe déjà");
    };

    const user = await User.create({
        name,
        email,
        password
    });

    if(user){
        generateToken(res, user._id);
        
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    }else{
        res.status(400);
        throw new Error("Information invalide");
    };

});


//@desc     Login User
//@route    POST /api/auth/login
//@access   Public
const loginUser = asyncHandler(async(req, res)=>{
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        generateToken(res, user._id);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    }else{
        res.status(401);
        throw new Error("Email ou mot de passe invalide");
    };
});

//@desc     Get current user
//@route    GET /api/users/me
//@access   Pravite
const getMe = asyncHandler (async (req, res) => {
    res.send('me')
});

//@desc     Logout / Clear the cookie
//@route    POST /api/auth/logout
//@access   Private
const logout = asyncHandler(async(req, res)=>{
    res.cookie('jwt', ' ', {
        httpOnly: true,
        expires: new Date(0)
    });

    res.status(200).json({
        msg: "Déconnecté avec succès"
    })
});


export {
    registerUser,
    loginUser,
    getMe
}