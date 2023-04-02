import {prisma} from "@/server/prisma";
import {NextApiRequest, NextApiResponse} from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const userCount = await prisma.user.count();
    const batchSize = 128;

    let skip = 0;
   const takeSnapshot = async () => {
       const users = await prisma.user.findMany({
           take: batchSize,
           skip
       });

       skip += batchSize;

       for await (const user of users) {
           await prisma.dailyExperience.create({
               data: {
                   userId: user.id,
                   experience: user.experience
               }
           });
       }

       if (skip < userCount){
           await takeSnapshot();
       }
   }

   await takeSnapshot();
   return res.status(200).json({
       processed: userCount,
   });
}