import mongoose from "mongoose";
import TaskerSpecificsModel, {
  ITaskerSpecifics,
} from "../models/taskerSpecificsModel";
import { ErrorHandler } from "../utils/errorHandle";

const create = async (
  taskerSpecificsData: ITaskerSpecifics
): Promise<ITaskerSpecifics | null> => {
  try {
    const taskerSpecifics = await TaskerSpecificsModel.create(
      taskerSpecificsData
    );
    return taskerSpecifics;
  } catch (error: any) {
    throw new ErrorHandler(
      400,
      `erreur lors de la creation de taskerSpecifics`,
      {
        statusCode: 400,
        errorMessage: error.message,
        stack: error.stack,
      }
    );
  }
};
const update = async (
  taskerSpecificsId: string,
  newTaskerSpecificsData: ITaskerSpecifics
): Promise<ITaskerSpecifics | null> => {
  try {
    const newTaskerSpecifics = await TaskerSpecificsModel.findByIdAndUpdate(
      taskerSpecificsId,
      newTaskerSpecificsData
    );
    return newTaskerSpecifics;
  } catch (error: any) {
    throw new ErrorHandler(
      400,
      `erreur lors de la mise a jour de taskerSpecifics ${taskerSpecificsId}`,
      {
        statusCode: 400,
        errorMessage: error.message,
        stack: error.stack,
      }
    );
  }
};
const getAll = async (): Promise<ITaskerSpecifics[]> => {
  try {
    const allTaskerSpecifics = await TaskerSpecificsModel.find();
    return allTaskerSpecifics;
  } catch (error: any) {
    throw new ErrorHandler(
      400,
      `erreur lors de  la recuperation des taskerSpecifics`,
      {
        statusCode: 400,
        errorMessage: error.message,
        stack: error.stack,
      }
    );
  }
};
const getById = async (
  taskerSpecificsId: string
): Promise<ITaskerSpecifics | null> => {
  try {
    const taskerSpecifics = await TaskerSpecificsModel.findById(
      taskerSpecificsId
    );
    return taskerSpecifics;
  } catch (error: any) {
    throw new ErrorHandler(
      400,
      `erreur lors de recuperation de taskerSpecifics: ${taskerSpecificsId}`,
      {
        statusCode: 400,
        errorMessage: error.message,
        stack: error.stack,
      }
    );
  }
};
const deleteOne = async (
  taskerSpecificsId: string
): Promise<ITaskerSpecifics | null> => {
  try {
    const deletedTaskerSpecifics =
      TaskerSpecificsModel.findByIdAndDelete(taskerSpecificsId);
    return deletedTaskerSpecifics;
  } catch (error: any) {
    throw new ErrorHandler(
      400,
      `erreur lors de la supression de taskerSpecifics: ${taskerSpecificsId}`,
      {
        statusCode: 400,
        errorMessage: error.message,
        stack: error.stack,
      }
    );
  }
};
const deleteMany = async (
  taskerSpecificsIds: string[]
): Promise<ITaskerSpecifics[] | null> => {
  try {
    const result = await TaskerSpecificsModel.deleteMany({
      _id: {
        $in: taskerSpecificsIds.map((id) => new mongoose.Types.ObjectId(id)),
      },
    });
    if (result.deletedCount === 0) {
      throw new ErrorHandler(500, "No reservation were deleted");
    }

    return result.deletedCount > 0
      ? await TaskerSpecificsModel.find({
          _id: {
            $in: taskerSpecificsIds.map(
              (id) => new mongoose.Types.ObjectId(id)
            ),
          },
        })
      : null;
  } catch (error: any) {
    throw new ErrorHandler(
      400,
      `erreur lors de la supression des taskerSpecifics: ${taskerSpecificsIds}`,
      {
        statusCode: 400,
        errorMessage: error.message,
        stack: error.stack,
      }
    );
  }
};

export const taskerSpecificsService = {
  create,
  update,
  getAll,
  getById,
  deleteMany,
  deleteOne,
};
