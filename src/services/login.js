
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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