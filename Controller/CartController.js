
    const cartModel = require("../Model/Cartmodel")

    const AddToCart = async(req,res)=>{
            const user = req.user._id
        const {quantity,productprice } = req.body
            try {
                const cartItem = await cartModel.create({user,...req.body,amount:quantity*productprice})
                res.status(200).json({
                    success:true,
                    message:"Item added to cart successfully",
                    data:cartItem
                })
            } catch (error) {
                console.log(error)
            }
    }


    const GetCart =async (req,res)=>{
        const user = req.user._id
        try {
            const getCartedItems = await cartModel.find({user, ...req.body})

            if(!getCartedItems){
                return res.status(404).json({
                    success:false,
                    message:"Cart is empty, please add items"
                })
            }
            
                 res.status(200).json({
                    success:true,
                    message:'Cart fetched successfully',
                    data:getCartedItems

                })
            
        } catch (error) {
            console.log(error)
        }
    }

    const incrementCartItemQuantity = async (req,res)=>{
        // collect the item id from req.params

        const itemId = req.params.id

        try {
            const cartItem = await cartModel.findById(itemId)

            if(!cartItem){
                return res.status(404).json({
                    sucess:false,
                    message:"Item not found in cart"
                })
            }

            cartItem.quantity += 1
            cartItem.amount = cartItem.quantity * cartItem.productprice

            await cartItem.save()

            res.status(200).json({
                success:true,
                message:"Cart item quantity incremented successfully",
                data:cartItem
            })
        } catch (error) {
            console.log(error)
        }
    }
    const decrementCartItemQuantity = async (req,res)=>{
        // collect the item id from req.params

        const itemId = req.params.id
        try {
            const cartItem = await cartModel.findById(itemId)

            if(!cartItem){
                return res.status(404).json({
                    success:false,
                    message:"Cart item not found"
                })
            }

            cartItem.quantity -=1
            cartItem.amount = cartItem.quantity / cartItem.productprice

            await cartItem.save()

            res.status(200).json({
                success:true,
                message:"Cart item decreased successfully",
                data:cartItem
            })
        } catch (error) {
            console.log(error)
        }
    }


    module.exports = {AddToCart,GetCart,incrementCartItemQuantity,decrementCartItemQuantity}