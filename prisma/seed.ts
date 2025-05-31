import {prisma} from "@/prisma/prisma-client";
import {categories, ingredients, products, users} from "@/prisma/constants";

// Create data in DB
async function up() {
  await prisma.user.createMany({
    data: users,
  });

  await prisma.category.createMany({
    data: categories,
  });

  await prisma.ingredient.createMany({
    data: ingredients,
  });

  await prisma.product.createMany({
    data: products,
  });

  const product1 = await prisma.product.create({
    data: {
      id: 10,
      name: 'Drip Set 1',
      imageUrl : 'https://foundation-images.fra1.cdn.digitaloceanspaces.com/ua/uploads/goods/uji6v8VAk2FKS4YMOWPOxoo598J4qXjym4Wf15ic.png',
      categoryId: 4,
      ingredients: {
        connect: ingredients.slice(0, 2),
      },
    },
  });

  const product2 = await prisma.product.create({
    data: {
      id: 11,
      name: 'Drip Set 2',
      imageUrl : 'https://content2.rozetka.com.ua/goods/images/big_tile/522736254.png',
      categoryId: 4,
      ingredients: {
        connect: ingredients.slice(2, 4),
      },
    },
  });

  const product3 = await prisma.product.create({
    data: {
      id: 12,
      name: 'Drip Set 3',
      imageUrl : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCDu2NHUF8gNbcZuXqf3KP_TY3-yRdp8X17A&s',
      categoryId: 4,
      ingredients: {
        connect: ingredients.slice(4, 5),
      },
    },
  });

  await prisma.productItem.createMany({
    data: [
      // Products with variants
      {
        id: 1,
        productId: product1.id,
        price: 300,
        productType: 1,
        size: 10,
      },
      {
        id: 2,
        productId: product1.id,
        price: 600,
        productType: 2,
        size: 25,
      },
      {
        id: 3,
        productId: product2.id,
        price: 400,
        productType: 1,
        size: 15,
      },
      {
        id: 4,
        productId: product2.id,
        price: 450,
        productType: 2,
        size: 20,
      },
      {
        id: 5,
        productId: product3.id,
        price: 600,
        productType: 1,
        size: 35,
      },
      {
        id: 6,
        productId: product3.id,
        price: 700,
        productType: 2,
        size: 45,
      },
      {
        id: 7,
        productId: product3.id,
        price: 1200,
        productType: 2,
        size: 65,
      },

      // Products without variants
      {
        id: 8,
        productId: 1,
        price: 110,
      },
      {
        id: 9,
        productId: 2,
        price: 120,
      },
      {
        id: 10,
        productId: 3,
        price: 130,
      },
    ],
  });

  await prisma.cart.createMany({
    data: [
      {
        id: 1,
        userId: 1,
        totalAmount: 100,
        token: '11111',
      },
      {
        id: 2,
        userId: 2,
        totalAmount: 200,
        token: '222222',
      },
    ],
  });

  await prisma.cartItem.create({
    data: {
        id: 1,
        productItemId: 1,
        cartId: 1,
        quantity: 2,
        ingredients: {
          connect: [{ id: 1 }, { id: 2 }, { id: 3 }]
        }
      },
  });
}

// Delete all data from DB
async function down() {
  await prisma.productItem.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.ingredient.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.cart.deleteMany({});
  await prisma.cartItem.deleteMany({});
}

async function main() {
  try {
    await down();
    await up();

  } catch (err) {
    console.error(err);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })