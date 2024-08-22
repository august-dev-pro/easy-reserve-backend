import ServiceOptionModel, {
  IServiceOption,
} from "../models/serviceOptionModel";
import { ErrorHandler } from "../utils/errorHandle";

const create = async (data: IServiceOption): Promise<IServiceOption | null> => {
  try {
    const serviceOption = await ServiceOptionModel.create(data);
    return serviceOption;
  } catch (error: any) {
    throw new ErrorHandler(400, "Error creating service option", {
      errorMessage: error.message,
      stack: error.stack,
    });
  }
};

const getAll = async (): Promise<IServiceOption[]> => {
  try {
    const servicesOptions = await ServiceOptionModel.find();
    return servicesOptions;
  } catch (error: any) {
    throw new ErrorHandler(500, "Error retrieving service options", {
      errorMessage: error.message,
      stack: error.stack,
    });
  }
};
const getById = async (
  serviceOptionId: string
): Promise<IServiceOption | null> => {
  try {
    const serviceOption = await ServiceOptionModel.findById(serviceOptionId);
    return serviceOption;
  } catch (error: any) {
    throw new ErrorHandler(500, "Error retrieving service options", {
      errorMessage: error.message,
      stack: error.stack,
    });
  }
};

const update = async (
  id: string,
  data: any
): Promise<IServiceOption | null> => {
  try {
    const serviceOption = await ServiceOptionModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return serviceOption;
  } catch (error: any) {
    throw new ErrorHandler(400, "Error updating service option", {
      errorMessage: error.message,
      stack: error.stack,
    });
  }
};

const deleteOne = async (id: string): Promise<IServiceOption | null> => {
  try {
    const serviceOption = await ServiceOptionModel.findByIdAndDelete(id);
    return serviceOption;
  } catch (error: any) {
    throw new ErrorHandler(400, "Error deleting service option", {
      errorMessage: error.message,
      stack: error.stack,
    });
  }
};

export const serviceOptionService = {
  create,
  getAll,
  update,
  deleteOne,
  getById,
};
