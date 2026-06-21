import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { FOOD_IMAGES } from "../lib/images";

const prisma = new PrismaClient();

const categories = [
  { name: "Pizza",    slug: "pizza",    sortOrder: 1 },
  { name: "Pasta",    slug: "pasta",    sortOrder: 2 },
  { name: "Desserts", slug: "desserts", sortOrder: 3 },
  { name: "Dranken",  slug: "drinks",   sortOrder: 4 },
];

const extras = [
  { name: "Extra mozzarella", slug: "extra-mozzarella", kind: "SAUCE", description: "Extra mozzarella kaas",    extraPrice: 1.5, imageUrl: FOOD_IMAGES.sauceMayo,   sortOrder: 1 },
  { name: "Extra pepperoni",  slug: "extra-pepperoni",  kind: "SAUCE", description: "Extra plakjes pepperoni", extraPrice: 1.5, imageUrl: FOOD_IMAGES.sauceSpicy,  sortOrder: 2 },
  { name: "Champignons",      slug: "champignons",      kind: "SAUCE", description: "Verse champignons",       extraPrice: 1.0, imageUrl: FOOD_IMAGES.sauceGarlic, sortOrder: 3 },
  { name: "Olijven",          slug: "olijven",          kind: "SAUCE", description: "Zwarte olijven",          extraPrice: 1.0, imageUrl: FOOD_IMAGES.saucePickle, sortOrder: 4 },
  { name: "Jalapeños",        slug: "jalapenos",        kind: "SAUCE", description: "Pittige jalapeños",       extraPrice: 1.0, imageUrl: FOOD_IMAGES.sauceCurry,  sortOrder: 5 },
];

const products = [
  { name: "Margherita",          description: "Tomatensaus, verse mozzarella en basilicum — de klassieker.",       price: 12.0, imageUrl: FOOD_IMAGES.margherita,      popular: true,  allowsSauceCustomization: true,  categorySlug: "pizza" },
  { name: "Pepperoni",           description: "Tomatensaus, mozzarella en royale hoeveelheid pepperoni.",          price: 13.5, imageUrl: FOOD_IMAGES.pepperoni,       popular: true,  allowsSauceCustomization: true,  categorySlug: "pizza" },
  { name: "Quattro Formaggi",    description: "Vier kazen: mozzarella, gorgonzola, grana padano en ricotta.",      price: 14.0, imageUrl: FOOD_IMAGES.quattroFormaggi, popular: false, allowsSauceCustomization: false, categorySlug: "pizza" },
  { name: "Vegetariana",         description: "Paprika, courgette, aubergine, rode ui en olijven.",                price: 12.5, imageUrl: FOOD_IMAGES.vegetariana,     popular: false, allowsSauceCustomization: true,  categorySlug: "pizza" },
  { name: "Prosciutto e Funghi", description: "Parmaham, champignons en mozzarella — een tijdloze combi.",         price: 14.5, imageUrl: FOOD_IMAGES.prosciutto,      popular: true,  allowsSauceCustomization: false, categorySlug: "pizza" },
  { name: "Diavola",             description: "Pikante salami, chilipepers en mozzarella. Voor de durvers.",       price: 13.5, imageUrl: FOOD_IMAGES.diavola,         popular: false, allowsSauceCustomization: false, categorySlug: "pizza" },
  { name: "Spaghetti Bolognese", description: "Huisgemaakte vleessaus met verse spaghetti.",                       price: 11.0, imageUrl: FOOD_IMAGES.bolognese,       popular: true,  allowsSauceCustomization: false, categorySlug: "pasta" },
  { name: "Penne Arrabiata",     description: "Pikante tomatensaus met knoflook en chili.",                        price: 10.5, imageUrl: FOOD_IMAGES.arrabiata,       popular: false, allowsSauceCustomization: false, categorySlug: "pasta" },
  { name: "Tiramisu",            description: "Huisgemaakt met mascarpone en espresso.",                           price: 4.5,  imageUrl: FOOD_IMAGES.tiramisu,        popular: true,  allowsSauceCustomization: false, categorySlug: "desserts" },
  { name: "Coca-Cola",           description: "Blik 33cl.",                                                        price: 2.5,  imageUrl: FOOD_IMAGES.cola,            popular: false, allowsSauceCustomization: false, categorySlug: "drinks" },
  { name: "Fanta",               description: "Blik 33cl.",                                                        price: 2.5,  imageUrl: FOOD_IMAGES.fanta,           popular: false, allowsSauceCustomization: false, categorySlug: "drinks" },
  { name: "Plat water",          description: "Flesje 50cl.",                                                      price: 1.5,  imageUrl: FOOD_IMAGES.water,           popular: false, allowsSauceCustomization: false, categorySlug: "drinks" },
  { name: "Italiaans bier",      description: "Peroni 33cl.",                                                      price: 3.5,  imageUrl: FOOD_IMAGES.beer,            popular: false, allowsSauceCustomization: false, categorySlug: "drinks" },
];

