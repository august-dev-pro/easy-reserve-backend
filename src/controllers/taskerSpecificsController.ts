import { NextFunction, Request, Response } from "express";
import { taskerSpecificsService } from "../services/taskerSpecificsService";
import { ErrorHandler } from "../utils/errorHandle";
import { ITaskerSpecifics } from "../models/taskerSpecificsModel";

const createTaskerSpecifics = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const taskerSpecificsData: ITaskerSpecifics = req.body;
  try {
    const taskerSpecifics = await taskerSpecificsService.create(
      taskerSpecificsData
    );
    return res.status(201).json({
      statusCode: 201,
      message: `taskerSpecifics bien enregistré avec _id: ${taskerSpecifics?._id}`,
      taskerSpecifics: taskerSpecifics,
    });
  } catch (error: any) {
    return next(
      new ErrorHandler(400, `erreur lors de la creation de taskerSpecifics`, {
        statusCode: 400,
        errorMessage: error.message,
        stack: error.stack,
      })
    );
  }
};
const updateTaskerSpecifics = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const taskerSpecificsId = req.params.id;
  const newTaskerSpecificsData: ITaskerSpecifics = req.body;
  try {
    const newTaskerSpecifics = await taskerSpecificsService.update(
      taskerSpecificsId,
      newTaskerSpecificsData
    );
    if (!newTaskerSpecifics) {
      return res.status(404).json({
        statusCode: 404,
        message: `taskerSpecifics ${taskerSpecificsId} n'a pas ete trouvé`,
      });
    }
    return res.status(200).json({
      statusCode: 200,
      message: `taskerSpecifics ${taskerSpecificsId} a bien ete trouvé`,
      newTaskerSpecifics: newTaskerSpecifics,
    });
  } catch (error: any) {
    return next(
      new ErrorHandler(
        400,
        `erreur lors de la mise a jour de taskerSpecifics ${taskerSpecificsId}`,
        {
          statusCode: 400,
          errorMessage: error.message,
          stack: error.stack,
        }
      )
    );
  }
};
const getAllTaskerSpecifics = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allTaskerSpecifics = await taskerSpecificsService.getAll();
    if (allTaskerSpecifics.length === 0) {
      return res.status(200).json({
        statusCode: 200,
        message: `aucun taskerSpecifics trouvé`,
      });
    }
    return res.status(200).json({
      statusCode: 200,
      message: `les taskerSpecifics ont bien ete recuperés`,
      allTaskerSpecifics: allTaskerSpecifics,
    });
  } catch (error: any) {
    return next(
      new ErrorHandler(
        400,
        `erreur lors de  la recuperation des taskerSpecifics`,
        {
          statusCode: 400,
          errorMessage: error.message,
          stack: error.stack,
        }
      )
    );
  }
};
const getTaskerSpecificsById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const taskerSpecificsId = req.params.id;
  try {
    const taskerSpecifics = await taskerSpecificsService.getById(
      taskerSpecificsId
    );
    if (!taskerSpecifics) {
      return res.status(404).json({
        statusCode: 404,
        message: `taskerSpecifics ${taskerSpecificsId} non trouvé`,
      });
    }
    return res.status(200).json({
      statusCode: 200,
      message: `taskerSpecifics ${taskerSpecificsId} a bien ete recuperé`,
      taskerSpecifics: taskerSpecifics,
    });
  } catch (error: any) {
    return next(
      new ErrorHandler(
        400,
        `erreur lors de recuperation de taskerSpecifics: ${taskerSpecificsId}`,
        {
          statusCode: 400,
          errorMessage: error.message,
          stack: error.stack,
        }
      )
    );
  }
};
const deleteOneTaskerSpecifics = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const taskerSpecificsId = req.params.id;
  try {
    const deletedTaskerSpecifics = await taskerSpecificsService.deleteOne(
      taskerSpecificsId
    );
    if (!deletedTaskerSpecifics) {
      return res.status(404).json({
        statusCode: 404,
        message: `taskerSpecifics ${taskerSpecificsId} non trouvé`,
      });
    }
    return res.status(200).json({
      statusCode: 200,
      message: `taskerSpecifics ${taskerSpecificsId} a bien ete suprimé`,
      deletedTaskerSpecifics: deletedTaskerSpecifics,
    });
  } catch (error: any) {
    return next(
      new ErrorHandler(
        400,
        `erreur lors de la supression de taskerSpecifics: ${taskerSpecificsId}`,
        {
          statusCode: 400,
          errorMessage: error.message,
          stack: error.stack,
        }
      )
    );
  }
};
const deleteManyTaskerSpecifics = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const taskerSpecificsIds: string[] = req.body;
  try {
    const deletedTaskerSpecifics = await taskerSpecificsService.deleteMany(
      taskerSpecificsIds
    );
    if (!deletedTaskerSpecifics) {
      return res.status(404).json({
        statusCode: 404,
        message: `taskerSpecifics ${taskerSpecificsIds} non trouvés`,
      });
    }
    return res.status(200).json({
      statusCode: 200,
      message: `taskerSpecifics ${taskerSpecificsIds} ont bien ete suprimés`,
      deletedTaskerSpecifics: deletedTaskerSpecifics,
    });
  } catch (error: any) {
    return next(
      new ErrorHandler(
        400,
        `erreur lors de la supression des taskerSpecifics: ${taskerSpecificsIds}`,
        {
          statusCode: 400,
          errorMessage: error.message,
          stack: error.stack,
        }
      )
    );
  }
};

export const taskerSpecificsController = {
  createTaskerSpecifics,
  updateTaskerSpecifics,
  deleteManyTaskerSpecifics,
  deleteOneTaskerSpecifics,
  getAllTaskerSpecifics,
  getTaskerSpecificsById,
};
