export default async function handler(req, res) {
  const password = req.body.password;

  const isValidPassword = password === process.env.PASSWORD;

  res.status(200).json({ isValidPassword, password: process.env.PASSWORD });
}
