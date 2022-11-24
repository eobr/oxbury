exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status && err.msg) {
    console.log(err);
    res.status(err.status).send(err.msg);
  } else next(err);
};

exports.handleServerErrors = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal server error" });
};
