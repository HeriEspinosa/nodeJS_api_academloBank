const transferRandom = function transferRandom() {
    let result = ['AB-', 1];
    for (let i = 0; i < 9; i++) {
        result.push(Math.floor(Math.random() * 9));
    }

    return result.join('');
};

module.exports = transferRandom;
