const connection = require('../database/connection');

module.exports = {
    async index(req, res) {

        const users = await connection('users').select('*')

        return res.json(users)
    }

}