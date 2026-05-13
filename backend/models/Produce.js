import mongoose from "mongoose";

const produceSchema = new mongoose.Schema(
    {
        farmer: { type: mongoose.Types.ObjectId, ref: "User", required: true },
        name : { type: String, required: true }, // common name of the produce (e.g., "Tomato", "Potato")
        quantity: { type: Number, required: true },
        // unit: { type: String, default: "kg" },
        price: { type: Number, required: true },
        location: { type: String, required: true },
        isAvailable: { type: Boolean, default: true },
        createdAt: { type: Date, default: Date.now }

    }
)
const Produce = mongoose.model("Produce", produceSchema);

export default Produce;