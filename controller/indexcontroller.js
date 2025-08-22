function verifyUsercontroller(req, res) {

    const user = req.user;
    if (user) {
        res.status(200).json({
            message:"user verified successfully",
        });
    } else {
        res.status(401).json({
            message:"user not authenticated",
        });
    }

}

module.exports = {
    verifyUsercontroller
};