const express = require('express')
const router = express.Router()
const {registerGet,registerGetid,registerInsert,registerEdit,registerDel} = require('../controller/register')

router.get('/',registerGet)
router.get('/:id',registerGetid)
router.post('/', registerInsert)
router.put('/:id', registerEdit)
router.delete('/:id',registerDel)


module.exports = router