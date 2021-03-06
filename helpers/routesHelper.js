module.exports.allowOnly = (accessLevel, callback) => {
  return (req, res, next) => {
    if (!(accessLevel & req.user.role)) {
      res.sendStatus(403);
      return;
    }

    return callback(req, res, next);
  };
};
