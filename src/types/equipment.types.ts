import { Prisma } from "../generated/prisma/client";
import { EquipmentStatus } from "../generated/prisma/enums";

export type CreateEquipmentPayload = {
  name: string;
  serialNumber: string;
  status?: EquipmentStatus;
  location: string;
  metadata?: Prisma.InputJsonValue;
};
