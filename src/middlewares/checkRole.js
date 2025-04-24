module.exports = (roles) => {
    return (req, res, next) => {
        const userRoleName = req.user.role?.name;

        if (!userRoleName || !roles.includes(userRoleName)) {
            return res.status(403).json({ msg: "Access denied" });
        }

        next();
    };
};
