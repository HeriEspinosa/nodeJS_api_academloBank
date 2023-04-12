const User = require('../models/user.models');
const accountRandom = require('../utils/accountRandom');

exports.validAccount = async (req, res, next) => {
    let accountNumber = accountRandom();

    const accountDB = await User.findOne({
        where: {
            account_number: accountNumber,
        },
    });

    while (accountDB) {
        accountNumber = accountRandom();
    }
    req.accountNumber = accountNumber;

    next();
};
