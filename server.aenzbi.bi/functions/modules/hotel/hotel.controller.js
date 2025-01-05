exports.create = (req, res) => {
    res.json({ message: "hotel created successfully" });
};

exports.getAll = (req, res) => {
    res.json({ message: "Retrieved all hotel" });
};

exports.getById = (req, res) => {
    res.json({ message: "Retrieved hotel by ID" });
};

exports.update = (req, res) => {
    res.json({ message: "hotel updated" });
};

exports.delete = (req, res) => {
    res.json({ message: "hotel deleted" });
};
