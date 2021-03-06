const { verifyToken } = require("../utils/jwt");

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns
 */
exports.authentication = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token)
    return res.status(401).send({
      status: "error",
      message: "access denied, token is missing",
    });

  try {
    const payload = verifyToken(token, process.env.TOKEN_SECRET);
    req.userId = payload.id;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .send({ status: "error", message: "Token Expired" });
    } else if (error.name === "JsonWebTokenError") {
      return res
        .status(401)
        .send({ status: "error", message: "Invalid Token" });
    } else {
      return res.status(400).send({ status: "error", message: error });
    }
  }
};
