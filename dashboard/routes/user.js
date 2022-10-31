const { getUser } = require("@schemas/User");

const express = require("express"),

  utils = require("../utils"),

  CheckAuth = require("../auth/CheckAuth"),

  router = express.Router();

router.get("/:userID", CheckAuth, async (req, res) => {

  res.redirect(`/user/${req.params.userID}/info`);

});

router.get("/:userID/info", CheckAuth, async (req, res) => {

  // Check if the user has the permissions to edit this guild

  const userParam = req.client.users.cache.get(req.params.userID);

  if (

    !userParam ||

    !req.userInfos ||

    !req.userInfos.id === req.params.userID

  ) {

    return res.render("404", {

      user: req.userInfos,

      currentURL: `${req.client.config.DASHBOARD.baseURL}/${req.originalUrl}`,

    });

  }

  // Fetch guild informations


  res.render("user/info", {

    user: req.userInfos,

    bot: req.client,

    currentURL: `${req.client.config.DASHBOARD.baseURL}/${req.originalUrl}`,

  });

});

router.post("/:userID/info", CheckAuth, async (req, res) => {

  // Check if the user has the permissions to edit this guild

  const userParam = req.client.users.cache.get(req.params.userID);

  if (

    !userParam ||

    !req.userInfos ||

    !req.userInfos.id === req.params.userID

  ) {

    return res.render("404", {

      user: req.userInfos,

      currentURL: `${req.client.config.DASHBOARD.baseURL}/${req.originalUrl}`,

    });

  }

  const settings = await getUser(userParam);

  const data = req.body;

  // BASIC CONFIGURATION

  if (Object.prototype.hasOwnProperty.call(data, "updateUser")) {

    if (data.lang && data.lang !== settings.lang) {

      settings.lang = data.lang;

    }


  }


  await settings.save();
 await req.flash("success","Successfully updated language")
  res.redirect(303, `/user/${userParam.id}/info`);

});


module.exports = router;