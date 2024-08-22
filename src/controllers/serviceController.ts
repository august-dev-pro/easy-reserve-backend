import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../utils/errorHandle";
import { serviceService } from "../services/serviceService";
import { IService } from "../models/ServiceModel";
import path from "path";

const getAllServices = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const services = await serviceService.getAll();
    if (services.length === 0) {
      return res.status(200).json({
        statutCode: 200,
        message: "aucun service trouvé",
        services: services,
      });
    }
    return res.status(200).json({
      statutCode: 200,
      message: "tous les services trouvés:",
      services: services,
    });
  } catch (error: any) {
    return next(
      new ErrorHandler(
        400,
        `une erreur s'est produite lors de la recuperation des services`,
        {
          errorMessage: error.message,
          stack: error.stack,
        }
      )
    );
  }
};
const getServiceById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const serviceId = req.params.serviceId;
  try {
    const service = await serviceService.getById(serviceId);
    if (!service) {
      return res.status(404).json({
        statusCode: 404,
        message: `service ${serviceId} non trouvé`,
      });
    }
    return res.status(200).json({
      status: 200,
      message: `service ${serviceId} a bien ete trouvé`,
      service: service,
    });
  } catch (error: any) {
    next(
      new ErrorHandler(
        400,
        `erreur lors de la recuperation du service ${serviceId}`,
        {
          errorMessage: error.message,
          stack: error.stack,
        }
      )
    );
  }
};
const updateService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const serviceId = req.params.serviceId;
  const newServiceData = req.body;
  try {
    const newService = await serviceService.update(serviceId, newServiceData);
    if (!newService) {
      return res.status(404).json({
        statusCode: 404,
        message: `service ${serviceId} non trouvé`,
      });
    }
    return res.status(200).json({
      statusCode: 200,
      message: `service ${serviceId} a bien ete mis a jour`,
    });
  } catch (error: any) {
    next(
      new ErrorHandler(
        400,
        `erreur lors de la mise a jour du service ${serviceId}`,
        {
          errorMessage: error.message,
          stack: error.stack,
        }
      )
    );
  }
};
const deleteOneService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const serviceId = req.params.serviceId;
  try {
    const service = await serviceService.deleteOne(serviceId);
    if (!service) {
      return res.status(404).json({
        statusCode: 404,
        message: `service ${serviceId} non trouvé`,
      });
    }
    return res.status(200).json({
      statusCode: 200,
      message: `service ${serviceId} a bien ete suprimé`,
    });
  } catch (error: any) {
    next(
      new ErrorHandler(400, ``, {
        errorMessage: error.message,
        stack: error.stack,
      })
    );
  }
};
const deleteManyService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const servicesIds: string[] = req.body;
  try {
    const services = await serviceService.deleteMany(servicesIds);
    if (!services) {
      return res.status(404).json({
        statusCode: 404,
        message: `les services ${servicesIds} n'ont pas ete trouvés`,
      });
    }

    return res.status(404).json({
      statusCode: 404,
      message: `les services ${servicesIds} ont bien ete suprimés`,
    });
  } catch (error: any) {
    next(
      new ErrorHandler(400, ``, {
        errorMessage: error.message,
        stack: error.stack,
      })
    );
  }
};
const createService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.file) {
    return next(new ErrorHandler(400, "Aucune image n'a été envoyée"));
  }
  const frontImage = req.file
    ? path.relative(process.cwd(), req.file.path)
    : ""; // Chemin du fichier stocké
  const serviceData = req.body;
  const serviceDatas: IService = { ...serviceData, frontImage: frontImage };

  try {
    const service = await serviceService.create(serviceDatas);
    return res.status(201).json({
      statusCode: 201,
      message: `la service a bien ete enregistré`,
      service: service,
    });
  } catch (error: any) {
    return next(
      new ErrorHandler(
        400,
        `une erreur s'est produite lors de la creation de la service`,
        {
          errorMessage: error.message,
          stack: error.stack,
        }
      )
    );
  }
};

export const serviceController = {
  getAllServices,
  getServiceById,
  updateService,
  deleteOneService,
  deleteManyService,
  createService,
};
