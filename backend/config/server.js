module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('WEBSITE', '127.0.0.1'),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'f84f024f9d04f5b6e9dddf0b37796069'),
    },
  },
});