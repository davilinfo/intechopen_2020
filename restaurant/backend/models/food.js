const FoodSchema = {
    name: String,
    description: String,
    amount: Number,
    table: Number,
    request_type: Number,
    user_id: Number,
    img: String,
    closed: Boolean,
    discount: Number
};

module.exports = FoodSchema;