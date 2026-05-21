import { Prisma, EquipmentStatus } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

type CreateEquipmentPayload = {
  name: string;
  serialNumber: string;
  status?: EquipmentStatus;
  location: string;
  metadata?: Prisma.InputJsonValue;
};

const createEquipment = async (payload: CreateEquipmentPayload) => {
  try {
    const equipment = await prisma.equipment.create({
      data: payload,
    });
    return equipment;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create equipment");
  }
};

const getEquipment = async (status: EquipmentStatus) => {
  try {
    const equipment = await prisma.equipment.findMany({
      where: {
        status: status,
      },
    });
    return equipment;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get equipment");
  }
};

const getEquipmentById = async (id: string) => {
  try {
    console.log("id:", id);
    const equipment = await prisma.equipment.findUnique({
      where: { id },
      include:{
        usageLogs: true
      }
    });

    if (!equipment) {
      throw new Error("Equipment not found");
    }

    return equipment;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get equipment");
  }
};

export const equipmentService = {
  createEquipment,
  getEquipment,
  getEquipmentById,
};
