exports.create = (req, res) => {
    res.json({ message: "user created successfully" });
};

exports.getAll = (req, res) => {
    res.json({ message: "Retrieved all user" });
};

exports.getById = (req, res) => {
    res.json({ message: "Retrieved user by ID" });
};

exports.update = (req, res) => {
    res.json({ message: "user updated" });
};

exports.delete = (req, res) => {
    res.json({ message: "user deleted" });
};
