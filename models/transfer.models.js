const { db } = require('../database/config');
const { DataTypes } = require('sequelize');

const Transfer = db.define('transfers', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    amount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    senderAccount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    receiverAccount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    transferNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('completed', 'transition', 'cancelled'),
        allowNull: false,
        defaultValue: 'transition',
    },
});

module.exports = Transfer;
