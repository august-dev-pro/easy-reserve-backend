import { IComment } from "../models/commentModel";

const createComment = async (data: IComment) => {};
const updateComment = async (data: IComment) => {};
const getComment = async (commentId: string) => {};
const deleteComment = async (commentId: string) => {};

const commentService = {
  createComment,
  updateComment,
  getComment,
  deleteComment,
};

export default commentService;
