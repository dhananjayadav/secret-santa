const errorHandler = (err, res) => {
    console.error({ error: err.message })
    res.status(400).json({ error: err.message });
};

module.exports = errorHandler;