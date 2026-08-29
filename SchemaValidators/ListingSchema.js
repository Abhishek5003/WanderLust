const joi = require("joi");

module.exports.ListingSchema = joi.object({
  listing: joi
    .object({
      title: joi.string().required(),
      description: joi.string().required(),
      image: joi.string().allow("", null),
      price: joi.number().min(0).required(),
      location: joi.string().required(),
      country: joi.string().required(),
    })
    .required(),
});
