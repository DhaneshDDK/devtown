const express = require('express');
const app = express();
app.use(express.json());
require('dotenv').config();

const cors = require('cors');
app.use(cors({
    origin: '*',
    credentials : true
}));

const port = process.env.PORT || 4000;
app.listen(port,()=>{
    console.log(`Server started running on port ${port}`);
})

app.get('/',(req,res)=>{
    res.send({
       message : "Welcome to devTown"
    })
})

const dbConnect = require('./Config/dbConnect');
dbConnect();

const productRoutes = require('./Routes/Product');
app.use("/api/v1/products", productRoutes);

const userRoutes = require('./Routes/User');
app.use("/api/v1/users", userRoutes);

const paymentRoutes = require('./Routes/Payment');
app.use("/api/v1/payment", paymentRoutes);