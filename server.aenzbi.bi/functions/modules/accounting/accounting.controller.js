exports.create = (req, res) => {
    res.json({ message: "accounting created successfully" });
};

exports.getAll = (req, res) => {
    res.json({ message: "Retrieved all accounting" });
};

exports.getById = (req, res) => {
    res.json({ message: "Retrieved accounting by ID" });
};

exports.update = (req, res) => {
    res.json({ message: "accounting updated" });
};

exports.delete = (req, res) => {
    res.json({ message: "accounting deleted" });
};
