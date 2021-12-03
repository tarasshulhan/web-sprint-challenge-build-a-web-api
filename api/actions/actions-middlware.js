const Actions = require('./actions-model')
// const{ validateProjectId} = require('../projects/projects-middleware')

async function validateActionId(req, res, next) {
    try{
      const action = await Actions.get(req.params.id);
      if(action){
        req.action = action;
        next();
      }else{
        next({ status: 404, message: "action not found" })
      }
    }catch(error){
      next(error);
  }
  }

async function validateAction(req, res, next) {
    // const project_id = await validateProjectId(req.body.project_id)
    if (!req.body.project_id|| !req.body.notes || !req.body.notes.trim() || !req.body.description ||!req.body.description.trim()) {
      next({ status: 400, message: "missing required project_id, notes, or description field" })
    } else {
      req.project_id = req.body.project_id
      req.notes = req.body.notes.trim()
      req.description = req.body.description.trim()
      req.completed = req.body.completed
      next()
    }
}

async function validateActionUpdate(req, res, next) {
    // const project_id = await validateProjectId(req.body.project_id)
    if (!req.body.project_id|| !req.body.notes || !req.body.notes.trim() || !req.body.description 
    ||!req.body.description.trim() || !req.body.hasOwnProperty('completed')) { // eslint-disable-line
      next({ status: 400, message: "missing required project_id, notes, or description field" })
    } else {
      req.project_id = req.body.project_id
      req.notes = req.body.notes.trim()
      req.description = req.body.description.trim()
      req.completed = req.body.completed
      next()
    }
}

module.exports = {
    validateActionId,
    validateAction,
    validateActionUpdate
}