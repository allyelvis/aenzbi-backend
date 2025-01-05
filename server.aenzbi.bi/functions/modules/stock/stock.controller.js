exports.create = (req, res) => {
    res.json({ message: "stock created successfully" });
};

exports.getAll = (req, res) => {
    res.json({ message: "Retrieved all stock" });
};

exports.getById = (req, res) => {
    res.json({ message: "Retrieved stock by ID" });
};

exports.update = (req, res) => {
    res.json({ message: "stock updated" });
};

exports.delete = (req, res) => {
    res.json({ message: "stock deleted" });
};
