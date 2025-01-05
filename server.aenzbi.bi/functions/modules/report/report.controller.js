exports.create = (req, res) => {
    res.json({ message: "report created successfully" });
};

exports.getAll = (req, res) => {
    res.json({ message: "Retrieved all report" });
};

exports.getById = (req, res) => {
    res.json({ message: "Retrieved report by ID" });
};

exports.update = (req, res) => {
    res.json({ message: "report updated" });
};

exports.delete = (req, res) => {
    res.json({ message: "report deleted" });
};
