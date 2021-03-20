// general async handler for our sql request to be wrapped in

exports.asyncHandler = (cb) => {
  return async(req, res, next) => {
    try {
      await cb(req, res, next);
    } catch(error){
      next(error);
    }
  }
}