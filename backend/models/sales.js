const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salesSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });

salesSchema.pre('save', function(next) {
    this.totalPrice = this.price * this.quantity;
    next();
});

module.exports = mongoose.model('Sales', salesSchema);

