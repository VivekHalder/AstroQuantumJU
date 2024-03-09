export const errorHandler = (err, req, res, next) => {
    console.log(err.stack);

    console.log("Reached.");

    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong.";

    res
    .status(statusCode)
    .json({
        message 
    });
}