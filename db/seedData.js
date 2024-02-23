const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createIfNotExists(model, data) {
  const existingRecord = await prisma[model].findFirst({
    where: data,
  });

  if (!existingRecord) {
    await prisma[model].create({
      data: data,
    });
    console.log(`Created ${model} record successfully.`);
  } else {
    console.log(`${model} record already exists. Skipping creation.`);
  }
}

async function main() {
  await createIfNotExists("users", {
    username: "preston94",
    password: "password123",
    firstName: "Preston",
    lastName: "Polston",
    email: "preston@email.com",
    admin: true,
  });

  // Products data
  const products = [
    {
      name: '2" x 2" Angle Iron',
      price: 10.99,
      image: "",
      description: "High-quality angle iron for various construction projects.",
      class: "Metal",
    },
    {
      name: "Metal Sheet",
      price: 7.99,
      image: "",
      description: "Durable metal sheet for DIY projects.",
      class: "Metal",
    },
    {
      name: "Metal Rod",
      price: 5.99,
      image: "",
      description: "Flexible and sturdy metal rod for crafting.",
      class: "Metal",
    },
    // more products coming soon
  ];

  for (const product of products) {
    await createIfNotExists("product", product);
  }

  console.log("Seed data creation complete.");

  await prisma.$disconnect();
}

main().catch((e) => {
  throw e;
});
