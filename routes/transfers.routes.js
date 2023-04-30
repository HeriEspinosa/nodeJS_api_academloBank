const express = require('express');

//middlewares
const {
    validTransfer,
    validExistReceiver,
    validExistSender,
} = require('../middlewares/validTransfers.middleware');
const { createTransfer } = require('../middlewares/transfers.middleware');

//controllers
const {
    transferSender,
    transferSearch,
} = require('../controllers/transfer.controller');

const router = express.Router();

router.post(
    '/',
    validExistReceiver,
    validExistSender,
    validTransfer,
    createTransfer,
    transferSender
);

router.get('/:account', transferSearch);

module.exports = router;
