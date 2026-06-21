const u = (id: string) =>
  `https://images.unsplash.com/${id}?w=800&q=80&auto=format&fit=crop`;

export const PLACEHOLDER_IMAGE = "/images/placeholder-food.svg";

export const FOOD_IMAGES = {
  // Pizza
  margherita:      u("photo-1574071318508-1cdbab80d002"),
  pepperoni:       u("photo-1628840042765-356cda07504e"),
  quattroFormaggi: u("photo-1513104890138-7c749659a591"),
  vegetariana:     u("photo-1565299585323-38d6b0865b47"),
  prosciutto:      u("photo-1565299624946-b28f40a0ae38"),
  diavola:         u("photo-1520201163981-8cc95007dd2a"),

  // Pasta
  bolognese:       u("photo-1555949258-eb67b1ef0ceb"),
  arrabiata:       u("photo-1621996346565-e3dbc646d9a9"),

  // Desserts
  tiramisu:        u("photo-1571877227200-a0d98ea607e9"),

  // Sauzen
  sauceMayo:       "/images/sauces/mayo.svg",
  sauceTomato:     "/images/sauces/tomato.svg",
  sauceCurry:      "/images/sauces/curry.svg",
  sauceSpicy:      "/images/sauces/spicy.svg",
  sauceGarlic:     "/images/sauces/garlic.svg",
  sauceMustard:    "/images/sauces/mustard.svg",
  saucePickle:     "/images/sauces/pickle.svg",
  sauceCocktail:   "/images/sauces/cocktail.svg",

  // Dranken
  cola:            u("photo-1554866585-cd94860890b7"),
  fanta:           u("photo-1625772299848-391b6a87d7b3"),
  water:           u("photo-1616118132534-381148898bb4"),
  beer:            u("photo-1608270586620-248524c67de9"),

  // Hero
  hero: u("photo-1565299624946-b28f40a0ae38"),
} as const;
