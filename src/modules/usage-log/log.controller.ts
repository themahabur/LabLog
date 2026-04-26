import { logService } from "./log.service";
import { Request, Response } from "express";

const createLog = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const log = await logService.createLog(payload);
    res.status(201).json({message: "Log created successfully", data: log});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create log", error: error });
  }
};

const getLogs = async (req: Request, res: Response) => {
  try {
    const logs = await logService.getLogs();
    res.status(200).json({message: "Logs retrieved successfully", data: logs});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get logs", error: error });
  }
};

export const logController = {
  createLog,
  getLogs
};
