const isSubscribed =(req, res, next)=>{
    // const user = req.user
    
    const isSubscribed = true
  
          if ( !isSubscribed) {
        return res.status(403).json({
            success:false,
            message:"Kindly subscribed"
        })
    }
       
   
req.user = {fullName: "Badmus Lekan Oreoluwa", email:"Oppo159350@gmail.com", role:"admin", isSubscribed: true, plan:"basic"}

  
 next()
    
}

module.exports = isSubscribed



// {
//     "fullName": "Adekilekun Folashade",
//     "email":"oppo159355@gmail.com",
//     "age":50,
//     "gender":"female",
//     "password":"Andsome5",
//     "isVerfied": true,
//     "isSubscribed": true,
//     "plan": "basic"


// }

