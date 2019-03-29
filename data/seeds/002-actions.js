exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("actions").insert([
    {
      description: "Start Sprint Challenge",
      notes: "finish in three hours",
      project_id: 1,
      completed: "false"
    },
    {
      description: "Finish Sprint Challenge",
      notes: "Pull request and airtable",
      project_id: 1,
      completed: "false"
    },
    {
      description: "Decide who is doing what",
      notes: "everyone pick an issue",
      project_id: 2,
      completed: "false"
    },
    {
      description: "Start Coding",
      notes: "build react app",
      project_id: 2,
      completed: "false"
    }
  ]);
};
