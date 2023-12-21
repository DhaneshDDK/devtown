const product = require('../Models/Products');
const user = require('../Models/User')
const data = require('../data')

exports.createProduct = async (req,res)=>{
       try {
          data.forEach(async (item)=>{
            await product.create({...item});
          })
          console.log('Creating Product');
          res.send(req.body);
       } catch (error) {
          res.status(500).json({
            message : error.message
          })
       }
}

exports.getAllProducts = async (req,res)=>{
    try {
        const data = await product.find({});
        res.status(200).json({
            message : "success",
            response : data
        })
    } catch (error) {
        res.status(500).json({
            message : "error",
            response : error.message
        })
    }
}

exports.fetchFilteredProducts = async (req,res)=>{
    try {
        const {data} = req.body;
        const response = await product.find({
            $or : [
                {  name : {$regex: new RegExp(data, 'i')} },
                {  battery : {$regex: new RegExp(data, 'i')} },
                {  processor : {$regex: new RegExp(data, 'i')} },
                {  simtype : {$regex: new RegExp(data, 'i')} },
                {  memory : {$regex: new RegExp(data, 'i')} },
                {  os : {$regex: new RegExp(data, 'i')} },
            ]
        });

        res.status(200).json({
            success : true,
            data : response
        })
        
    } catch (error) {
        res.json({
            success : false,
            message : error.message
        })
    }
}


exports.fetchPricedProducts = async (req,res)=>{
    try {
        const {data} = req.body;
        var lp = 0; var hp=0;
        if(data.length===1) lp = data[0];
        else {
            lp = data[0]; hp = data[1];
        }

        // console.log(lp,hp)

        const response = await product.find({
            price : {
                $gte : lp,
                $lte : hp
            }
        })

        res.status(200).json({
            success : true,
            data : response
        })
        
    } catch (error) {
        res.json({
            success : false,
            message : error.message
        })
    }
}