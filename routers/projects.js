const express = require("express");
const db = require("../data/dbHelpers");
const router = express.Router();

const prettifyArray = objArr => {
  return objArr.map(el => ({
    ...el,
    completed: el.completed === 1 ? true : false
  }));
};

const prettifyProjectWithActions = arr => {
  return {
    id: arr[0].id,
    name: arr[0].project_name,
    description: arr[0].project_description,
    completed: arr[0].project_completed === 1 ? true : false,
    actions: !arr[0].action_id
      ? []
      : arr.map(el => ({
          id: el.action_id,
          description: el.action_description,
          notes: el.notes,
          completed: el.action_completed === 1 ? true : false
        }))
  };
};

router
  .route("/")
  .get(async (req, res) => {
    try {
      const projects = await db.findProjects();
      // show true/false rather than 0 1
      const prettyProjects = prettifyArray(projects);
      res.status(200).json(prettyProjects);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Sorry we couldn't get the projects at this time" });
    }
  })
  .post(async (req, res) => {
    const { name, description } = req.body;
    if (!name || !description)
      return res
        .status(400)
        .json({ error: "Your new project must have a name and description" });
    try {
      const newProjectId = await db.addProject(req.body);
      console.log(newProjectId);
      const newProject = await db.findProjectById(newProjectId[0]);
      console.log(newProject);
      const prettierProject = prettifyProjectWithActions(newProject);
      res.status(201).json(prettierProject);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Sorry we couldn't add a project at this time" });
    }
  });

router.route("/:id").get(async (req, res) => {
  try {
    const rawProject = await db.findProjectById(req.params.id);
    // this is a disaster
    const project = prettifyProjectWithActions(rawProject);
    res.status(200).json(project);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Sorry we couldn't get that project right now" });
  }
});

module.exports = router;
