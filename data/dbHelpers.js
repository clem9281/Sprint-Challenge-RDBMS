const db = require("./dbConfig");

const findProjects = () => {
  return db("projects");
};

// const findProjectById = id => {
//   return db("projects").where({ id });
// };

const findProjectById = id => {
  return (
    db("projects")
      .leftJoin("actions", "actions.project_id", "projects.id")
      // maybe should have given these better names to begin with
      .select({
        id: "projects.id",
        project_name: "projects.name",
        project_description: "projects.description",
        project_completed: "projects.completed",
        action_id: "actions.id",
        action_description: "actions.description",
        notes: "actions.notes",
        action_completed: "actions.completed"
      })
      .where({ "projects.id": id })
  );
};

const addProject = newProject => {
  return db("projects").insert(newProject);
};

module.exports = {
  findProjects,
  addProject,
  findProjectById
};
