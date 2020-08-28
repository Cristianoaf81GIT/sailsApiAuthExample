const jwt = require('jsonwebtoken')

module.exports = (req,res, next) => {
  if(req.headers && req.headers.authorization) {
    let parts = req.headers.authorization.split(' ')
    if( parts.length == 2) {
      let scheme = parts[0]
      let credential = parts[1]
      if(/^Bearer$/i.test(scheme)) {
        jwt.verify(credential, 'secret', (err, decoded) =>{
          if (err)
            return res.status(401).json(err)
          req.user = decoded
          next()
        })
      } else {
        return res.status(401)
        .json(
          {'err':'O formato é Authorization: Bearer <token>'}
        )
      }
    }
  } else {
    return res.status(401).json({'err':'Header authorization não encontrado'})
  }
}
