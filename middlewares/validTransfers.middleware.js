const Transfer = require('../models/transfer.models');
const User = require('../models/user.models');
const transferRandom = require('../utils/transferRandom');

exports.validTransfer = async (req, res, next) => {
    const { receiverAccount, senderAccount, amount } = req.body;

    try {
        //VALIDAR SI EXISTE LA CUENTA DE DONDE SE ENVIA
        const transferReceiver = await User.findOne({
            where: {
                account_number: receiverAccount,
            },
        });

        if (!transferReceiver) {
            return res.status(404).json({
                status: 'error',
                message: `The accound number: ${receiverAccount} is not valid`,
            });
        }

        //VALIDAR SI EXISTE LA CUENTA A DONDE SE ENVIA
        const transferSender = await User.findOne({
            where: {
                account_number: senderAccount,
            },
        });

        if (!transferSender) {
            return res.status(404).json({
                status: 'error',
                message: `The accound to which you send number ${senderAccount} does not exist`,
            });
        } else {
            if (transferSender.amount < amount) {
                return res.status(400).json({
                    status: 'error',
                    message: `The Accout number: ${transferSender.account_number}, does not have enough funds for this transfer`,
                });
            }
        }

        //VALIDAR SI LA TRANSFERENCIA ES A LA MISMA CUENTA DEL REMITENTE
        if (transferReceiver.account_number === transferSender.account_number) {
            console.log(equalAccounts);
            return res.status(400).json({
                status: 'error',
                message: `Oops, sorry you can't make a transfer to this same account`,
            });
        }

        req.accounts = { transferReceiver, transferSender, amount };
    } catch (error) {
        console.log(error.message);
    }

    next();
};

//CREAR LA TRANSFERENCIA
exports.makeTransfer = async (req, res, next) => {
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
    } catch (error) {
        console.log(error.message);
    }

    next();
};
