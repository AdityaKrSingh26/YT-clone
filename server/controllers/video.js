import User from "../models/User.js";
import Video from "../models/Video.js";
import { createError } from "../error.js";


export const addVideo = async (req, res, next) => {
  const newVideo = new Video({ userId: req.user.id, ...req.body });
  try {
    
    const savedVideo = await newVideo.save();
    res.status(200).json(savedVideo);

  } catch (err) {
    console.log("Error in addVideo \n" + err);
    next(err);
  }
};

export const updateVideo = async (req, res, next) => {
  try {

    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found!"));

    if (req.user.id === video.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedVideo);

    } else {
      return next(createError(403, "You can update only your video!"));
    }

  } catch (err) {
    console.log("Error in updateVideo \n" + err);
    next(err);
  }
};

export const deleteVideo = async (req, res, next) => {
  try {

    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found!"));
    
    if (req.user.id === video.userId) {
      await Video.findByIdAndDelete(req.params.id);
      res.status(200).json("The video has been deleted.");

    } else {
      return next(createError(403, "You can delete only your video!"));
    }

  } catch (err) {
    console.log("Error in deleteVideo \n" + err);
    next(err);
  }
};

export const getVideo = async (req, res, next) => {
  try {

    console.log("req.params.id" + req.params.id);
    const video = await Video.findById(req.params.id);
    console.log("video" + video);
    res.status(200).json(video);

  } catch (err) {
    console.log("Error in getVideo \n" + err);
    next(err);
  }
};

export const addView = async (req, res, next) => {
  try {

    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    res.status(200).json("The view has been increased.");

  } catch (err) {
    console.log("Error in addView \n" + err);
    next(err);

  }
};

export const random = async (req, res, next) => {
  try {

    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json(videos);

  } catch (err) {
    console.log("Error in random \n" + err);
    next(err);
  }
};

export const trend = async (req, res, next) => {
  try {

    const videos = await Video.find().sort({ views: -1 });
    res.status(200).json(videos);

  } catch (err) {
    console.log("Error in trend \n" + err);
    next(err);
  }
};

export const sub = async (req, res, next) => {
  try {

    const user = await User.findById(req.user.id);
    const subscribedChannels = user.subscribedUsers;

    const list = await Promise.all(
      subscribedChannels.map(async (channelId) => {
        return await Video.find({ userId: channelId });
      })
    );

    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));

  } catch (err) {
    console.log("Error in sub \n" + err);
    next(err);
  }
};

export const getByTag = async (req, res, next) => {
  const tags = req.query.tags.split(",");
  try {

    const videos = await Video.find({ tags: { $in: tags } }).limit(20);
    res.status(200).json(videos);

  } catch (err) {
    console.log("Error in getByTag \n" + err);
    next(err);
  }
};

export const search = async (req, res, next) => {
  const query = req.query.q;
  try {

    const videos = await Video.find({
      title: { $regex: query, $options: "i" },
    }).limit(40);
    res.status(200).json(videos);

  }catch (err) {
    console.log("Error in search \n" + err);
    next(err);
  }
};
