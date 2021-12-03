const express = require('express')
const {
    validateActionId,
    validateAction,
    validateActionUpdate
} = require("./actions-middlware")
const Actions = require('./actions-model')

const router = express.Router()

router.get('/', (req, res, next) => {
    Actions.get()
      .then(actions => {
        res.json(actions)
      })
      .catch(next)
});

router.get('/:id', validateActionId, (req, res) => {
    res.json(req.action)
});

router.post('/', validateAction, (req, res, next) => {
    Actions.insert({project_id: req.project_id, notes: req.notes, description: req.description, completed: req.completed})
      .then(newAction => {
        res.status(201).json(newAction)
      })
      .catch(next)
});

router.put('/:id', validateActionId, validateActionUpdate, (req, res, next) => {
    Actions.update(req.params.id, {project_id: req.project_id, notes: req.notes, description: req.description, completed: req.completed})
      .then(action => {
        res.status(200).json(action)
      })
      .catch(next)
  });

router.delete('/:id', validateActionId, (req, res, next) => {
    Actions.remove(req.params.id)
   .then(res.json())
   .catch(next)
 });

module.exports = router
