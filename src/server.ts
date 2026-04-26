import app from "./app";
import { prisma } from "./lib/prisma";

const PORT = process.env.PORT || 5000;

const server = async () => {
  try {
    await prisma.$connect();
    console.log("Connected to the database successfully.");

    app.get("/", (req, res) => {
      res.send("Hello Welcome to LabLog API");
    });
    app.listen(PORT, () => {
      console.log(`Server is running on port: http://localhost:${PORT}`);
    });
  } catch (error) {
    await prisma.$disconnect();
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  }
};

server();
