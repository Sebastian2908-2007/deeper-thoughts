const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.SECRET;
const expiration = '2h';

module.exports = {
    signToken: function({ username, email, _id }) {
        const payload = { username,email,_id };

        return jwt.sign({ data: payload }, secret,{ expiresIn: expiration });
    },

    authMiddleware: function({req}) {
        // allows token to be sent via req.body. req.query, or headers
        let token = req.body.token || req.query.token || req.headers.authorization;

        // seperate "Bearer" from "<tokenvalue>"
        if(req.headers.authorization) { 
        token = token
        .split(' ')
        .pop()
        .trim();
        }

        // if no token, return request object as is
        if (!token) {
            return req;
        }

        try {
            // decode and atach user data to request object
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch {
            console.log('invalid token');
        }

        // return updated request object
        return req;
    }
};

/**
 {
  "data": {
    "login": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoidGVzdGVyOCIsImVtYWlsIjoidGVzdDhAZ21haWwuY29tIiwiX2lkIjoiNjI1ZTM0YmMzOWRhYTcyZDcwMmE0MTk3In0sImlhdCI6MTY1MDM0ODk4NCwiZXhwIjoxNjUwMzU2MTg0fQ.l1QEXRP3-eDtdoUIQqWrYAk558NfxO9zilt8vLBrI-w",
      "user": {
        "_id": "625e34bc39daa72d702a4197"
      }
    }
  }
}
 */