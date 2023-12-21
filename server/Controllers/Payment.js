const Razorpay = require('razorpay');
const user = require('../Models/User');
const product = require('../Models/Products');
const crypto = require('crypto');

var instance = new Razorpay({
    key_id : process.env.RAZORPAY_KEY,
    key_secret : process.env.RAZORPAY_SECRET
})


exports.initiatePayment = async (req,res)=>{
    try {
         const {amount} = req.body;
        //  console.log(amount)
         var options = {
            amount : amount*100,
            currency : "INR",
            receipt : Math.random(Date.now()).toString(), 
         }
         
         const response = await instance.orders.create(options);
         res.json({
            success : true,
            response,
            message : "Payment initiated successfully"
         })
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, mesage:"Could not Initiate Order"});
    }
}

exports.verifyPayment = async (req,res)=>{
    try {
        const {razorpay_payment_id, razorpay_order_id, razorpay_signature, name, email, _id, cart} = req.body;
        if(!razorpay_order_id ||
            !razorpay_payment_id ||
            !razorpay_signature || !cart) {
                return res.status(200).json({success:false, message:"Payment Failed"});
        }

        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const generated_signature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");

       if (generated_signature == razorpay_signature) {
            console.log("generated signature");


           cart.forEach(async (item)=>{
                await product.findOneAndUpdate({ _id : item._id}, {
                    $push : {
                        customers : _id
                    }
                },
                { new: true })    
            });

            const updatedUser = await user.findOneAndUpdate({email : email},
                {
                    $push : {
                        products : { $each : cart.map(item => item._id) }
                    }
                }
                ,
                { new: true }
                ).populate({
                path : "products"
            }).exec();
         
            return res.status(200).json({
                success:true, message:"Payment Verified", data : updatedUser
            });
            
       }
        else {
       console.log("failed")
       return res.status(200).json({success:"false", message:"Payment Failed"});
        }
    } catch (error) {
        res.json({
            success : false,
            message : "Failed to add product" + error.message
         })
    }
}
