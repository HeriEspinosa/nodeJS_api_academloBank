const User = require('../models/user.models');

exports.signup = async (req, res, next) => {
    const { name, password, amount } = req.body;
    const { email, accountNumber } = req;

    try {
        const user = await User.create({
            name,
            email: email,
            password,
            account_number: accountNumber,
            amount,
        });

        res.status(201).json({
            status: 'success',
            message: 'The user has been created succesfully!',
        });
    } catch (err) {
        console.log('Oops! sorry something went wrong.', err.message);
    }
};

exports.signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const login = await User.findOne({
            where: {
                email,
                password,
                status: 'active',
            },
        });

        if (!login) {
            return res.status(404).json({
                status: 'error',
                message: 'This user was deleted',
            });
        }

        res.status(200).json({
            status: 'success',
            message: `Welcome ${email}`,
            login,
        });
    } catch (error) {
        console.log(error.message);
    }
};

exports.findAll = async (req, res) => {
    try {
        const users = await User.findAll({
            where: {
                status: 'active',
            },
        });

        res.status(200).json({
            status: 'success',
            results: users.length,
            users,
        });
    } catch (error) {
        console.log(error.message);
    }
};
