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
    price_min: { type: Number, default: 0, require: true },
    price_max: { type: Number, default: null },
    product_type: { type: Array, default: [] },
    video: { type: String, default: '' },
    options: { type: Object, default: {} },
    image: { type: String, default: '' },
    images: { type: Array, default: [] },
    variants: { type: Array, default: [] },
    collections: { type: Array, default: [] },
    tags: { type: Array, default: [] },
    slug: { type: String, slug: 'title', unique: true },
}, {
    timestamps: true,
});
schema.index({ title: 'text', collections: 'text', tags: 'text', product_type: 'text' })

export const productModel = mongoose.model('Product', schema);
