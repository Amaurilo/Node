const express = require('express');
const router = express.Router();
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'product lists' 
    });
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'product post' 
    });
});
module.exports = router;