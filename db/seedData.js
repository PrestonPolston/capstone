const fs = require("fs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

async function createIfNotExists(model, data) {
  const existingRecord = await prisma[model].findFirst({
    where: data,
  });

  if (!existingRecord) {
    if (data.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(data.password, salt);
      data.password = hashedPassword;
    }

    await prisma[model].create({
      data: data,
    });
    console.log(`Created ${model} record successfully.`);
  } else {
    console.log(`${model} record already exists. Skipping creation.`);
  }
}

function toBase64(imagePath) {
  const imageBuffer = fs.readFileSync(imagePath);
  const base64Image = Buffer.from(imageBuffer).toString("base64");
  return base64Image;
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
      image: toBase64("db/images/2x2AngleIron.jpeg"),
      description: "High-quality angle iron for various construction projects.",
      class: "Metal",
    },
    {
      name: "Metal Sheet",
      price: 7.99,
      image: toBase64("db/images/sheet.jpeg"),
      description: "Durable metal sheet for DIY projects.",
      class: "Metal",
    },
    {
      name: "Metal Rod",
      price: 5.99,
      image: toBase64("db/images/roundstock.webp"),
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
