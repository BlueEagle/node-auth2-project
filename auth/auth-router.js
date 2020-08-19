const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("../constants/secret");

const Users = require("../users/users-model");

router.post("/register", (req, res) => {
  const credentials = req.body;

  const hash = bcrypt.hashSync(
    credentials.password,
    process.env.BRCYPT_ROUNDS || 8
  );
  credentials.password = hash;

  Users.add(credentials)
    .then((user) => res.status(201).json({ user }).end())
    .catch((error) => res.status(500).json({ error: error.message }).end());
});

router.post("/login", (req, res) => {
  const credentials = req.body;
  Users.findBy({ username: credentials.username })
    .then(([user]) => {
      if (user && bcrypt.compareSync(credentials.password, user.password)) {
        const token = signToken(user);

        res.status(200).json({ message: "Welcome to the API!", token });
      } else {
        res.status(401).json({ message: "Invalid creds yo" });
      }
    })
    .catch((error) => res.status(500).json({ message: error.message }));
});

function signToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    role: user.role,
  };

  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;
