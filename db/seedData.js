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
      name: '1" x 1" Angle Iron',
      price: 10.99,
      image: toBase64("db/images/2x2AngleIron.jpeg"),
      description: "High-quality angle iron for various construction projects.",
      class: "Metal",
      quantity: 25,
    },
    {
      name: '1" x 2" Angle Iron',
      price: 10.99,
      image: toBase64("db/images/2x2AngleIron.jpeg"),
      description: "High-quality angle iron for various construction projects.",
      class: "Metal",
      quantity: 25,
    },
    {
      name: '2" x 2" Angle Iron',
      price: 10.99,
      image: toBase64("db/images/2x2AngleIron.jpeg"),
      description: "High-quality angle iron for various construction projects.",
      class: "Angle Iron",
      quantity: 25,
    },
    {
      name: '2" x 3" Angle Iron',
      price: 10.99,
      image: toBase64("db/images/2x2AngleIron.jpeg"),
      description: "High-quality angle iron for various construction projects.",
      class: "Angle Iron",
      quantity: 25,
    },
    {
      name: '2" x 4" Angle Iron',
      price: 10.99,
      image: toBase64("db/images/2x2AngleIron.jpeg"),
      description: "High-quality angle iron for various construction projects.",
      class: "Angle Iron",
      quantity: 25,
    },
    {
      name: '3" x 3" Angle Iron',
      price: 10.99,
      image: toBase64("db/images/2x2AngleIron.jpeg"),
      description: "High-quality angle iron for various construction projects.",
      class: "Angle Iron",
      quantity: 25,
    },
    {
      name: '4" x 4" Angle Iron',
      price: 10.99,
      image: toBase64("db/images/2x2AngleIron.jpeg"),
      description: "High-quality angle iron for various construction projects.",
      class: "Angle Iron",
      quantity: 25,
    },
    {
      name: '1/4" Steel Plate',
      price: 7.99,
      image: toBase64("db/images/sheet.jpeg"),
      description: "Durable metal sheet for DIY projects.",
      class: "Steel Plate",
      quantity: 25,
    },
    {
      name: '1/2" Steel Plate',
      price: 7.99,
      image: toBase64("db/images/sheet.jpeg"),
      description: "Durable metal sheet for DIY projects.",
      class: "Steel Plate",
      quantity: 25,
    },
    {
      name: '5/16" Steel Plate',
      price: 7.99,
      image: toBase64("db/images/sheet.jpeg"),
      description: "Durable metal sheet for DIY projects.",
      class: "Steel Plate",
      quantity: 25,
    },
    {
      name: '1" Steel Plate',
      price: 7.99,
      image: toBase64("db/images/sheet.jpeg"),
      description: "Durable metal sheet for DIY projects.",
      class: "Steel Plate",
      quantity: 25,
    },
    {
      name: '1/8" Solid Stock',
      price: 5.99,
      image: toBase64("db/images/roundstock.webp"),
      description: "Flexible and sturdy metal rod for crafting.",
      class: "Solid Stock",
      quantity: 25,
    },
    {
      name: '3/16" Solid Stock',
      price: 5.99,
      image: toBase64("db/images/roundstock.webp"),
      description: "Flexible and sturdy metal rod for crafting.",
      class: "Solid Stock",
      quantity: 25,
    },
    {
      name: '5/16" Solid Stock',
      price: 5.99,
      image: toBase64("db/images/roundstock.webp"),
      description: "Flexible and sturdy metal rod for crafting.",
      class: "Solid Stock",
      quantity: 25,
    },
    {
      name: '1/4" Solid Stock',
      price: 5.99,
      image: toBase64("db/images/roundstock.webp"),
      description: "Flexible and sturdy metal rod for crafting.",
      class: "Solid Stock",
      quantity: 25,
    },
    {
      name: '1/2" Solid Stock',
      price: 5.99,
      image: toBase64("db/images/roundstock.webp"),
      description: "Flexible and sturdy metal rod for crafting.",
      class: "Solid Stock",
      quantity: 25,
    },
    {
      name: '3/4" Solid Stock',
      price: 5.99,
      image: toBase64("db/images/roundstock.webp"),
      description: "Flexible and sturdy metal rod for crafting.",
      class: "Solid Stock",
      quantity: 25,
    },
    {
      name: '1" Solid Stock',
      price: 5.99,
      image: toBase64("db/images/roundstock.webp"),
      description: "Flexible and sturdy metal rod for crafting.",
      class: "Solid Stock",
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
      name: '3" x 1.5" C-purlin',
      price: 7.85,
      image: toBase64("db/images/C-Purlin.jpeg"),
      description: "primed C-purlin for steel construction",
      class: "C-purlin",
      quantity: 25,
    },
    {
      name: '3" x 2" C-purlin',
      price: 7.85,
      image: toBase64("db/images/C-Purlin.jpeg"),
      description: "primed C-purlin for steel construction",
      class: "C-purlin",
      quantity: 25,
    },
    {
      name: '4" x 1.5" C-purlin',
      price: 7.85,
      image: toBase64("db/images/C-Purlin.jpeg"),
      description: "primed C-purlin for steel construction",
      class: "C-purlin",
      quantity: 25,
    },
    {
      name: '4" x 2" C-purlin',
      price: 7.85,
      image: toBase64("db/images/C-Purlin.jpeg"),
      description: "primed C-purlin for steel construction",
      class: "C-purlin",
      quantity: 25,
    },
    {
      name: '6" x 2" C-purlin',
      price: 7.85,
      image: toBase64("db/images/C-Purlin.jpeg"),
      description: "primed C-purlin for steel construction",
      class: "C-purlin",
      quantity: 25,
    },
    {
      name: '8" x 2" C-purlin',
      price: 7.85,
      image: toBase64("db/images/C-Purlin.jpeg"),
      description: "primed C-purlin for steel construction",
      class: "C-purlin",
      quantity: 25,
    },
    {
      name: '10" x 2.5" C-purlin',
      price: 7.85,
      image: toBase64("db/images/C-Purlin.jpeg"),
      description: "primed C-purlin for steel construction",
      class: "C-purlin",
      quantity: 25,
    },
    {
      name: '1" x 1" 14GA Bare Square Tubing',
      price: 3.5,
      image: toBase64("db/images/BareSquareTubing.jpeg"),
      description: "14 Gauge bare square tubing for construction",
      class: "Square Tubing",
      quantity: 25,
    },
    {
      name: '1" x 1" 14GA Prime Square Tubing',
      price: 4.5,
      image: toBase64("db/images/PrimeSquareTubing.jpeg"),
      description: "14 Gauge prime square tubing for construction ",
      class: "Square Tubing",
      quantity: 25,
    },
    {
      name: '1" x 1" 11GA Bare Square Tubing',
      price: 3.5,
      image: toBase64("db/images/BareSquareTubing.jpeg"),
      description: "11 Gauge bare square tubing for construction",
      class: "Square Tubing",
      quantity: 25,
    },
    {
      name: '1" x 1" 11GA Prime Square Tubing',
      price: 4.5,
      image: toBase64("db/images/PrimeSquareTubing.jpeg"),
      description: "11 Gauge prime square tubing for construction ",
      class: "Square Tubing",
      quantity: 25,
    },
    {
      name: '1" x 1.5" 14GA Bare Square Tubing',
      price: 3.5,
      image: toBase64("db/images/BareSquareTubing.jpeg"),
      description: "14 Gauge bare square tubing for construction",
      class: "Square Tubing",
      quantity: 25,
    },
    {
      name: '1" x 1.5" 14GA Prime Square Tubing',
      price: 4.5,
      image: toBase64("db/images/PrimeSquareTubing.jpeg"),
      description: "14 Gauge prime square tubing for construction ",
      class: "Square Tubing",
      quantity: 25,
    },
    {
      name: '1" x 1.5" 11GA Bare Square Tubing',
      price: 3.5,
      image: toBase64("db/images/BareSquareTubing.jpeg"),
      description: "11 Gauge bare square tubing for construction",
      class: "Square Tubing",
      quantity: 25,
    },
    {
      name: '1" x 1.5" 11GA Prime Square Tubing',
      price: 4.5,
      image: toBase64("db/images/PrimeSquareTubing.jpeg"),
      description: "11 Gauge prime square tubing for construction ",
      class: "Square Tubing",
      quantity: 25,
    },
    {
      name: '2" x 2" 14GA Bare Square Tubing',
      price: 3.5,
      image: toBase64("db/images/BareSquareTubing.jpeg"),
      description: "14 Gauge bare square tubing for construction",
      class: "Square Tubing",
      quantity: 25,
    },
    {
      name: '2" x 2" 14GA Prime Square Tubing',
      price: 4.5,
      image: toBase64("db/images/PrimeSquareTubing.jpeg"),
      description: "14 Gauge prime square tubing for construction ",
      class: "Square Tubing",
      quantity: 25,
    },
    {
      name: '2" x 2" 11GA Bare Square Tubing',
      price: 3.5,
      image: toBase64("db/images/BareSquareTubing.jpeg"),
      description: "11 Gauge bare square tubing for construction",
      class: "Square Tubing",
      quantity: 25,
    },
    {
      name: '2" x 2" 11GA Prime Square Tubing',
      price: 4.5,
      image: toBase64("db/images/PrimeSquareTubing.jpeg"),
      description: "11 Gauge prime square tubing for construction ",
      class: "Square Tubing",
      quantity: 25,
    },
    {
      name: '1/8" Flat Strap',
      price: 8.99,
      image: toBase64("db/images/flat_strap.jpeg"),
      description:
        "Strong and durable forged steel bars for industrial applications.",
      class: "Flat Strap",
      quantity: 25,
    },
    {
      name: '1/4" Flat Strap',
      price: 8.99,
      image: toBase64("db/images/flat_strap.jpeg"),
      description:
        "Strong and durable forged steel bars for industrial applications.",
      class: "Flat Strap",
      quantity: 25,
    },
    {
      name: '1/2" Flat Strap',
      price: 8.99,
      image: toBase64("db/images/flat_strap.jpeg"),
      description:
        "Strong and durable forged steel bars for industrial applications.",
      class: "Flat Strap",
      quantity: 25,
    },
    {
      name: '3/4" Flat Strap',
      price: 8.99,
      image: toBase64("db/images/flat_strap.jpeg"),
      description:
        "Strong and durable forged steel bars for industrial applications.",
      class: "Flat Strap",
      quantity: 25,
    },
    {
      name: '1" Flat Strap',
      price: 8.99,
      image: toBase64("db/images/flat_strap.jpeg"),
      description:
        "Strong and durable forged steel bars for industrial applications.",
      class: "Flat Strap",
      quantity: 25,
    },
    {
      name: '1.5" Flat Strap',
      price: 8.99,
      image: toBase64("db/images/flat_strap.jpeg"),
      description:
        "Strong and durable forged steel bars for industrial applications.",
      class: "Flat Strap",
      quantity: 25,
    },
    {
      name: '1.75" Flat Strap',
      price: 8.99,
      image: toBase64("db/images/flat_strap.jpeg"),
      description:
        "Strong and durable forged steel bars for industrial applications.",
      class: "Flat Strap",
      quantity: 25,
    },
    {
      name: '2" Flat Strap',
      price: 8.99,
      image: toBase64("db/images/flat_strap.jpeg"),
      description:
        "Strong and durable forged steel bars for industrial applications.",
      class: "Flat Strap",
      quantity: 25,
    },
    {
      name: '3/4" steel Fasteners',
      price: 5.49,
      image: toBase64("db/images/Steel_fasteners.jpeg"),
      description: "Rust-resistant fasteners for steel construction.",
      class: "Fasteners",
      quantity: 25,
    },
    {
      name: '1" steel Fasteners',
      price: 5.49,
      image: toBase64("db/images/Steel_fasteners.jpeg"),
      description: "Rust-resistant fasteners for steel construction.",
      class: "Fasteners",
      quantity: 25,
    },
    {
      name: '1.5" steel Fasteners',
      price: 5.49,
      image: toBase64("db/images/Steel_fasteners.jpeg"),
      description: "Rust-resistant fasteners for steel construction.",
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
