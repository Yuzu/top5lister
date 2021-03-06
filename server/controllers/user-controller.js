const auth = require('../auth')
const User = require('../models/user-model')
const bcrypt = require('bcryptjs')

getLoggedIn = async (req, res) => {
    auth.verify(req, res, async function () {
            const loggedInUser = await User.findOne({ _id: req.userId });
            if (loggedInUser !== null) {
                console.log("LOGGED IN USER FOUND");
                console.log(loggedInUser);
                return res.status(200).json({
                    loggedIn: true,
                    user: {
                        firstName: loggedInUser.firstName,
                        lastName: loggedInUser.lastName,
                        username: loggedInUser.username,
                        email: loggedInUser.email
                    }
                }).send();
            }
            else {
                console.log("USER NOT FOUND");
                return res.status(200).json({
                    loggedIn: false,
                    user: null
                }).send();
            }
    })
}

registerUser = async (req, res) => {
    try {
        const { firstName, lastName, username, email, password, passwordVerify } = req.body;
        const emailRe = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        const usernameRe = new RegExp(/^[a-z0-9]+$/i);

        if (!firstName || !lastName || !username || !email || !password || !passwordVerify) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }
        if (password.length < 8) {
            return res
                .status(400)
                .json({
                    errorMessage: "Please enter a password of at least 8 characters."
                });
        }
        if (password !== passwordVerify) {
            return res
                .status(400)
                .json({
                    errorMessage: "Please enter the same password twice."
                })
        }
        if (!usernameRe.test(username)) {
            return res
                .status(400)
                .json({
                    errorMessage: "Please enter an alphanumeric username."
                })
        }
        if (!emailRe.test(email)) {
            return res
                .status(400)
                .json({
                    errorMessage: "Please enter a valid email."
                })
        }
        const existingUser = await User.findOne({$or: [{email: email}, {username: username}]});
        if (existingUser) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "An account with this email address/username already exists."
                })
        }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName, lastName, username, email, passwordHash
        });
        const savedUser = await newUser.save();

        // LOGIN THE USER
        const token = auth.signToken(savedUser);

        await res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).status(200).json({
            success: true,
            user: {
                firstName: savedUser.firstName,
                lastName: savedUser.lastName,
                username: savedUser.username,
                email: savedUser.email
            }
        }).send();
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

loginUser = async(req, res) => {
    try {
        const { identifier, password } = req.body;

        const isEmail = identifier.includes("@") ? true : false;

        console.log(identifier + " trying to log in");

        let existingUser = null;

        if (isEmail) {
            existingUser = await User.findOne({ email: identifier });
        }
        else {
            existingUser = await User.findOne({ username: identifier});
        }
        
        if (!existingUser) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "An account with this email address/username does not exist."
                });
        }

        // Check that provided password is correct
        let valid = await bcrypt.compare(password, existingUser.passwordHash);

        if (!valid) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "Invalid password."
                });
        }
        // log in the user
        
        const token = auth.signToken(existingUser);
        console.log('logging in with token ' + token);
        await res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).status(200).json({
            success: true,
            user: {
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,
                username: existingUser.username,
                email: existingUser.email
            }
        }).send();
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err.json.errorMessage);
    }
}

logoutUser = async(req, res) => {
    console.log("logging out");
    try {
        await res.cookie("token", null, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).status(200).json({
            success: true,
        }).send();
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

module.exports = {
    getLoggedIn,
    registerUser,
    loginUser,
    logoutUser
}