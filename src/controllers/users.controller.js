const userService = require('../services/users.service');

const registerUser = async (req, res, next) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json(user);
    } catch (e) {
        next(e);
    }
};

const loginUser = async (req, res, next) => {
    try {
        const token = await userService.login(req.body);
        res.json(token);
    } catch (e) {
        next(e);
    }
};

module.exports = {
    registerUser,
    loginUser,
}