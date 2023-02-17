import mongoose from "mongoose";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const schema = new Schema({
    id: ObjectId,
    username: { type: String, require: true, minLength: 8, maxLength: 200 },
    password: { type: String, require: true, minLength: 8, maxLength: 200 },
    refreshToken: { type: String },
    name: { type: String, require: true },
    age: { type: String, require: true },
    avatar: { type: String },
    email: { type: String },
    role: { type: String, default: 'user' },
}, {
    timestamps: true,
});

export const userModel = mongoose.model('User', schema);