async function seedDemoOrders(productMap: Record<string, { id: string; price: number; name: string }>) {
  const p1 = productMap["Pepperoni"];
  const p2 = productMap["Spaghetti Bolognese"];
  const p3 = productMap["Coca-Cola"];
  if (!p1 || !p2 || !p3) return;
  const demoOrders = [
    { daysAgo: 0, status: "PENDING",   name: "Jan Peeters",    phone: "+32 470 11 22 33", paymentMethod: "ONLINE", paymentStatus: "PAID" },
    { daysAgo: 0, status: "PREPARING", name: "Marie Dubois",   phone: "+32 471 44 55 66", paymentMethod: "CASH",   paymentStatus: "UNPAID" },
    { daysAgo: 1, status: "COMPLETED", name: "Tom Janssens",   phone: "+32 472 77 88 99", paymentMethod: "ONLINE", paymentStatus: "PAID" },
    { daysAgo: 2, status: "COMPLETED", name: "Lisa Vermeulen", phone: "+32 473 00 11 22", paymentMethod: "CASH",   paymentStatus: "PAID" },
    { daysAgo: 3, status: "COMPLETED", name: "Pieter De Smet", phone: "+32 474 33 44 55", paymentMethod: "ONLINE", paymentStatus: "PAID" },
    { daysAgo: 4, status: "COMPLETED", name: "Emma Claes",     phone: "+32 475 66 77 88", paymentMethod: "CASH",   paymentStatus: "PAID" },
  ];
  for (let i = 0; i < demoOrders.length; i++) {
    const demo = demoOrders[i];
    const createdAt = new Date();
    createdAt.setDate(createdAt.getDate() - demo.daysAgo);
    createdAt.setHours(18 + (i % 4), 30, 0, 0);
    const total = p1.price + p2.price + p3.price;
    const orderNumber = `PZ-DEMO-${String(1000 + i)}`;
    const existing = await prisma.order.findUnique({ where: { orderNumber } });
    if (existing) continue;
    const slotDate = new Date(createdAt);
    slotDate.setMinutes(Math.ceil(slotDate.getMinutes() / 15) * 15, 0, 0);
    await prisma.order.create({
      data: {
        orderNumber, customerName: demo.name, customerPhone: demo.phone,
        pickupTime: slotDate.toLocaleString("nl-BE", { weekday: "short", hour: "2-digit", minute: "2-digit" }),
        pickupSlot: slotDate.toISOString(), status: demo.status, total,
        paymentMethod: demo.paymentMethod, paymentStatus: demo.paymentStatus, createdAt,
        items: { create: [
          { productId: p1.id, quantity: 1, price: p1.price, name: p1.name },
          { productId: p2.id, quantity: 1, price: p2.price, name: p2.name },
          { productId: p3.id, quantity: 1, price: p3.price, name: p3.name },
        ]},
      },
    });
  }
}

async function main() {
  console.log("Seeding Pizzeria Demo database...");
  const adminEmail = process.env.ADMIN_EMAIL || "owner@verdec.be";
  const adminPassword = process.env.ADMIN_PASSWORD || "VerdecDemo2026!";
  const hashedPassword = await bcrypt.hash(adminPassword, 12);
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { password: hashedPassword },
    create: { email: adminEmail, password: hashedPassword, name: "Zaakvoerder", role: "OWNER" },
  });
  await prisma.settings.upsert({
    where: { id: "default" },
    update:  { restaurantName: "Pizzeria Demo", phone: "0499 00 00 00", address: "Voorbeeldstraat 1, 1000 Brussel", openingHours: "Wo-zo: 17:00 - 22:00", tagline: "Verse pizza's uit de steenoven", minLeadTimeMinutes: 25, slotIntervalMinutes: 15, maxOrdersPerSlot: 6, openTime: "17:00", closeTime: "22:00" },
    create: { id: "default", restaurantName: "Pizzeria Demo", phone: "0499 00 00 00", address: "Voorbeeldstraat 1, 1000 Brussel", openingHours: "Wo-zo: 17:00 - 22:00", tagline: "Verse pizza's uit de steenoven", minLeadTimeMinutes: 25, slotIntervalMinutes: 15, maxOrdersPerSlot: 6, openTime: "17:00", closeTime: "22:00" },
  });
  for (const cat of categories) {
    await prisma.category.upsert({ where: { slug: cat.slug }, update: { name: cat.name, sortOrder: cat.sortOrder }, create: cat });
  }
  for (const item of extras) {
    await prisma.sauce.upsert({ where: { slug: item.slug }, update: item, create: item });
  }
  const categoryMap = await prisma.category.findMany();
  const slugToId = Object.fromEntries(categoryMap.map((c) => [c.slug, c.id]));
  const productMap: Record<string, { id: string; price: number; name: string }> = {};
  for (const product of products) {
    const categoryId = slugToId[product.categorySlug];
    if (!categoryId) continue;
    const data = { name: product.name, description: product.description, price: product.price, imageUrl: product.imageUrl, popular: product.popular, available: true, allowsSauceCustomization: product.allowsSauceCustomization, categoryId };
    const existing = await prisma.product.findFirst({ where: { name: product.name, categoryId } });
    const record = existing ? await prisma.product.update({ where: { id: existing.id }, data }) : await prisma.product.create({ data });
    productMap[product.name] = { id: record.id, price: record.price, name: record.name };
  }
  const allExtras = await prisma.sauce.findMany();
  const allExtraIds = allExtras.map((s) => s.id);
  for (const product of products.filter((p) => p.allowsSauceCustomization)) {
    const p = productMap[product.name];
    if (!p) continue;
    await prisma.productSauce.deleteMany({ where: { productId: p.id } });
    if (allExtraIds.length > 0) {
      await prisma.productSauce.createMany({ data: allExtraIds.map((sauceId) => ({ productId: p.id, sauceId })) });
    }
  }
  await seedDemoOrders(productMap);
  console.log("Seed completed!");
  console.log(`Admin login: ${adminEmail} / ${adminPassword}`);
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });
