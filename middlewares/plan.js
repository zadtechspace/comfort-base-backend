
const plan = (req, res, next) =>{

    const {plan} = req.user

    if ( plan !=="basic") {
        return res.status(403).json({
            success:false, 
            message:"Your plan is limited"
        })
    }

    next()
}

module.exports = plan