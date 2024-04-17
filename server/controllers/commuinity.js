import User from "../models/User";
import Community from "../models/Community";
import { createError } from "../error.js";

const addPost = async (req, res, next) => {
    try {

        const { title, description } = req.body

    } catch (error) {
        console.log(error);
        next(error);
    }
}

const getAllPost = async (req, res, next) => {
    try {

    } catch (error) {
        console.log(error);
        next(error);
    }
}

const updatePost = async (req, res, next) => {
    try {

    } catch (error) {
        console.log(error);
        next(error);
    }
}

const deletePost = async (req, res, next) => {
    try {

    } catch (error) {
        console.log(error);
        next(error);
    }
}

const likePost = async (req, res, next) => {
    try {

    } catch (error) {
        console.log(error);
        next(error);
    }
}

const dislikePost = async (req, res, next) => {
    try {

    } catch (error) {
        console.log(error);
        next(error);
    }
}



export {
    addPost,
    updatePost,
    deletePost,
    likePost,
    dislikePost,
    getAllPost,
}