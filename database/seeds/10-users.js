exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          username: "davinchy",
          password: "asdbse2g",
          department: "art",
        },
        {
          id: 2,
          username: "fredAstair",
          password: "sfasddfas",
          department: "math",
        },
        { id: 3, username: "lisaMona", password: "asdd2g", department: "art" },
        {
          id: 4,
          username: "blue",
          password: "csizcool",
          department: "computer science",
        },
      ]);
    });
};
