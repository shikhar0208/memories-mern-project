const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    // to check whether the token is from our customAuth or google OAuth
    const isCustomAuth = token.length < 500;
    let decodedData;

    //if it is customAuth
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, 'secretString');
      req.userId = decodedData.id;
    }
    //if it is google auth
    else {
      decodedData = jwt.decode(token);
      req.userId = decodedData.sub;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = auth;
