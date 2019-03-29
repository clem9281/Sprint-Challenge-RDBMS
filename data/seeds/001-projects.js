exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("projects").insert([
    {
      name: "Sprint Challenge",
      description: "Sprint 12 Challenge: RDBMS",
      completed: "false"
    },
    {
      name: "awwwlympics",
      description: "Side project for pm group",
      completed: "false"
    }
  ]);
};
