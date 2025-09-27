const foodPartnerModel = require('../models/foodpartner.model')
const foodModel = require('../models/food.model')

async function getFoodPartnerById(req, res) {
    const foodPartnerId = req.params.id;

    // Find the food partner
    const foodPartner = await foodPartnerModel.findById(foodPartnerId)
    if (!foodPartner) {
        return res.status(404).json({ message: "Food partner not found" })
    }

    // Find food items for this partner
    const foodItemByFoodPartner = await foodModel.find({ foodPartner: foodPartner._id })

    // Return combined data
    res.status(200).json({
        message: "Food partner retrieved successfully",
        foodPartner: {
            ...foodPartner.toObject(),
            foodItems: foodItemByFoodPartner
        }
    })
}

module.exports = {
    getFoodPartnerById
}
