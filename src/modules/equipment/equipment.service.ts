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

const getEquipment = async () => {
  try {
    const equipment = await prisma.equipment.findMany();
    return equipment;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get equipment");
  }
};

const getEquipmentById = async (id: string) => {
  try {
    const equipment = await prisma.equipment.findUnique({
      where: { id },
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
