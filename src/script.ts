import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.create({
    data: {
      name: "yusuf",
      email: "yusuf@mail.com",
    },
  });

  console.log(`user (${JSON.stringify(user1)}) has been created`);

  const user2 = await prisma.user.create({
    data: {
      name: "alvian",
      email: "alvian@mail.com",
    },
  });

  console.log(`user (${JSON.stringify(user2)}) has been created`);

  const users = await prisma.user.findMany();

  console.log("users : ", JSON.stringify(users));

  //delete all user
  const deletedUsers = await prisma.user.deleteMany({
    where: {
      name: {
        in: ["yusuf", "alvian"],
      },
    },
  });

  console.log("amount of deleted users : ", JSON.stringify(deletedUsers));
}

main()
  .then(async () => {
    await prisma.$disconnect;
  })
  .catch(async () => {
    await prisma.$disconnect;
    process.exit(1);
  });
