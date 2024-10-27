export const transformUser = (dbUser) => ({
  id: dbUser.id,
  email: dbUser.email,
  password: dbUser.password,
  name: dbUser.name,
  registedAt: dbUser.registed_at,
  roleId: dbUser.role_id,
});
