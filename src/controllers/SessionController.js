const connection = require('../database/connection');
const jwt = require('jsonwebtoken');
const authConfig = process.env.SECRET;

module.exports = {
    async create(req, res) {

        const { username, password } = req.body;

        const user = await connection('users')
            .select()
            .from('users')
            .where('username', username)
            .first();

        if (!user) {
            return res.status(401).json({ error: 'Nome de usuário ou senha inválido.' });
        }

        if (password != user.password) {
            return res.status(401).json({ error: 'Nome de usuário ou senha inválido.' });
        }

        const token = jwt.sign({ id: user.id }, authConfig, {
            expiresIn: 86400
        });

        return res.status(200).json({ user, token });
    }
}