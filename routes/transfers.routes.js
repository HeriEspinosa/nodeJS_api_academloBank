const express = require('express');
const {
    validTransfer,
    makeTransfer,
} = require('../middlewares/validTransfers.middleware');
const {
    transferSender,
    transferSearch,
} = require('../controllers/transfer.controller');

const router = express.Router();

router.post('/', validTransfer, makeTransfer, transferSender);

router.get('/:account', transferSearch);

module.exports = router;
