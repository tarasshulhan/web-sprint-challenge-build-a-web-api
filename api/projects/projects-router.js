const express = require('express')
const {
    validateProjectId,
    validateProject,
    validateProjectUpdate,
} = require("./projects-middleware")
const Projects = require('./projects-model')

const router = express.Router()

router.get('/', (req, res, next) => {
    Projects.get()
      .then(projects => {
        res.json(projects)
      })
      .catch(next)
});

router.get('/:id', validateProjectId, (req, res) => {
    res.json(req.project)
});

router.post('/', validateProject, (req, res, next) => {
    Projects.insert({name: req.name, description: req.description, completed: req.completed})
      .then(newProject => {
        res.status(201).json(newProject)
      })
      .catch(next)
});

router.put('/:id', validateProjectId, validateProjectUpdate, (req, res, next) => {
    Projects.update(req.params.id, {name: req.name, description: req.description, completed: req.completed})
      .then(project => {
        res.status(200).json(project)
      })
      .catch(next)
  });

router.delete('/:id', validateProjectId, (req, res, next) => {
     Projects.remove(req.params.id)
    .then(res.json())
    .catch(next)
  });

router.get('/:id/actions', validateProjectId, async (req, res, next) => {
    try{
      const actions =  await Projects.getProjectActions(req.params.id)
      res.json(actions)
    } catch (err){
      next(err)
    }
  });

module.exports = router
