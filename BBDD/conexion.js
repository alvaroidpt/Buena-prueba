
// Preparamos el método de autenticación del usuario en AdminJS
const DEFAULT_ADMIN = {
  email: 'admin@example.com',
  password: 'password',
}

export const authenticate = async (email, password) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN)
  }
  return null
};