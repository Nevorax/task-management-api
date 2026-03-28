const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../config/prisma');

const login = async (data) => {
  if (!data.email || !data.password) {
    const err = new Error('Email and password are required');
    err.status = 400;
    throw err;
  }

  const user = await prisma.user.findUnique({
    where: { email: data.email }
  });

  if (!user) {
    const err = new Error('Invalid credentials');
    err.status = 401;
    throw err;
  }

  const isMatch = await bcrypt.compare(data.password, user.password);

  if (!isMatch) {
    const err = new Error('Invalid credentials');
    err.status = 401;
    throw err;
  }

  const secret = process.env.JWT_SECRET || 'secret_key';

  const token = jwt.sign(
    { id: user.id },
    secret,
    { expiresIn: '1h' }
  );

  return { token };
};

module.exports = {
  login
};