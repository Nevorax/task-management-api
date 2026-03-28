const bcrypt = require('bcryptjs');
const prisma = require('../config/prisma');

const createUser = async (data) => {
  if (!data.email || !data.password) {
    const err = new Error('Email and password are required');
    err.status = 400;
    throw err;
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword
      }
    });

    return {
      id: user.id,
      email: user.email
    };
  } catch (error) {
    if (error.code === 'P2002') {
      const err = new Error('Email already exists');
      err.status = 409;
      throw err;
    }

    const err = new Error('Error creating user');
    err.status = 500;
    throw err;
  }
};

module.exports = {
  createUser
};