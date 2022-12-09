const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    totalFee : {
        type : String,
        required : true
    },
    services : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Service'
    }]
},{
    timestamps : true
});

const Order = mongoose.model('Order',orderSchema);
module.exports = Order;