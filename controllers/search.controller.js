import { productModel } from '../Models/Product.js'

class search {
    // [GET]
    index(req, res, next) {
        let searchTerm = req.query.q;
        productModel.find({ $text: { $search: searchTerm } })
            .then(products => {
                res.json(products);
            })
            .catch(next)
    }
}

export { search };

