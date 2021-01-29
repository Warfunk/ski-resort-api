const signIn = (req, res, db, bcrypt) => {
  db.select("username", "hash")
    .from("login")
    .where("username", "=", req.body.username)
    .then((data) => {
      const isValid = bcrypt
        .compare(req.body.password, data[0].hash)
        .then((result) => {
          return result;
        });
      console.log(isValid);
      if (isValid) {
        db.select("*")
          .from("users")
          .where("username", "=", req.body.username)
          .then((user) => {
            res.json(user[0]);
          })
          .catch((err) => res.status(400).json("unable to get user"));
      } else {
        res.status(400).json("wrong credentials");
      }
    })
    .catch((err) => res.status(400).json("wrong info"));
};

export default signIn;
