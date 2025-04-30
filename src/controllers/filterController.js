const { Product } = require('../models');

module.exports.getFilteredProducts = async (req, res) => {
  try {
    const { brand, color, price, size, material } = req.body;

    const whereCondition = {};
    if (brand) whereCondition.brand = brand;
    if (color) whereCondition.color = color;
    if (price) whereCondition.price = price;
    if (size) whereCondition.size = size;
    if (material) whereCondition.material = material;

    const products = await Product.findAll({
      where: whereCondition
    });

    if (!products.length) {
      return res.status(404).json({ msg: 'No products found with the given filters.' });
    }

    res.status(200).json({ data: products });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Something Went Wrong !!" });
  }
};
