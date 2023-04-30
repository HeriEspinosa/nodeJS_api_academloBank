const User = require('../models/user.models');

exports.validExistsUser = async (req, res, next) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({
            where: {
                email,
                status: 'active',
            },
        });

        if (user) {
            return res.status(400).json({
                status: 'error',
                message: `This email: ${email} exist.`,
            });
        }

        req.email = email;
        next();
    } catch (error) {
        console.log(error.message());
    }
};

exports.validLoginUser = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const userEmail = await User.findOne({
            where: {
                email,
            },
        });

        if (!userEmail) {
            return res.status(404).json({
                status: 'error',
                message: `Sorry, the email: ${email} not exist 🤕`,
            });
        }

        const userPassword = await User.findOne({
            where: {
                email,
                password,
            },
        });

        if (!userPassword) {
            return res.status(404).json({
                status: 'error',
                message: 'Sorry, the password not match with email 🤔',
            });
        }

        next();
    } catch (error) {
        console.log(error.message());
    }
};
