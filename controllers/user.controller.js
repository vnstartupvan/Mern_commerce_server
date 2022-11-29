import { userModel } from '../Models/User.js';
import jwt from 'jsonwebtoken';
class user {
    // [POST]
    create(req, res, next) {

        const { username } = req.body;
        userModel.findOne({ username: username })
            .then(data => {
                if (!data) {
                    const newUser = new userModel(req.body);
                    return newUser.save();
                } else {
                    res.json(`tai khoan da ton tai`);
                }
            })
            .then(data => {
                res.json('tao tai khoan thanh cong');
            })
            .catch(error => {
                res.status(500).json('Tao tai khoan that bai');
            })
    }
    // [POST]
    login(req, res, next) {
        const username = req.body.username;
        const password = req.body.password;
        userModel.findOne({
            username: username,
            password: password,
        })
            .then(user => {
                if (user) {
                    let token = jwt.sign(user._id.toJSON(), 'authToken')
                    console.log(token)
                    res.status(200).json({ userInfo: user, token: token })
                } else {
                    res.status(300).json('sai tai khoan hoac mat khau')
                }
            })
            .catch(err => {
                console.log(err)
                res.status(500).json('server error')
            })
    }
    update(req, res) {

    }
}

export { user };

