const QuadBuild = require('../models/quadBuild');
const { body, validationResult } = require('express-validator');

exports.createQuadBuild = [
    // Validation rules
    body('build_name').notEmpty().withMessage('Build name is required'),
    body('year_of_build').isInt({ min: 1900, max: new Date().getFullYear() }).withMessage('Invalid year'),
    // ...other validations...
  
    // Request handler
    async (req, res) => {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      // Proceed to create the quad build
      try {
        const newQuadBuildId = await QuadBuild.create(req.body);
        res.status(201).json({ id: newQuadBuildId });
      } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
      }
    }
  ];

exports.getAllQuadBuilds = async (req, res) => {
  try {
    const quadBuilds = await QuadBuild.getAll();
    res.json(quadBuilds);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.getQuadBuildById = async (req, res) => {
  try {
    const quadBuild = await QuadBuild.getById(req.params.id);
    if (!quadBuild) {
      return res.status(404).send('Quad Build not found');
    }
    res.json(quadBuild);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.updateQuadBuild = async (req, res) => {
  try {
    await QuadBuild.update(req.params.id, req.body);
    res.send('Quad Build updated');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.deleteQuadBuild = async (req, res) => {
  try {
    await QuadBuild.delete(req.params.id);
    res.send('Quad Build deleted');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};