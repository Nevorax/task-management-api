const registerService = require('../services/user.register.services');
const loginService = require('../services/user.login.services');
const asyncHandler = require('../middleware/asyncHandler');

// POST /users/register
const register = asyncHandler(async (req, res) => {
  const user = await registerService.createUser(req.body || {});
  res.status(201).json(user);
});

// POST /users/login
const login = asyncHandler(async (req, res) => {
  const token = await loginService.login(req.body || {});
  res.json(token);
});

module.exports = {
  register,
  login
};