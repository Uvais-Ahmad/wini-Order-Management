const { findByIdAndUpdate } = require("../models/orders");
const Order = require("../models/orders")

module.exports.create = async function ( req , res ){

    try{
        //Find any orderExist Which created recently
        
        let existOrder = await Order.findOne({dateTime :{$gt : new Date(new Date() - 3 * 60 * 60 * 1000)} })

        //order meet which created within three hours 
        if(existOrder){
            return res.status(400).json({
                message : "Any order can't be created within 3 hours of existing order",
                data : null,
                error : null
            });
        }

        //No recently order found
        let order = await Order.create( req.body );
        console.log('Order created successfully ');
        return res.status(200).json({
            message : "Order created successfully ",
            data : {
                order : order
            },
            error : null
        })
    }
    catch(err){
        console.log("Error occur in creating order ",err);
        return res.status(400).json({
            error : err
        });
    }

}

module.exports.getAll = async function ( req , res ){

    try{
        
        let orders = await Order.find();

        if( !orders ){
            return res.status(404).json({
                message : "No order exist",
                data : null
            })
        }
        
        return res.status(200).json({
            message : "",
            data : {
                orders : orders
            },
            error : null
        })
    }
    catch(err){
        console.log("Error occur in getting  orders list",err);
        return res.status(400).json({
            error : err
        });
    }

}


module.exports.delete = async function( req , res ){
    // we get id of delete Ques in req.params
    try{
        if(req.params.id){
            let order = await Order.findByIdAndDelete(req.params.id);
            return res.status(200).json({
                message : "Deleted Successfully",
                data : order
            })
        }
        return res.status(404).json({
            message : "Id not found of deleted order"
        })
    }
    catch(err){
        console.log("Error occur in deleting order ",err);
        return res.status(400).json({
            error : err
        });
    }
}

module.exports.update = async function( req , res ){
    //it takes id of order to update it
    try{
        
        let existOrder = await Order.findOne({dateTime :{$gt : new Date(new Date() - 3 * 60 * 60 * 1000)} })

        //order meet which created within three hours 
        if(existOrder){
            return res.status(400).json({
                message : "Any order can't be updated within 3 hours of existing order",
                data : null,
                error : null
            });
        }

        //No recently order found
        let order = await findByIdAndUpdate(req.params.id , req.body);
        console.log('Order updates successfully ');
        return res.status(200).json({
            message : "Order updated successfully ",
            data : {
                order : order
            },
            error : null
        })
    
        
    }
    catch(err){
        console.log("Error occur in update order ",err);
        return res.status(400).json({
            error : err
        });
    }
}