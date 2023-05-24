"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("@/server/prisma");
exports.default = async (req, res) => {
    const userCount = await prisma_1.prisma.user.count();
    const batchSize = 128;
    let skip = 0;
    const takeSnapshot = async () => {
        const users = await prisma_1.prisma.user.findMany({
            take: batchSize,
            skip,
        });
        skip += batchSize;
        for await (const user of users) {
            await prisma_1.prisma.dailyExperience.create({
                data: {
                    userId: user.id,
                    experience: user.experience,
                },
            });
        }
        if (skip < userCount) {
            await takeSnapshot();
        }
    };
    await takeSnapshot();
    return res.status(200).json({
        processed: userCount,
    });
};
