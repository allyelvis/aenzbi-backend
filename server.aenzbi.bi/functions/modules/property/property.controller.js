exports.create = (req, res) => {
    res.json({ message: "property created successfully" });
};

exports.getAll = (req, res) => {
    res.json({ message: "Retrieved all property" });
};

exports.getById = (req, res) => {
    res.json({ message: "Retrieved property by ID" });
};

exports.update = (req, res) => {
    res.json({ message: "property updated" });
};

exports.delete = (req, res) => {
    res.json({ message: "property deleted" });
};
