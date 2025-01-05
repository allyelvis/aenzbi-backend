exports.create = (req, res) => {
    res.json({ message: "auth created successfully" });
};

exports.getAll = (req, res) => {
    res.json({ message: "Retrieved all auth" });
};

exports.getById = (req, res) => {
    res.json({ message: "Retrieved auth by ID" });
};

exports.update = (req, res) => {
    res.json({ message: "auth updated" });
};

exports.delete = (req, res) => {
    res.json({ message: "auth deleted" });
};
