const express = require('express');
const postCtl = require('../controllers/postController')

const router = express.Router()

router.get('/CTXH/',postCtl.getAllCTXHPost);
router.get('/Group/',postCtl.getAllGroupPost);
router.get('/:pid', postCtl.getPostById);

router.post('/create', postCtl.createPost);
router.post('/delete', postCtl.deletePost);
router.post('/:type/search', postCtl.getPostFromSearch);

module.exports = router