const User = require("../models/User.js");
const bcrypt = require('bcryptjs');

const Home = async (req, res) => {
    try {
        return res.redirect("/signup");
    } catch (error) {
        return res.json({ "error": error.message })
    }
};

const Login = async (req, res) => {
    try {

        if (req.method == "POST") {
            const { number, password } = req.body;
            console.log('req.body', req.body);
            const user = await User.findOne({ mobile_no: number });
            // console.log('user', user);
            if (!user) {
                return res.json({
                    error: "This Mobile-No is not exits. please try with another one. ",
                });
            }
            const compare = bcrypt.compareSync(password, user.password);
            if (!compare) {
                return res.json({ error: "Password is not match." });
            }

            req.session.name = user.name;
            req.session.user_id = user.user_id;
            req.session.mobile_no = user.mobile_no;
            req.session.adhar_number = user.adhar_number;
            req.session.nprc_location = user.nprc_location;
            req.session.address = user.address;
            req.session.station_id = user.station_id;
            req.session.district = user.district;
            return res.redirect("/Profile");

        }
        if (req.session.name) {
            return res.redirect("/profile");
        }
        else {
            return res.render("login");
        }

    } catch (error) {
        return res.json({ "error": error.message });
    }
};

const Signup = async (req, res) => {
    try {
        if (req.method == "POST") {
            const { name, user_id, mobile_no, adhar_number, nprc_location, address, station_id, district, password } = req.body;

            const a = await User.findOne({ mobile_no: mobile_no });
            if (a) {
                return res.json({
                    error:
                        "request with this Mobile No already exists. please try with another one.",
                });
            }

            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);
            const data = new User({
                name,
                user_id, mobile_no, adhar_number, nprc_location, address, station_id, district,
                password: hash
            });
            const data1 = await data.save();
            return res.redirect("/login");
        }
        if (req.session.name) {
            return res.redirect("/profile");
        }
        else {
            return res.render("signup");
        }

    } catch (error) {
        return res.json({ "error": error.message })
    }
};

const Profile = async (req, res) => {
    try {
        if (req.session.name) {
            if (req.method == "POST") {
                const user = await User.findOne({ mobile_no: req.session.mobile_no });
                const result = await User.findByIdAndUpdate(user._id, req.body);
                return res.redirect("/profile");
            }
            const user = await User.findOne({ "mobile_no": req.session.mobile_no });
            return res.render("profile", { user });
        }
        else {
            return res.redirect("/login");
        }
    } catch (error) {
        return res.json({ "error": error.message })
    }
};

const UploadDocuments = async (req, res) => {
    try {
        if (req.session.name) {
            if (req.method == "POST") {
                const user = await User.findOne({ mobile_no: req.session.mobile_no });
                const result = await User.findByIdAndUpdate(user._id, req.body);
                // return res.redirect("/Upload-Documents");

                const data = await User.findByIdAndUpdate(user._id, { payment_screenshot: `http://127.0.0.1:8080/document/${req.files[0].filename}`, tsr_report: `http://127.0.0.1:8080/document/${req.files[1].filename}` });

                // return res.json({ "Success": true, 'path0': `http://127.0.0.1:8080/document/${req.files[0].filename}`, 'path1': `http://127.0.0.1:8080/document/${req.files[1].filename}` })
                return res.redirect('/Upload-Documents');
            }
            // const user = await User.findOne({ "mobile_no": req.session.mobile_no });
            return res.render("uploadDocuments.ejs");
        }
        else {
            return res.redirect("/login");
        }
    } catch (error) {
        return res.json({ "error": error.message })
    }
};

module.exports = { Home, Login, Signup, Profile, UploadDocuments };