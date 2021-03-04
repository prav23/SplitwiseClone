const login = async(req, res) => {
    // res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
    // req.session.user = user;
    res.writeHead(200,{
        'Content-Type' : 'text/plain'
    })
    res.end("Successful Login");
}

module.exports = login;