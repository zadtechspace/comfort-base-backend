
    const cartModel = require("../Model/Cartmodel")

    const AddToCart = async(req,res)=>{
            const user = req.user._id
            console.log(user)
         const { quantity, productprice, name, image, productId } = req.body;
            try {
                    // check if item exist or not

                const  existingCartItem = await cartModel.findOne({user, productId})

                if(existingCartItem){
                    existingCartItem.quantity += quantity
                    existingCartItem.totalPrice = existingCartItem.quantity * productprice
                    await existingCartItem.save()

                    return res.status(200).json({
                        success:true,
                        message:"Cart item quantity updated successfully",
                        data:existingCartItem
                    })
                }

                const cartItem = await cartModel.create({
                    user,
                    name,
                    image,
                    quantity,
                    productprice,
                    totalPrice: quantity * productprice,
                    productId

                })
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

        const itemId = req.params._id

        console.log(itemId)
        try {
            const cartItem = await cartModel.findById(itemId) 

            console.log(cartItem)

            if(!cartItem){
                return res.status(404).json({
                    sucess:false,
                    message:"Item not found in cart"
                })
            }

            // const {quantity, productprice} = req.body

            cartItem.quantity += 1
            cartItem.totalPrice = cartItem.quantity * cartItem.productprice

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

        const itemId = req.params._id

        
        try {
            const cartItem = await cartModel.findById(itemId)

            if(!cartItem){
                return res.status(404).json({
                    success:false,
                    message:"Cart item not found"
                })
            }
            if (cartItem.quantity <= 1) {
                return res.status(400).json({
                    message: "Cannot go below 1"
                });
                }

            cartItem.quantity = cartItem.quantity - 1
            cartItem.totalPrice = cartItem.quantity * cartItem.productprice

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

    const removeCartItem = async (req,res)=>{
        const itemId = req.params._id

        try {
            const cartItem = await cartModel.findByIdAndDelete(itemId)
            res.status(200).json({
                success:true,
                message:"Cart item removed successfully",
                data:cartItem
            })
        } catch (error) {
            console.log(error)
        }

    }


    module.exports = {AddToCart,GetCart,incrementCartItemQuantity,decrementCartItemQuantity,removeCartItem}