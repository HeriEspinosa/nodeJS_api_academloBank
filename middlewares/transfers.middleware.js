const Transfer = require('../models/transfer.models');
const transferRandom = require('../utils/transferRandom');

//CREAR LA TRANSFERENCIA
exports.createTransfer = async (req, res, next) => {
    const { transferReceiver, transferSender, amount } = req.accounts;
    try {
        let transferNumber = transferRandom();

        const transfer = await Transfer.create({
            senderAccount: transferSender.account_number,
            receiverAccount: transferReceiver.account_number,
            amount,
            transferNumber,
        });

        req.transferNumber = { transfer, transferNumber };
        next();
    } catch (error) {
        console.log(error.message);
    }
};
