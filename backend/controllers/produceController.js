import Produce from "../models/Produce.js";

const createProduce = async (req, res) => {
    try {

        const { name, quantity, unit, price, location } = req.body;

        const produce = await Produce.create({
            farmer: req.user._id,
            name,
            quantity,
            unit,
            price,
            location
        });

        res.status(201).json({
            success: true,
            produce
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getProduce = async (req, res) => {
    try {

        const produce = await Produce.find({
            farmer: req.user._id
        });

        res.status(200).json({
            success: true,
            count: produce.length,
            produce
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const updateProduce = async (req, res) => {
    try {

        const { id } = req.params;

        const product = await Produce.findById(id);

        if (!product) {
            return res.status(404).json({
                message: "Produce not found"
            });
        }

        if (product.farmer.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Not authorized"
            });
        }

        const { name, quantity, unit, price, location, isAvailable } = req.body;

        if (name) product.name = name;
        if (quantity) product.quantity = quantity;
        if (unit) product.unit = unit;
        if (price) product.price = price;
        if (location) product.location = location;

        if (typeof isAvailable === "boolean") {
            product.isAvailable = isAvailable;
        }

        await product.save();

        res.status(200).json({
            success: true,
            message: "Produce updated",
            product
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const deleteProduce = async (req, res) => {
    try {

        const { id } = req.params;

        const product = await Produce.findById(id);

        if (!product) {
            return res.status(404).json({
                message: "Produce not found"
            });
        }

        if (product.farmer.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Not authorized"
            });
        }

        await product.deleteOne();

        res.status(200).json({
            success: true,
            message: "Produce deleted"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getAllProduce = async (req, res) => {
    try {
        const filter = { isAvailable: true };
        if (req.query.name) {
            filter.name = { $regex: req.query.name, $options: 'i' };
        }
        if (req.query.location) {
            filter.location = { $regex: req.query.location, $options: 'i' }
        }
        const produce = await Produce.find(filter).populate('farmer', 'name email');
        res.status(200).json({
            success: true,
            count: produce.length,
            produce
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const getSingleProduce = async (req, res) => {
    try {
        const produce = await Produce.findById(req.params.id).populate('farmer', 'name email');
        if (!produce) {
            return res.status(404).json({
                message: "Produce not found"
            });
        }
        res.status(200).json({
            success: true,
            produce
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}
export {
    createProduce,
    getProduce,
    updateProduce,
    deleteProduce,
    getAllProduce,
    getSingleProduce
};