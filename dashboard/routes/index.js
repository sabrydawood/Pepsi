const express = require("express"),
  CheckAuth = require("../auth/CheckAuth"),
  router = express.Router();
const fs = require("fs")

router.get("/", (req, res ) => {
       res.render("login",{
  user : req.client.user.username,
  avatar :req.client.user.avatarURL(),
    loginURL : `https://discordapp.com/api/oauth2/authorize?client_id=${req.client.user.id}&scope=identify%20guilds%20email&response_type=code&redirect_uri=${encodeURIComponent(req.client.config.DASHBOARD.baseURL+"/api/callback")}&state=${req.query.state || "no"}`
})
});

router.get("/", CheckAuth, async (req, res) => {
	await req.flash('success', 'SETTINGS UPDATED');
  res.redirect("/selector");
});

router.get("/selector", CheckAuth, async (req, res) => {
  res.render("selector", {
    user: req.userInfos,
    bot: req.client,
    currentURL: `${req.client.config.DASHBOARD.baseURL}/${req.originalUrl}`,
  });
});
/*
router.get("/info", CheckAuth, async (req, res) => {
fs.writeFileSync(__dirname + '/../tmp/data.json', JSON.stringify(req.userInfos) , 'utf-8'); 

  res.render("user/info", {
    user: req.userInfos,
    bot: req.client,
    currentURL: `${req.client.config.DASHBOARD.baseURL}/${req.originalUrl}`,
  });
});*/

module.exports = router;
