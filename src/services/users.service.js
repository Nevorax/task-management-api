const prisma = require('../config/prisma');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async (data) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return prisma.user.create({
        data: {
            email: data.email,
            password: hashedPassword
        }
    });
};



const login = async (data) => {
    const user = await prisma.user.findUnique({
        where: { email: data.email }
    });

    if (!user) throw new Error('Invalid credentials');

    const isMatch = await bcrypt.compare(data.password, user.password);

    if (!isMatch) throw new Error('Invalid credentials');

    const token = jwt.sign(
        { id: user.id },
        'secret_key',
        { expiresIn: '1h' }
    );

    return { token };
};

module.exports = {
    createUser,
    login,
}