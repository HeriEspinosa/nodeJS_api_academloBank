const User = require('../models/user.models');

//VALIDAR SI EXISTE LA CUENTA DE DONDE SE ENVIA
exports.validExistReceiver = async (req, res, next) => {
    const { receiverAccount } = req.body;

    try {
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

        req.transferReceiver = { transferReceiver };
        next();
    } catch (error) {
        console.log(error.message);
    }
};

//VALIDAR SI EXISTE LA CUENTA DEL REMITENTE Y SI TIENE FONDO SUFICIENTE
exports.validExistSender = async (req, res, next) => {
    const { senderAccount, amount } = req.body;
    try {
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

        req.accounts = { transferSender, amount };
        next();
    } catch (error) {
        console.log(error.message);
    }
};

//VALIDAR SI LA TRANSFERENCIA ES A LA MISMA CUENTA DEL REMITENTE
exports.validTransfer = async (req, res, next) => {
    const { transferReceiver } = req.transferReceiver;
    const { transferSender, amount } = req.accounts;

    try {
        if (transferReceiver.account_number === transferSender.account_number) {
            console.log(equalAccounts);
            return res.status(400).json({
                status: 'error',
                message: `Oops, sorry you can't make a transfer to this same account`,
            });
        }

        req.accounts = { transferReceiver, transferSender, amount };
        next();
    } catch (error) {
        console.log(error.message);
    }
};
