export type CreateUsageLogPayload = {
  userId: string;
  equipmentId: string;
  startTime: string;
  endTime?: string;
  purpose: string;
  notes?: string;
};