import mongoose from "mongoose";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const schema = new Schema({
    id: ObjectId,
    title: { type: String, default: '', maxLength: 255, require: true },
    description: { type: String, default: '' },
    image: { type: String, default: '' },
    products: { type: Array, default: [] },
    product_count: { type: Number, default: 0 },
    slug: { type: String, slug: 'title', unique: true },
}, {
    timestamps: true,
});

export const collectionModel = mongoose.model('Collection', schema);
