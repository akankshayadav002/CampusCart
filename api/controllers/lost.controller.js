import Lost from '../models/lost.model.js';
import { errorHandler } from '../utils/error.js';

export const createLost = async (req, res, next) => {
  try {
    const lost = await lost.create(req.body);
    return res.status(201).json(lost);
  } catch (error) {
    console.log("error",error)
    next(error);
  }
};


export const deleteLost = async (req, res, next) => {
  const lost = await lost.findById(req.params.id);

  if (!lost) {
    return next(errorHandler(404, 'Listing not found!'));
  }

  if (req.user.id !== lost.userRef) {
    return next(errorHandler(401, 'You can only delete your own listings!'));
  }

  try {
    await lost.findByIdAndDelete(req.params.id);
    res.status(200).json('Listing has been deleted!');
  } catch (error) {
    next(error);
  }
};

export const updateLost= async (req, res, next) => {
  const lost = await lost.findById(req.params.id);
  if (!lost) {
    return next(errorHandler(404, 'Listing not found!'));
  }
  if (req.user.id !== lost.userRef) {
    return next(errorHandler(401, 'You can only update your own listings!'));
  }

  try {
    const updatedLost = await lost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedLost);
  } catch (error) {
    next(error);
  }
};

export const getLost = async (req, res, next) => {
  try {
    const lost = await lost.findById(req.params.id);
    if (!lost) {
      return next(errorHandler(404, 'Listing not found!'));
    }
    res.status(200).json(lost);
  } catch (error) {
    next(error);
  }
};

export const getLosts = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    // let offer = req.query.offer;

    // if (offer === undefined || offer === 'false') {
    //   offer = { $in: [false, true] };
    // }

    // let furnished = req.query.furnished;

    // if (furnished === undefined || furnished === 'false') {
    //   furnished = { $in: [false, true] };
    // }

    // let parking = req.query.parking;

    // if (parking === undefined || parking === 'false') {
    //   parking = { $in: [false, true] };
    // }

    // let type = req.query.type;

    // if (type === undefined || type === 'all') {
    //   type = { $in: ['sale', 'rent'] };
    // }

    const searchTerm = req.query.searchTerm || '';

    const sort = req.query.sort || 'createdAt';

    const order = req.query.order || 'desc';

    const lost = await lost.find({
      name: { $regex: searchTerm, $options: 'i' },
      timestamp
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(lost);
  } catch (error) {
    next(error);
  }
};
