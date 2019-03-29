const db = require("./dbConfig");

const findProjects = () => {
  return db("projects");
};

const findProjectById = id => {
  return db("projects").where({ id });
};

const addProject = newProject => {
  return db("projects").insert(newProject);
};

module.exports = {
  findProjects,
  addProject,
  findProjectById
};
