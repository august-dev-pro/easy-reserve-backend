import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "../utils/errorHandle";
import { serviceOptionService } from "../services/serviceOptionService";
import { IServiceOption } from "../models/serviceOptionModel";
import path from "path";

const createServiceOption = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const image = req.file ? path.relative(process.cwd(), req.file.path) : "";
    const serviceOptionData: IServiceOption = { ...req.body, image: image };
    const serviceOption = await serviceOptionService.create(serviceOptionData);
    return res.status(201).json({
      statusCode: 201,
      message: "Service option created successfully",
      serviceOption: serviceOption,
    });
  } catch (error: any) {
    next(
      new ErrorHandler(400, "Error creating service option", {
        errorMessage: error.message,
        stack: error.stack,
      })
    );
  }
};

const getAllServiceOptions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const serviceOptions = await serviceOptionService.getAll();
    return res.status(200).json({
      statusCode: 200,
      serviceOptions,
    });
  } catch (error: any) {
    next(
      new ErrorHandler(500, "Error retrieving service options", {
        errorMessage: error.message,
        stack: error.stack,
      })
    );
  }
};

const updateServiceOption = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const image = req.file ? req.file.path : "";

    const serviceOption = await serviceOptionService.update(id, {
      title,
      description,
      image,
    });

    if (!serviceOption) {
      return next(new ErrorHandler(404, "Service option not found"));
    }

    return res.status(200).json({
      statusCode: 200,
      message: "Service option updated successfully",
      serviceOption,
    });
  } catch (error: any) {
    next(
      new ErrorHandler(400, "Error updating service option", {
        errorMessage: error.message,
        stack: error.stack,
      })
    );
  }
};

const deleteServiceOption = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const serviceOption = await serviceOptionService.deleteOne(id);

    if (!serviceOption) {
      return next(new ErrorHandler(404, "Service option not found"));
    }

    return res.status(200).json({
      statusCode: 200,
      message: "Service option deleted successfully",
      serviceOption,
    });
  } catch (error: any) {
    next(
      new ErrorHandler(400, "Error deleting service option", {
        errorMessage: error.message,
        stack: error.stack,
      })
    );
  }
};

export const serviceOptionController = {
  createServiceOption,
  getAllServiceOptions,
  updateServiceOption,
  deleteServiceOption,
};
