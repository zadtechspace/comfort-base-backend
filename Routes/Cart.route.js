    const express = require("express")

    const cartRouter = express.Router()

    const {AddToCart,GetCart, incrementCartItemQuantity, decrementCartItemQuantity} = require("../Controller/CartController")
const isLogggedIn = require("../middlewares/isLoggedIn")


    cartRouter.post("/addcart" ,isLogggedIn, AddToCart )
    cartRouter.get("/getcart" ,isLogggedIn, GetCart )
    cartRouter.post("/incrementCartItemQuantity/:id" ,isLogggedIn, incrementCartItemQuantity )
    cartRouter.put("/decrementCartItemQuantity/:id" ,isLogggedIn, decrementCartItemQuantity )

    module.exports = cartRouter