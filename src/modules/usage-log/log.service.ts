import { prisma } from "../../lib/prisma";
import { CreateUsageLogPayload } from "../../types/usageLog.types";



const createLog = async (payload: CreateUsageLogPayload) => {
    try {
        const log = await prisma.usageLog.create({
            data: payload,
        });
        return log;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to create log");
    }
};


const getLogs = async () => {
    try {
        const logs = await prisma.usageLog.findMany({
            include: {user: true, equipment: true},
        });
        return logs;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to get logs");
    }
};



export const logService = {
    createLog,
    getLogs
};