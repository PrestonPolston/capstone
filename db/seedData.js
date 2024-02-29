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

  await createIfNotExists("users", {
    username: "john_doe",
    password: "password123",
    firstName: "John",
    lastName: "Doe",
    email: "john_doe@email.com",
    admin: false,
  });
  await createIfNotExists("users", {
    username: "jane_smith",
    password: "password123",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane_smith@email.com",
    admin: false,
  });
  await createIfNotExists("users", {
    username: "alice_smith",
    password: "password123",
    firstName: "Alice",
    lastName: "Smith",
    email: "alice@email.com",
    admin: false,
  });
  await createIfNotExists("users", {
    username: "bob_james",
    password: "password123",
    firstName: "Bob",
    lastName: "James",
    email: "bob@email.com",
    admin: false,
  });

  const reviews = [
    {
      content: "Great quality and durable. Highly recommended.",
      rating: 4,
      userId: 1,
      productId: 1,
    },
    {
      content: "Perfect for my DIY projects. Excellent product!",
      rating: 5,
      userId: 2,
      productId: 2,
    },
    {
      content: "Decent quality, but could be sturdier.",
      rating: 3,
      userId: 3,
      productId: 3,
    },
    {
      content: "Sturdy and reliable brackets. Good for construction work.",
      rating: 4,
      userId: 4,
      productId: 4,
    },
    {
      content: "High-grade steel nails that get the job done perfectly.",
      rating: 5,
      userId: 5,
      productId: 5,
    },
  ];

  // Products data
  const products = [
    {
      name: '2" x 2" Angle Iron',
      price: 10.99,
      image: toBase64("db/images/2x2AngleIron.jpeg"),
      description: "High-quality angle iron for various construction projects.",
      class: "Metal",
      quantity: 25,
    },
    {
      name: "Metal Sheet",
      price: 7.99,
      image: toBase64("db/images/sheet.jpeg"),
      description: "Durable metal sheet for DIY projects.",
      class: "Metal",
      quantity: 25,
    },
    {
      name: "Metal Rod",
      price: 5.99,
      image: toBase64("db/images/roundstock.webp"),
      description: "Flexible and sturdy metal rod for crafting.",
      class: "Metal",
      quantity: 25,
    },
    {
      name: "Metal Brackets",
      price: 6.49,
      image: toBase64("db/images/metal_brackets.jpeg"),
      description: "Sturdy metal brackets for carpentry and construction.",
      class: "Metal",
      quantity: 25,
    },
    {
      name: "Steel Nails",
      price: 3.99,
      image: toBase64("db/images/steel_nails.jpeg"),
      description: "High-grade steel nails for various projects.",
      class: "Fasteners",
      quantity: 25,
    },
    {
      name: "Aluminum Sheets",
      price: 12.99,
      image: toBase64("db/images/aluminum_sheets.jpeg"),
      description: "Lightweight aluminum sheets for crafting and roofing.",
      class: "Metal",
      quantity: 25,
    },
    {
      name: "Flat Strap",
      price: 8.99,
      image: toBase64("db/images/flat_strap.jpeg"),
      description:
        "Strong and durable forged steel bars for industrial applications.",
      class: "Metal",
      quantity: 25,
    },
    {
      name: "Steel Fasteners",
      price: 5.49,
      image: toBase64("db/images/Steel_fasteners.jpeg"),
      description: "Rust-resistant brass fasteners for furniture assembly.",
      class: "Fasteners",
      quantity: 25,
    },
  ];

  for (const product of products) {
    await createIfNotExists("product", product);
  }

  for (const review of reviews) {
    await prisma.review.create({ data: review });
  }

  console.log("Seed data creation complete.");

  await prisma.$disconnect();
}

main().catch((e) => {
  throw e;
});
