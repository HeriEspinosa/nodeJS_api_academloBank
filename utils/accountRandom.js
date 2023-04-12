const accountRandom = function accountRandom() {
    let account = [];

    for (let i = 0; i < 6; i++) {
        account.push(Math.floor(Math.random() * 6));
    }

    return Number(account.join(''));
};

module.exports = accountRandom;
