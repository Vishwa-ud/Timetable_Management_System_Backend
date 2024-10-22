const router = require('express').Router();
const { User, validate } = require('../models/user');
const bcrypt = require('bcrypt');

const { logger } = require('./logger');

const { authenticateUser, authorizeRole } = require('../middleware/auth');


router.post("/", async (req, res) => {
    try{
        const{error} = validate(req.body);
        if(error){
            logger.error('Validation error:', error);
            return res.status(400).send({message: error.details[0].message});
        }
        const user = await User.findOne({email: req.body.email});
        if(user){
            logger.info('User with given email already exists:', req.body.email);
            return res.status(409).send({message: "User with given email already exist!"});
        }
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        //hashing password    
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        
        await new User({...req.body, password: hashedPassword}).save();
        logger.info('User created successfully:', req.body.email);
        res.status(201).send({message: "User created successfully!"});
    }catch(error){
        logger.error('Internal Server Error:', error);
        res.status(500).send({message: "Internal Server Error!"});
        
    }
})


// Define routes for Admin, Faculty, and Student based on roles
router.get('/admin/dashboard', authenticateUser, authorizeRole(['Admin']), (req, res) => {
    res.send({ message: 'Access Granted You are in Admin mode' });
});

router.get('/faculty/dashboard', authenticateUser, authorizeRole(['Faculty']), (req, res) => {
    res.send({ message: 'Access Granted You are a Faculty member' });
});

router.get('/student/dashboard', authenticateUser, authorizeRole(['Student']), (req, res) => {
    res.send({ message: 'Welcome To University Course Web' });
});


module.exports = router;