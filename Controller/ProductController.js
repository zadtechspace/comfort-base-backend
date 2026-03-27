const productModel = require("../Model/ProductModel")

   

    const addProduct = async(req,res)=>{

        if(!req.file){
            return res.status(404).json({
                success:false,
                message:"No image found"
            })
        }

        console.log(req.file)
        const seller = req.user._id


        try {
            
            const productItems = await productModel.create({seller,...req.body,image:req.file.path})
            if(!productItems){
                return res.status(404).json({
                    success:false,
                    message:"Adding of item is not successful"
                })
            }
            res.status(200).json({
                success:true,
                message:"Item added successfully",
                productItems,
                
            })
        } catch (error) {
            console.log(error)
        }
    }

    const getallproduct =async(req,res)=>{
        const seller = req.user._id

        try {
            
            const productItem = await productModel.find(req.body)
    
            if(!productItem){
                return res.status(404).json({
                    success:false,
                    message:"No product added yet"
                })
            }
            res.status(200).json({
                success:true,
                message:"All product found successfully",
                productItem,
                seller
               
            })
        } catch (error) {
            consosle.log(error)
        }

    }

    const singleproduct= async(req,res)=>{
            const productId = req.body._id
            const seller=req.user._id
            try {
                const productItem = await productModel.findOne(productId)

                if(!productItem){
                    return res.status(404).json({
                        success:false,
                        message:"Item not found"
                    })
                }
                res.status(200).json({
                    success:true,
                    message:"Item found successfully",
                    productItem,
                    seller
                })
                
            } catch (error) {
                console.log(error)
            }


          
    }

    module.exports ={addProduct,getallproduct,singleproduct}