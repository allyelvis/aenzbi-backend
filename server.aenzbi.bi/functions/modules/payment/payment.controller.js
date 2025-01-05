exports.create = (req, res) => {
    res.json({ message: "payment created successfully" });
};

exports.getAll = (req, res) => {
    res.json({ message: "Retrieved all payment" });
};

exports.getById = (req, res) => {
    res.json({ message: "Retrieved payment by ID" });
};

exports.update = (req, res) => {
    res.json({ message: "payment updated" });
};

exports.delete = (req, res) => {
    res.json({ message: "payment deleted" });
};
