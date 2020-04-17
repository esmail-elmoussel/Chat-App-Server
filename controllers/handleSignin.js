const handleSignin = (User,bcrypt) => (req,res) => {
    const { username, password } = req.body
    User.findOne({ username: username})
    .then(user => {
        if(bcrypt.compareSync(password, user.password))
            res.json(user)
        else
            res.status(400).json('Incorrect password!')
    })
    .catch(err => res.status(400).json(`User doesn't exist, please register first!`))
}

module.exports = handleSignin