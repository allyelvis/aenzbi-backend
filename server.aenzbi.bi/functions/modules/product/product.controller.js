exports.create = (req, res) => {
    res.json({ message: "product created successfully" });
};

exports.getAll = (req, res) => {
    res.json({ message: "Retrieved all product" });
};

exports.getById = (req, res) => {
    res.json({ message: "Retrieved product by ID" });
};

exports.update = (req, res) => {
    res.json({ message: "product updated" });
};

exports.delete = (req, res) => {
    res.json({ message: "product deleted" });
};
