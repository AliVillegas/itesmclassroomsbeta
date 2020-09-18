exports.index = (req, res) => {
    console.log("USER")
    console.log(req.user)
    if (req.user != null) {
        res.render('dashboard/main', {
            name: req.user.name,
            email: req.user.email
        });
    } else {
        res.redirect('/')
    }
}

exports.logout = (req, res) => {
    console.log("USER")
    console.log(req.user)
    if (req.user != null) {
        req.session.destroy();
        req.logout()
        res.redirect('https://login.microsoftonline.com/c65a3ea6-0f7c-400b-8934-5a6dc1705645/oauth2/logout?post_logout_redirect_uri=http://localhost:3000/');
    }
}