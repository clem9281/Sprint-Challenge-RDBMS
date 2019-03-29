const db = require("./dbConfig");

//projects
const findProjects = () => {
  return db("projects");
};

const findProjectByIdSimple = id => {
  return db("projects").where({ id });
};

const findProjectById = id => {
  return (
    db("projects")
      // use a left join so we still get something back from new projects that don't have actions yet
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

const deleteProject = id => {
  return db("projects")
    .where({ id })
    .del();
};

// actions
const getActions = () => {
  return db("actions");
};
const addAction = newAction => {
  return db("actions").insert(newAction);
};

module.exports = {
  findProjects,
  addProject,
  findProjectById,
  getActions,
  addAction,
  findProjectByIdSimple,
  deleteProject
};
