const express = require('express'); 
const helmet = require('helmet');   
const cors = require('cors');
const bcrypt = require('bcryptjs');

const db = require('./data/users-module.js')

const server = express();
server.use(helmet());
server.use(express.json());
server.use(cors());

// global middleware for protecting routes
const protected = (req, res, next) => {
    const { username, password } = req.headers

    if (username && password) {
        db.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
            next();
            } else {
            res.status(401).json({ message: 'Invalid Credentials' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Ran into unexpected error' });
        })
    } else {
        res.status(404).json({ message: 'No credentials provided' });
    }
}

server.get('/api/users', protected, async (req, res) => {
    try {
       const users = await db.find()
       res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});

server.post('/api/register', async (req, res) => {
    let user = req.body;
    if (!user.username || !user.password) {
        res.status(404).json({ message: "username and password required" });
    } else {
        // generate hash from users's pw
        const hash = bcrypt.hashSync(user.password, 8);
        user.password = hash;
    
        try {
            const newUser = await db.add(user);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ message: `Error adding user to the database.  Likely, a user by the name of ${req.body.username} already exists` });
        }
    }
});

server.post('/api/login', async (req, res) => {
    let { username, password } = req.body;

    try {
        const user = await db.findBy({ username }).first();

        if (user && bcrypt.compareSync(password, user.password)) {
            res.status(200).json({ message: `Welcome ${user.username}!` });
        } else {
            res.status(401).json({ message: 'You shall not pass!' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error in retrieving user info' });
    }
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`\n *** Running on port ${port} **\n`);
})