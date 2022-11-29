import { collectionModel } from '../Models/Collection.js';
import { productModel } from '../Models/Product.js';

class collection {
    // [GET]
    index(req, res, next) {
        res.send('collection all')
    }
    // [GET] collection page
    show(req, res, next) {
        collectionModel.findOne({ slug: req.params.slug })
            .then(collection => {
                if (!collection) {
                    return res.status(404).json('not found!!!')
                }
                res.json(collection)
            })
            .catch(next)
    }
}

export { collection };

