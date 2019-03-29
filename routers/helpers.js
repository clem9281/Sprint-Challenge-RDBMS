const db = require("../data/dbHelpers");

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

module.exports = {
  prettifyArray,
  prettifyProjectWithActions
};
