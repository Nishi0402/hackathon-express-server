const db = require("../utils/dbpool")
const {apiSuccess, apiError} = require("../utils/apiresult")
const express = require("express")
const router = express.Router()


//quotes rest apis

router.get("", (req, resp) => {
    db.query("SELECT * FROM quote", (err, results) => {
        if(err)
            return resp.send(apiError(err))
        resp.send(apiSuccess(results))
    })
})

// POST /quotes
router.post("/addquote", (req, resp) => {
    const {id,author,contents,userId,createdTime} = req.body
    
    db.query("INSERT INTO quote (id,author,contents,userId,createdTime) VALUES (?, ?, ?, ?, ?)",
        [id,author,contents,userId,createdTime],
        (err, result) => {
            if(err)
                return resp.send(apiError(err))
            // if user inserted successfully, return new user object
            if(result.affectedRows === 1) {
                db.query("SELECT * FROM quote WHERE id=?", [result.insertId],
                    (err, results) => {
                        if(err)
                            return resp.send(apiError(err))
                        resp.send(apiSuccess(results[0]))
                    }
                )
            }
        }
    )
})

// PATCH /quotes/changecontents
router.patch("/changecontents", (req,resp) => {
    const {id, contents} = req.body
    
    db.query("UPDATE quote SET contents=? WHERE id=?", [contents, id],
        (err, result) => {
            if(err)
                return resp.send(apiError(err))
            if(result.affectedRows !== 1)
                return resp.send(apiError("content not found"))
            resp.send(apiSuccess("content content updated"))
        }
    )
})


// DELETE /quotes/:id
router.delete("/:id", (req, resp) => {
    db.query("DELETE FROM quote WHERE id=?", [req.params.id],
        (err, results) => {
            if(err)
                return resp.send(apiError(err))
            if(results.affectedRows !== 1)
                return resp.send(apiError("User not found"))
            return resp.send(apiSuccess("User deleted"))
        }
    )
})




module.exports = router