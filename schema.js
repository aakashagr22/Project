const Joi = require('joi');

// const express = require('express');

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    location: Joi.string().required(),
    country: Joi.string().required().min(0),
    image: Joi.string().allow("",null)  
  })
});

// module.exports.listingSchema = Joi.object({
//     listing: Joi.object({
//       title: Joi.string().required(),
//       description: Joi.string().required(),
//       image: Joi.object({
//         filename: Joi.string(),
//         url: Joi.string().uri(),
//       }),
//       price: Joi.number().min(1).required(),
//       country: Joi.string().required(),
//       location: Joi.string().required(),
//     }).required(),
//   });
  

module.exports.reviewSchema = Joi.object({
    review:Joi.object({
        comment: Joi.string().required(),
        rating: Joi.number().min(1).max(5).required(),
    }).required()
});

