import mongoose from "mongoose";
import ServiceModel, { IService } from "../models/ServiceModel";
import { ErrorHandler } from "../utils/errorHandle";

const getAll = async (): Promise<IService[]> => {
  try {
    const services = await ServiceModel.find();
    return services;
  } catch (error: any) {
    throw new ErrorHandler(400, "erreur lors de la recuperation des services", {
      errorMessage: error.message,
      stack: error.stack,
    });
  }
};
const getById = async (serviceId: string): Promise<IService | null> => {
  try {
    const service = await ServiceModel.findById(serviceId);
    return service;
  } catch (error: any) {
    throw new ErrorHandler(
      400,
      `erreur lors de la recuperation du service: ${serviceId}`,
      {
        errorMessage: error.message,
        stack: error.stack,
      }
    );
  }
};
const update = async (
  serviceId: string,
  newServiceData: IService
): Promise<IService | null> => {
  try {
    const newService = await ServiceModel.findByIdAndUpdate(
      serviceId,
      newServiceData
    );
    return newService;
  } catch (error: any) {
    throw new ErrorHandler(400, "erreur lors de la mise a jour du service", {
      erroMessage: error.message,
      stack: error.stack,
    });
  }
};
const deleteOne = async (serviceId: string): Promise<IService | null> => {
  try {
    const service = await ServiceModel.findByIdAndDelete(serviceId);
    return service;
  } catch (error: any) {
    throw new ErrorHandler(400, "erreur lors de la supression du service", {
      erroMessage: error.message,
      stack: error.stack,
    });
  }
};
const deleteMany = async (
  servicesIds: string[]
): Promise<IService[] | null> => {
  try {
    // Utiliser $in pour trouver les utilisateurs avec les IDs spécifiés
    const result = await ServiceModel.deleteMany({
      _id: {
        $in: servicesIds.map((id: string) => new mongoose.Types.ObjectId(id)),
      },
    });

    // Vérifier combien de documents ont été supprimés
    if (result.deletedCount === 0) {
      throw new ErrorHandler(500, "No comment were deleted");
    }

    return result.deletedCount > 0
      ? await ServiceModel.find({
          _id: {
            $in: servicesIds.map((id) => new mongoose.Types.ObjectId(id)),
          },
        })
      : null;
  } catch (error: any) {
    throw new ErrorHandler(400, "erreur lors de la supression des service", {
      errorMessage: error.message,
      stack: error.stack,
    });
  }
};
const create = async (serviceData: IService): Promise<IService | null> => {
  try {
    const service = await ServiceModel.create(serviceData);
    return service;
  } catch (error: any) {
    throw new ErrorHandler(400, `erreur lors de la creation du service`, {
      errorMessage: error.message,
      stack: error.stack,
    });
  }
};
export const serviceService = {
  getAll,
  getById,
  update,
  deleteMany,
  deleteOne,
  create,
};
