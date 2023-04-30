const User = require('../models/user.models');
const accountRandom = require('../utils/accountRandom');

exports.validAccount = async (req, res, next) => {
    let numberRandom = accountRandom();

    const compareWithDB = async (numberRandom) => {
        const accountDB = await User.findOne({
            where: {
                account_number: numberRandom,
            },
        });
        return accountDB;
    };

    try {
        let compare = await compareWithDB(numberRandom);

        while (compare) {
            numberRandom = accountRandom();
            compare = await compareWithDB(numberRandom);
        }

        req.accountNumber = numberRandom;
        next();
    } catch (error) {
        console.log(error.message);
    }
};
