const { User, Application } = require('../models');

exports.create = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.create({
            username,
            email,
            password,
        });
        res.status(200).json(user, "User Created Successfully.");
    } catch (error) {
        console.error('Error creating a user:', error);
        next(error);
    }
};

exports.getById = async (req, res, next) => {
    const userId = req.params.id;

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            res.status(500).json({ message: 'User not found' });
        } else {
            res.json(user);
        }
    } catch (error) {
        next(error);
    }
};

exports.update = async (req, res, next) => {
    const userId = req.params.id;
    const { username, email } = req.body;

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            res.status(500).json({ message: 'User not found' });
            return;
        }
        user.username = username;
        user.email = email;
        await user.save();

        res.json(user);
    } catch (error) {
        next(error);
    }
};

exports.delete = async (req, res, next) => {
    const userId = req.params.id;

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            res.status(500).json({ message: 'User not found' });
            return;
        }
        await user.destroy();

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        next(error);
    }
};

exports.getAppliedJobsForUser = async (req, res, next) => {
    const userId = req.params.id;

    try {
        const appliedJobs = await Application.find({ userId: userId });
        if (!appliedJobs) {
            res.status(500).json({ message: 'Application not found' });
            return;
        }
        res.json(appliedJobs);
    } catch (error) {
        next(error);
    }
};
