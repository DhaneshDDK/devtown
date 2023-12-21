const user = require('../Models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signupController = async (req,res)=>{
    // console.log(req.body);
    // res.send(req.body);
    const {name,email,password,confirmPassword} = req.body;

    try {
        if(!name || !email || !password || !confirmPassword) {
            return res.status(403).send({
				success: false,
				message: "All Fields are required",
			});
        }
        if(password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and Confirm Password do not match. Please try again.",
            });
        }

        const user1 = await user.findOne({email});
        if(user1) {
         return res.status(400).json({
             success: false,
             message: "User already exists. Please sign in to continue.",
         });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userDetails = await user.create({
            name : name, email : email, password : hashedPassword
        })

        userDetails.password = undefined;

        return res.status(200).json({
			success: true,
			userDetails,
			message: "User registered successfully",
		});

    } catch (error) {
        return res.status(500).json({
			success: false,
			message: "User cannot be registered. Please try again.",
		});
    }
}


exports.signInController = async (req,res)=>{
    const {email,password} = req.body;
     //verification 
     if(!email || !password) {
        return res.status(400).json({
            success: false,
            message: `Please Fill up All the Required Fields`,
        });
    }

    try {
        const user1 = await user.findOne({email}).populate({
            path : "products"
        }).exec();
        if(!user1){
            return res.status(401).json({
				success: false,
				message: `User is not Registered with us Please SignUp to Continue`,
			});
        }


        const flag = await bcrypt.compare(password, user1.password );
        // console.log(flag);

        if(!flag){
            return res.status(401).json({
				success: false,
				message: `Password is incorrect`,
			});
        }

        // console.log(user1);

        const payload = {
            email : user1.email,
            name : user1.name,
            _id : user1._id,
            products : user1.products
        }
        
        
        const token = jwt.sign(  payload,  process.env.JWT_SECRET,
            { expiresIn: "24h", }
        );

        // console.log(password,user1.password)



        user1.token = token;
        user1.password = undefined;   //since we are printing the user

        res.json({
            success: true,
            token,
            user1,
			message: `User Login Success`,
        })


    } catch (error) {
        return res.status(500).json({
			success: false,
			message: `Login Failure Please Try Again`+ error.message,
		});
    }
}


exports.verifyUser = async (req,res)=>{
    try {
        const token = req.body.token;
         //if token missing, then return response
     if(!token) {
        return res.status(401).json({
            success:false,
            message:'TOken is missing',
        });
    }

     //verify token
     try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const email = decode.email;
        const response = await user.findOne({email}).populate({
            path : "products"
        });
        // console.log(email)
        res.status(200).json({
            success: true,
            data : response
        })
   //  console.log(req.user);
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:'token is invalid',
        });
    }


    } catch (error) {
         return res.status(401).json({
        success:false,
        message:'Something went wrong while validating the token',
    });
    }
}

