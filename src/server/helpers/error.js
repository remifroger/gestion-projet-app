class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super()
        this.statusCode = statusCode
        this.message = message
    }
}

const handleError = (req, err, res) => {
    const { statusCode, message } = err
    const path = req.originalUrl
    if (path.startsWith('/api/')) {
        res.status(statusCode).send({
            status: "Error",
            statusCode,
            message
        })
    } else {
        res.status(statusCode).render('error', {
            status: "Error",
            statusCode,
            message
        })
    }
}

module.exports = {
    ErrorHandler,
    handleError
}

