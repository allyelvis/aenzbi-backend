exports.create = (req, res) => {
    res.json({ message: "sales created successfully" });
};

exports.getAll = (req, res) => {
    res.json({ message: "Retrieved all sales" });
};

exports.getById = (req, res) => {
    res.json({ message: "Retrieved sales by ID" });
};

exports.update = (req, res) => {
    res.json({ message: "sales updated" });
};

exports.delete = (req, res) => {
    res.json({ message: "sales deleted" });
};
