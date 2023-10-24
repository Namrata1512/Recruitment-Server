const { Role } = require('../models');

exports.create = async (req, res, next) => {
  const { name } = req.body;

  try {
    const role = await Role.create({
      name,
    });

    res.status(200).json(role);
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  const roleId = req.params.id;

  try {
    const role = await Role.findByPk(roleId);
    if (!role) {
      res.status(500).json({ message: 'Role not found' });
    } else {
      res.json(role);
    }
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  const roleId = req.params.id;
  const { name } = req.body;

  try {
    const role = await Role.findByPk(roleId);
    if (!role) {
      res.status(500).json({ message: 'Role not found' });
    } else {
      role.title = title;
      role.description = description;
      await role.save();
      res.json(role);
    }
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  const roleId = req.params.id;

  try {
    const role = await Role.findByPk(roleId);
    if (!role) {
      res.status(500).json({ message: 'Role not found' });
    } else {
      await role.destroy();
      res.json({ message: 'Role deleted' });
    }
  } catch (error) {
    next(error);
  }
};

