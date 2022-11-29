import { userModel } from '../Models/User.js';
import { productModel } from '../Models/Product.js';
import { collectionModel } from '../Models/Collection.js'

class dashboard {
    //[GET]
    getProducts(req, res, next) {
        productModel.find({})
            .then((products) => {
                res.json(products);
            })
            .catch(next)
    }

    //[POST]
    createProduct(req, res, next) {
        const product = new productModel(req.body);
        product.save()
            .then((updatedProduct) => {
                const collections = req.body.collections.split(',');
                return collectionModel.findOneAndUpdate({ title: collections[0] }, { $push: { products: updatedProduct }, $inc: { product_count: 1 } })
            })
            .then(() => console.log('product has been created'))
            .catch(next);
    }

    //[POST]
    editProduct(req, res, next) {
        console.log(req)
        const productID = req.body.product._id;
        const productSlug = req.body.product.slug;
        const collection = req.body.product.collections[0];
        //Process: 1 (find this product in db) 2// check if collection is changed 3// if the collection is not changed => update this product. Otherwise: update the product and update collection
        (async function () {
            try {
                const product = await productModel.findById(productID);
                const updatedCollection = req.body.product.collections[0];
                const currentCollection = product.collections[0];
                const isCollectionUnchanged = updatedCollection === currentCollection;
                if (isCollectionUnchanged) {
                    await productModel.updateOne({ slug: req.body.product.slug }, req.body.product);
                    await collectionModel.findOneAndUpdate(
                        { title: collection, 'products.slug': productSlug },
                        { '$set': { 'products.$[]': req.body.product } },
                        { new: true }
                    );

                } else {
                    await productModel.updateOne({ slug: req.body.product.slug }, req.body.product);
                    await collectionModel.findOneAndUpdate({ title: currentCollection }, { $pull: { products: { slug: productSlug } }, $inc: { product_count: -1 } });
                    await collectionModel.findOneAndUpdate({ title: updatedCollection }, { $push: { products: req.body.product }, $inc: { product_count: 1 } })
                }
            } catch (error) {
                console.log(error)
            }
        })()

    }

    //[POST]
    destroyProduct(req, res, next) {
        const collection = req.query.product.collections[0]
        const productID = req.query.product.slug;
        productModel.deleteOne({ slug: productID })
            .then((data) => {
                res.status(200).json(data)
                return collectionModel.findOneAndUpdate({ title: collection }, { $pull: { products: { slug: productID } }, $inc: { product_count: -1 } })
            })
            .then(() => console.log('Deleted product and deleted product in the collections product field'))
            .catch(next);

    }

    //[GET]
    getCollections(req, res, next) {
        collectionModel.find({})
            .then((collections) => {
                res.json(collections);
            })
            .catch(next)
    }

    //[POST]
    async createCollection(req, res, next) {
        try {
            const collection = new collectionModel(req.body);
            const isCollectionExist = await collectionModel.findOne({ title: collection.title });
            if (!isCollectionExist) {
                await collection.save();
                console.log('Collection has been created');
                res.status(200).json('Collection has been created')
            } else {
                console.log('This collection is existed!!! Please check it again.');
                res.status(400).json('This collection is existed!!! Please check it again.');
            }
        } catch (error) {
            console.log(error)
        }
    }

    //[POST]
    editCollection(res, req) {

    }
    //[GET]
    getUsers(req, res, next) {
        userModel.find({})
            .then((users) => {
                res.json(users);
            })
            .catch(next)
    }

    //[POST]
    async editUser(req, res) {
        try {
            const userID = req.body._id;
            const result = await userModel.updateOne({ _id: userID }, req.body);
            console.log(result);
            res.status(200).json('This user has been updated');
        } catch (error) {
            res.status(400).json(error)
        }
    }

    //[PATCH]
    destroyUser(req, res, next) {
        userModel.deleteOne({ _id: req.query.user._id })
            .then(() => {
                res.status(200).json('This user has been deleted!');
            })
            .catch(next);
    }
}

export { dashboard };

//Design new DB


