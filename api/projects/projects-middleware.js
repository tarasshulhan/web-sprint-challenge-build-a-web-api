const Projects = require('./projects-model')

async function validateProjectId(req, res, next) {
    try{
      const project = await Projects.get(req.params.id);
      if(project){
        req.project = project;
        next();
      }else{
        next({ status: 404, message: "project not found" })
      }
    }catch(error){
      next(error);
  }
  }

function validateProject(req, res, next) {
    if (!req.body.name || !req.body.name.trim() || !req.body.description ||!req.body.description.trim()) {
      next({ status: 400, message: "missing required name or description field" })
    } else {
      req.name = req.body.name.trim()
      req.description = req.body.description.trim()
      req.completed = req.body.completed
      next()
    }
}

function validateProjectUpdate(req, res, next) {
    if (!req.body.name || !req.body.name.trim() || !req.body.description 
    ||!req.body.description.trim() || !req.body.hasOwnProperty('completed')) { // eslint-disable-line
      next({ status: 400, message: "missing required name, description, or completed ofield" })
    } else {
      req.name = req.body.name.trim()
      req.description = req.body.description.trim()
      req.completed = req.body.completed
      next()
    }
}


module.exports = {
    validateProjectId,
    validateProject,
    validateProjectUpdate
}