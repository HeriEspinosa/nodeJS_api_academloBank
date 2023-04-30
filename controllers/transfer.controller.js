const Transfer = require('../models/transfer.models');
const { Op } = require('sequelize');

exports.transferSender = async (req, res) => {
    const { transferReceiver, transferSender, amount } = req.accounts;
    const { transferNumber, transfer } = req.transferNumber;

    const amountCurrentSender = transferSender.amount;
    const amountCurrentReceiver = transferReceiver.amount;
    try {
        //DEBITAR MONTO A LA CUENTA DEL REMITENTE
        await transferSender.update({
            amount: amountCurrentSender - amount,
        });

        //AÑADIR MONTO A LA CUENTA DEL RECEPTOR
        await transferReceiver.update({
            amount: amountCurrentReceiver + amount,
        });

        //CAMBIAR ESTATUS DE TRANSFERENCIA
        await transfer.update({
            status: 'completed',
        });

        return res.status(200).json({
            status: 'success',
            message: `Your transfer of $${amount} to account: ${transferReceiver.account_number} was made successfully.`,
            Transferencia: `Transfer number: ${transferNumber}`,
        });
    } catch (error) {
        console.log(error.message);
    }
};

//buscar transferencias
exports.transferSearch = async (req, res) => {
    const { account } = req.params;

    try {
        const history = await Transfer.findAll({
            where: {
                [Op.or]: [
                    { senderAccount: account },
                    { receiverAccount: account },
                ],
            },
        });

        if (!history) {
            return res.status(404).json({
                status: 'error',
                message: 'Sorry!, Not your have transfers, right now.',
            });
        }

        return res.status(200).json({
            status: 'success',
            message: 'These are your transfers so far',
            results: history.length,
            history,
        });
    } catch (error) {
        console.log(error.message);
    }
};
