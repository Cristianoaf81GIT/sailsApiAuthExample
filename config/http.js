
module.exports.http = {


  middleware: {

     order: [
       'cookieParser',
       'session',     
       'bodyParser',
       'compress',
       'poweredBy',
       'router',
       'www',
       'favicon',
     ],



     bodyParser: (function _configureBodyParser(){
       var skipper = require('skipper');
       var middlewareFn = skipper({ strict: true, onBodyParserError: (err, req, res, next) => {
        if (err instanceof SyntaxError)
          res.status(400).json({'error':'json expression malformed!'})

        //next() nesse caso nao deve ser chamado
       } });
       return middlewareFn;
     })(),    

    
  },

};
