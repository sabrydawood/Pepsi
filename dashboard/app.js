const config = require("@root/config"),
 fs = require("fs"),
  utils = require("./utils"),
  CheckAuth = require("./auth/CheckAuth"),
 flash = require('connect-flash'),
 Topgg = require('@top-gg/sdk');
const { voteTraker } = require("@handlers/voteManger")

module.exports.launch = async (client) => {
  /* Init express app */

  const express = require("express"),
  https = require('https'),
    session = require("express-session"),
    path = require("path"),
    app = express();
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
 const oneDay = 1000 * 60 * 60 * 24;
var customSession;

  /* Routers */
  const mainRouter = require("./routes/index"),
    discordAPIRouter = require("./routes/discord"),
    logoutRouter = require("./routes/logout"),
    guildManagerRouter = require("./routes/guild-manager")
,
    userManagerRouter = require("./routes/user");

  client.states = {};
  client.config = config;
  let sslKey = fs.readFileSync(__dirname + '/ssl/key.pem', 'utf8'),
      sslCert = fs.readFileSync(__dirname + '/ssl/cert.pem', 'utf8')

/*var serverHttps = https.createServer({
    key: sslKey,
    cert: sslCert
}, app)*/
let serverHttp = require('http').createServer(app);
  /* App configuration */
  app
    .use(express.json()) // For post methods
    .use(express.urlencoded({ extended: true }))
    .use(cookieParser())
 .disable('x-powered-by')
 .use(helmet({
    contentSecurityPolicy: false,
  }))
		.use(flash())
    .engine("html", require("ejs").renderFile) // Set the engine to html (for ejs template)
 .set("view engine", "ejs")
     .use(express.static(path.join(__dirname, "/public"))) // Set the css and js folder to ./public
    .set("views", path.join(__dirname, "/views")) // Set the ejs templates to ./views
    .set("port", config.DASHBOARD.port)// Set the dashboard port

//session middleware
.use(session({
  secret: process.env.SESSION_PASSWORD,
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
})) 
    .use(async function (req, res, next) {
			if (req.session.user){
      req.user = req.session.user;
			}
      req.client = client;
			res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
      if (req.user && req.url !== "/") req.userInfos = await utils.fetchUser(req.user, req.client);
      next();
    })
    .use("/api", discordAPIRouter)
    .use("/logout", logoutRouter)
    .use("/manage", guildManagerRouter)
    .use("/user",userManagerRouter)
 .use("/", mainRouter)
.use(CheckAuth, function (req, res) {
      res.status(404).render("404", {
        user: req.userInfos,
      bot: req.client,
        currentURL: `${req.protocol}://${req.get("host")}${req.originalUrl}`,
      });
    })
    .use(CheckAuth, function (err, req, res) {
   //  res.set("Content-Security-Policy", "default-src 'self'");
      console.error(err.stack);
      if (!req.user) return res.redirect("/");
      res.status(500).render("500", {
        user: req.userInfos,
        currentURL: `${req.protocol}://${req.get("host")}${req.originalUrl}`,
      });
    });



const webhook = new Topgg.Webhook(process.env.DBL_SECRET) 
const TopggApi = new Topgg.Api(process.env.DBL_TOKEN)

app.post('/dbl', webhook.listener(vote => {
  if(TopggApi.hasVoted(vote.user.id)){
  voteTraker(vote)
      }
 console.log(vote.user) 
})) 

 
    
 /*  //https server
serverHttps.listen(app.get("port"), () => {
client.logger.success("Https listening on => " + app.get("port"));
  });*/
    //http server


serverHttp.listen(app.get("port"), () => {
client.logger.log("Http server listening on => "  + app.get("port"));
  });
    
    //--#######$$$##############
    
var os = require('os');

var networkInterfaces = os.networkInterfaces();

    
    client.logger.log(networkInterfaces)
    
    //////////////////#####$$$$##$#
    
    
    // print all routes
  function print (path, layer) {
  if (layer.route) {
    layer.route.stack.forEach(print.bind(null, path.concat(split(layer.route.path))))
  } else if (layer.name === 'router' && layer.handle.stack) {
    layer.handle.stack.forEach(print.bind(null, path.concat(split(layer.regexp))))
  } else if (layer.method) {
    console.log('%s /%s',
      layer.method.toUpperCase(),
      path.concat(split(layer.regexp)).filter(Boolean).join('/'))
  }
}

function split (thing) {
  if (typeof thing === 'string') {
    return thing.split('/')
  } else if (thing.fast_slash) {
    return ''
  } else {
    var match = thing.toString()
      .replace('\\/?', '')
      .replace('(?=\\/|$)', '$')
      .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//)
    return match
      ? match[1].replace(/\\(.)/g, '$1').split('/')
      : '<complex:' + thing.toString() + '>'
  }
}

app._router.stack.forEach(print.bind(null, []))
};
