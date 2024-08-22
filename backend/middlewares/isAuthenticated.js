//Middleware: Works between request and response, whenever we send a request from one end, 
//first the middleware is checked and it allows the request to pass to the controller. Example: It checks if the user 
//is authenticated or not 

import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
            try {
                        const token = req.cookies.token;//bring the token
                        if (!token) {//check if token exists, if not
                                    return res.status(401).json({
                                                message: "User not authenticated",
                                                success: false
                                    })
                        }
                        //if token exists then it is decoded using the functions jwt.verify(yourToken, secret_key)
                        const decode = jwt.verify(token, process.env.SECRET_KEY);
                        if (!decode) {//if does not gets decoded
                                    return res.status(401).json({
                                                message: "Invalid token",
                                                success: false
                                    })
                        };
                        //if token gets decoded then store the userId from the token in id
                        req.id = decode.userId;
                        next();//send to the next route in Router user.route.js
            } catch (error) {
                        console.log(error);
            }
}
export default isAuthenticated;