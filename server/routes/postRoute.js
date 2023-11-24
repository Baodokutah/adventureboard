const express = require('express');
const postCtl = require('../controllers/postController')

const router = express.Router()
router.get('/CTXH/',postCtl.getAllCTXHPost)
router.get('/BTL/',postCtl.getAllBTLPost)
router.get('/post/:id', postCtl.getPostById)

router.post('/removeMem', postCtl.removeMem);

module.exports = router