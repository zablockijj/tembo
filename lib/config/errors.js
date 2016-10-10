'use strict'

module.exports = {
  systemError: function(res, err) {
    res.status(500);
    res.json({
      "status": 500,
      "message": "Oops something went wrong",
      "error": err
    });
  },
  invalidUser: function(res) {
    res.status(401);
    res.json({
      "status": 401,
      "message": "Invalid User"
    });
  },
  tokenExpired: function(res) {
    res.status(400);
    res.json({
      "status": 400,
      "message": "Token Expired"
    });
  }
};