import ratelimit from "../Config/upstash.js"


const rateLimiter = async (req, res, next) => {


    try {
        //Normally a ID or useID or IP is used insread of my-rate-limit but since in our project we dont have any authentication that is why we are using a variable so such,
        //Also usage of ID,userID makes sure each user has a rate limit individually but in our case all users requests are taken as one
        const {success} = await ratelimit.limit("my-rate-limit")
        
        if(!success){
            return res.status(429).json({message:"Too many requests, try again later"})  
        }
        next()
    } catch (error) {
        console.log("Ratelimit error",error)
        next(error)
    }


}

export default rateLimiter;