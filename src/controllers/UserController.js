const connection = require('../database/connection');

module.exports = {
    async index(req, res) {
        const users = await connection('users').select('*');
        return res.json(users);
    },

    async create(req, res) {
        const { name, last_name, username, email, password } = req.body;

        const user = await connection('users')
            .select()
            .from('users')
            .where('username', username)
            .first();

        if (user) {
            return res.status(400).json({ error: 'Usuário já existe!' });
        }

        const [id] = await connection('users').insert({
            name,
            last_name,
            username,
            email,
            password
        });

        const userInserted = await connection('users')
            .select('*')
            .where('id', id)
            .first();

        return res.status(201).json(userInserted);
    },

    async update(req, res) {
        const { name, last_name, username, email, password } = req.body;
        const { id } = req.params;

        const user = await connection('users')
            .select()
            .from('users')
            .where('id', id)
            .first();

        if (!user) {
            return res.status(400).json({ error: 'Usuário não encontrado!' });
        }

        await connection('users').update({
            name,
            last_name,
            username,
            email,
            password
        }).where('id', id);

        const userUpdated = await connection('users')
            .select('*')
            .where('id', id)
            .first();

        return res.status(201).json(userUpdated);
    }

}