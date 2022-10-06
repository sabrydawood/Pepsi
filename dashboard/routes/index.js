const express = require("express"),
  CheckAuth = require("../auth/CheckAuth"),
  router = express.Router();

router.get("/", (req, res ) => {
  console.log(CheckAuth)
       res.render("login",{
  user : req.client.user.username,
  avatar :req.client.user.avatarURL(),
    loginURL : `https://discordapp.com/api/oauth2/authorize?client_id=${req.client.user.id}&scope=identify%20guilds&response_type=code&redirect_uri=${encodeURIComponent(req.client.config.DASHBOARD.baseURL+"/api/callback")}&state=${req.query.state || "no"}`
})
});

router.get("/", CheckAuth, async (req, res) => {
  res.redirect("/selector");
});

router.get("/selector", CheckAuth, async (req, res) => {
  res.render("selector", {
    user: req.userInfos,
    bot: req.client,
    currentURL: `${req.client.config.DASHBOARD.baseURL}/${req.originalUrl}`,
  });
});


module.exports = router;
