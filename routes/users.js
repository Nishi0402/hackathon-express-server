
const db = require("../utils/dbpool")
const {apiSuccess, apiError} = require("../utils/apiresult")
const {createToken} = require("../utils/jwtauth")
const express = require("express")
const bcrypt = require("bcrypt")
const router = express.Router()

//common prefix--/user


//POST /user sign in
router.post("/signin", (req, resp) => {
    const {email, password} = req.body
    //console.log(req.url + " - " + req.method + " : " + email + " & " + passwd)
    db.query("SELECT * FROM user WHERE email=?", [email],
        (err, results) => {
            if(err)
                return resp.send(apiError(err))
            //console.log("results: ", results)
            if(results.length !== 1) // user with email not found
                return resp.send(apiError("Invalid email"))
            return resp.send (apiSuccess("Password match"))

            const dbUser = results[0]
            // if (!bcrypt.compareSync(password, dbUser.password))
                //return resp.send (apiSuccess("Password match"))
             //const isMatching = compareSync(password, dbUser.password)
             //console.log("is passwd matching: " , isMatching)
        //      if(!isMatching) // password not matching
        //        return resp.send(apiError("Invalid password"))
        //    const token = createToken(dbUser)    
        //     resp.send(apiSuccess({...dbUser, token})) // password matched for this user
        }
    )
})


// //POST /user SignUp
// router.post("/signup", (req, resp) => {
//     const {firstname, lastname, email, password} = req.body
//     //const encPasswd = bcrypt.hashSync(password, 10)
//     db.query("INSERT INTO user (firstname, lastname, email, password) VALUES (?, ?, ?, ?)",
//         [firstname, lastname, email, password],
//         (err, result) => {
//             if(err)
//                 return resp.send(apiError(err))
//             // if user inserted successfully, return new user object
//             if(result.affectedRows === 1) {
//                 db.query("SELECT * FROM user WHERE id=?", [result.insertId],
//                     (err, results) => {
//                         if(err)
//                             return resp.send(apiError(err))
//                         resp.send(apiSuccess(results[0]))
//                     }
//                 )
//             }
//         }
//     )
// })






module.exports = router