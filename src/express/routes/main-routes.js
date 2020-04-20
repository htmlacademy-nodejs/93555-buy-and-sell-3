'use strict';

const {Router} = require(`express`);
const mainRouter = new Router();

mainRouter.get(`/`, (req, res) => res.render(`main`));
mainRouter.get(`/register`, (req, res) => res.render(`auth/signup`));
mainRouter.get(`/login`, (req, res) => res.render(`auth/login`));
mainRouter.get(`/search`, (req, res) => res.render(`search-result`));

module.exports = mainRouter;
