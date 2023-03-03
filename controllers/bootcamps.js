const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Bootcamp = require("../models/Bootcamps");

//@desc     Get all bootcamps
//@route    GET /api/v1/bootcamps
//@access   Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamps = await Bootcamp.find();

  res
    .status(200)
    .json({ success: true, count: bootcamps.length, data: bootcamps });
});

//@desc     Get single bootcamps
//@route    GET /api/v1/bootcamps/:id
//@access   Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(err);
  }

  res.status(200).json({ success: true, data: bootcamp });
});

//@desc     Create bootcamps
//@route    POST /api/v1/bootcamps/:id
//@access   Private
exports.createBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);

  res.status(201).json({
    success: true,
    data: bootcamp,
  });
});

//@desc     update bootcamps
//@route    PUT /api/v1/bootcamps/:id
//@access   Private
exports.updateBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!bootcamp) {
    return res.status(400).json({ success: false });
  }

  res.status(200).json({ success: true, data: bootcamp });
});

//@desc     delete bootcamps
//@route    DELETE /api/v1/bootcamps/:id
//@access   Private
exports.deleteBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

  if (!bootcamp) {
    return res.status(400).json({ success: true, data: {} });
  }
  res.status(200).json({ success: false });
});
