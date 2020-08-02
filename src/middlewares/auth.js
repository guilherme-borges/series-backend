const jwt = require('jsonwebtoken');
const authConfig = process.env.SECRET;

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).json({ error: 'No token provided' });

    const parts = authHeader.split(' ');

    if (!parts.length === 2)
        return res.status(401).json({ error: 'Token error' });

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme))
        return res.status(401).json({ error: 'Token malformatted' });

    jwt.verify(token, authConfig, (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Token invalid' });

        req.userId = decoded.id;

        return next();
    });
};