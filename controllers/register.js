const register = (req, res, db, bcrypt) => {
  const { username, name, password } = req.body;
  if (!username || !name || !password) {
    return res.status(400).json("incorrect form submission");
  }
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds).then((hash) => {
    db.transaction((trx) => {
      trx
        .insert({
          hash: hash,
          username: username,
        })
        .into("login")
        .returning("username")
        .then((loginUsername) => {
          return trx("users")
            .returning("*")
            .insert({
              username: loginUsername[0],
              name: name,
              resorts: [],
            })
            .then((user) => {
              res.json(user[0]);
            });
        })
        .then(trx.commit)
        .catch(trx.rollback);
    }).catch((err) => res.status(400).json("Unable to Register"));
  });
};

export default register;
