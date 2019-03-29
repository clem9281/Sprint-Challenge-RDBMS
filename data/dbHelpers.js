const db = require("./dbConfig");

const findProjects = () => {
  return db("projects");
};

module.exports = {
  findProjects
};
