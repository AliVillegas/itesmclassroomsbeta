const router = require('express').Router();

const authController = require('../controllers/AuthController');
const authMiddleware = require('../middlewares/AuthMiddleware');
const authValidator = require('../validators/AuthValidators');
const homepageController = require('../controllers/HomepageController');
const dashboardController = require('../controllers/DashboardController');

const passport = require('passport');

router.get('/', homepageController.index);

router.get('/auth/login', authController.login);
router.get('/auth/register', authController.register);
router.post('/auth/register', authValidator.store, authController.store);
router.post('/auth/login', passport.authenticate('local', { failureRedirect: '/auth/login?authError=1', successRedirect: '/' }));
router.get('/auth/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/protected', authMiddleware.isAuth, (req, res) => {
    res.send('Protected route, user correctly authenticated');
})
router.get('/auth/office365/login', passport.authenticate('azure_ad_oauth2'));
router.get('/auth/office365/logout', dashboardController.logout);

router.get('/auth/office365/callback', passport.authenticate('azure_ad_oauth2', {
    successRedirect: '/auth/office365/success',
    failureRedirect: '/auth/office365/fail'
}));

router.get('/auth/office365/success', dashboardController.index);

router.get('/auth/office365/fail', (req, res) => {
    console.log("FAILED LOGIN")
    return res.redirect('/');
});


module.exports = router;