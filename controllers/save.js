const save = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .update({ resorts: req.body.resorts, showresorts: req.body.showResorts })
    .returning("resorts")
    .then((resorts) => {
      res.json(resorts[0]);
    })
    .catch((err) => res.status(400).json("unable to save resorts"));
};

export default save;
