    const express = require("express")

    const cartRouter = express.Router()

    const {AddToCart,GetCart, incrementCartItemQuantity, decrementCartItemQuantity, removeCartItem} = require("../Controller/CartController")
    
    const isLogggedIn = require("../middlewares/isLoggedIn")


    cartRouter.post("/addcart" ,isLogggedIn, AddToCart )
    cartRouter.get("/getcart" ,isLogggedIn, GetCart )
    cartRouter.put("/plusqty/:_id" ,incrementCartItemQuantity )
    cartRouter.put("/minusqty/:_id" , decrementCartItemQuantity )
    cartRouter.delete("/removecart/:_id" , removeCartItem )

    module.exports = cartRouter