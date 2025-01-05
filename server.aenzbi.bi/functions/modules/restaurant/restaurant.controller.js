exports.create = (req, res) => {
    res.json({ message: "restaurant created successfully" });
};

exports.getAll = (req, res) => {
    res.json({ message: "Retrieved all restaurant" });
};

exports.getById = (req, res) => {
    res.json({ message: "Retrieved restaurant by ID" });
};

exports.update = (req, res) => {
    res.json({ message: "restaurant updated" });
};

exports.delete = (req, res) => {
    res.json({ message: "restaurant deleted" });
};
