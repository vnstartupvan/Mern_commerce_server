import { productModel } from '../Models/Product.js'

class product {
    // [GET]
    index(req, res, next) {
        productModel.findOne({ slug: req.params.slug })
            .then(product => {
                res.json(product);
            })
            .catch(next)
    }
}

export { product };

