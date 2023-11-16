const express = require('express');
const postCtl = require('../controllers/postController')

const router = express.Router()
router.get('/CTXH/',postCtl.getAllCTXHPost)
router.get('/BTL/',postCtl.getAllBTLPost)
router.get('/Post/:id', postCtl.getPostById)
module.exports = router