import { userModel } from '../Models/User.js';
import bcrypt from "bcrypt";
import { generateToken, decodeToken, verifyToken } from "../methods/auth.method.js";
import randToken from "rand-token";
// const randToken = require('rand-token');

class authControl {
    async register(req, res) {
        const username = req.body.username;
        const user = await userModel.findOne({ username: username });
        if (user)
            res.status(409).send('Tên tài khoản đã tồn tại.');
        else {
            const SALT_ROUNDS = 10;
            const hashPassword = bcrypt.hashSync(req.body.password, SALT_ROUNDS);
            const newUser = {
                username: username,
                password: hashPassword,
                // ...Thêm các tham số khác tại đây ...
            };
            const createUser = new userModel(newUser);
            await createUser.save();
            if (!createUser) {
                return res
                    .status(400)
                    .send('Có lỗi trong quá trình tạo tài khoản, vui lòng thử lại.');
            }
            console.log(createUser)
            return res.send({
                username,
            });
        }
    };

    async login(req, res) {
        const username = req.body.username;
        const password = req.body.password;

        const user = await userModel.findOne({ username: username });
        if (!user) {
            return res.status(401).send('Tên đăng nhập không tồn tại.');
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        console.log(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send('Mật khẩu không chính xác.');
        }

        const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

        const dataForAccessToken = {
            username: user.username,
        };
        const accessToken = await generateToken(
            dataForAccessToken,
            accessTokenSecret,
            accessTokenLife,
        );
        if (!accessToken) {
            return res
                .status(401)
                .send('Đăng nhập không thành công, vui lòng thử lại.');
        }
        const jwtVariable = {
            refreshTokenSize: 16
        }
        let refreshToken = randToken.generate(jwtVariable.refreshTokenSize); // tạo 1 refresh token ngẫu nhiên
        if (!user.refreshToken) {
            // Nếu user này chưa có refresh token thì lưu refresh token đó vào database
            await userModel.findOneAndUpdate({ username: user.username }, { refreshToken: refreshToken });
        } else {
            // Nếu user này đã có refresh token thì lấy refresh token đó từ database
            refreshToken = user.refreshToken;
        }

        return res.json({
            msg: 'Đăng nhập thành công.',
            accessToken,
            refreshToken,
            user,
        });
    };

    async refreshToken(req, res) {
        // Lấy access token từ header
        const accessTokenFromHeader = req.headers.x_authorization;
        if (!accessTokenFromHeader) {
            return res.status(400).send('Không tìm thấy access token.');
        }

        // Lấy refresh token từ body
        const refreshTokenFromBody = req.body.refreshToken;
        if (!refreshTokenFromBody) {
            return res.status(400).send('Không tìm thấy refresh token.');
        }

        const accessTokenSecret =
            process.env.ACCESS_TOKEN_SECRET;
        const accessTokenLife =
            process.env.ACCESS_TOKEN_LIFE;

        // Decode access token đó
        const decoded = await decodeToken(
            accessTokenFromHeader,
            accessTokenSecret,
        );
        if (!decoded) {
            return res.status(400).send('Access token không hợp lệ.');
        }

        const username = decoded.payload.username; // Lấy username từ payload

        const user = await userModel.findOne({ username: username });
        if (!user) {
            return res.status(401).send('User không tồn tại.');
        }

        if (refreshTokenFromBody !== user.refreshToken) {
            return res.status(400).send('Refresh token không hợp lệ.');
        }

        // Tạo access token mới
        const dataForAccessToken = {
            username,
        };

        const accessToken = await generateToken(
            dataForAccessToken,
            accessTokenSecret,
            accessTokenLife,
        );
        if (!accessToken) {
            return res
                .status(400)
                .send('Tạo access token không thành công, vui lòng thử lại.');
        }
        return res.json({
            accessToken,
        });
    };
}

export { authControl };