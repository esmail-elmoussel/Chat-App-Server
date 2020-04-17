const handleRegister = (User,bcrypt) => (req,res) => {
    const { username, password } = req.body
    const hash = bcrypt.hashSync(password);
    User.create({
        username: username,
        password: hash
    })
    .then(newUser => res.json(newUser))
    .catch(err => res.status(400).json('Username Already token! please choose different username.'))
}

module.exports = handleRegister;