const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../model/User")

const authMiddleware = require("../middleWare/authMiddle")

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) return res.send("Please enter all the required fill")
    try {
        const hashPassword = await bcrypt.hash(password , 12)
        const newUser = new User({ name, email, password: hashPassword })        
        const savedDb = await newUser.save()
        res.json({ success: "Sucessfully data saved", savedDb })  
    } catch (err) {
        return res.send("Data not saved")
    }
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body 
    if (!email || !password) return res.send("please enter all the required fields!");
    try {
        const doesUserExits = await User.findOne({ email });
        
        if (!doesUserExits)
            return res.status(400).json({ error: "Invalid email or password!" });
        
        const doesPasswordMatch = await bcrypt.compare(password,doesUserExits.password);
        
        if (!doesPasswordMatch) {
            return res.status(400).json({ error: "Invalid email or password!" });
        }
        
        const payload = { _id: doesUserExits._id };
        
        const getToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" })


        //1s print user the we get _doc menas 
        const user = {...doesUserExits._doc, password: undefined}
        return res.json({ message: "Sucessfully login", getToken, user })
    }
    catch (err) {
        return res.send("Data is not saved")
    }
    
})


router.get("/me", authMiddleware, (req, res) => {
    return res.json({...req.user._doc})
} )

module.exports = router 