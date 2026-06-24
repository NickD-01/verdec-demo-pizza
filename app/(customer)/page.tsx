export const dynamic = 'force-dynamic'

import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/product-card";
import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/settings";
import { FOOD_IMAGES } from "@/lib/images";

export default async function HomePage() {
  const [settings, popularProducts] = await Promise.all([
    getSettings(),
    prisma.product.findMany({
      where: { popular: true, available: true },
      include: { category: true },
      take: 4,
    }),
  ]);

  return (
    <>
      {/* Hero — warme overlay, groot serif-italic kopje, trattoria-gevoel */}
      <section className="relative flex min-h-[78vh] items-center overflow-hidden">
        <Image
          src={FOOD_IMAGES.hero}
          alt="Verse pizza uit de steenoven"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-verdec-black via-verdec-black/70 to-verdec-black/30" />
        <div className="container relative z-10 mx-auto px-4 py-20 text-white">
          <span className="inline-block bg-verdec-yellow px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-white">
            {settings.restaurantName}
          </span>
          <h1 className="mt-6 max-w-2xl font-display text-5xl font-bold italic leading-[1.05] md:text-7xl">
            {settings.tagline}
          </h1>
          <p className="mt-5 max-w-lg text-lg text-white/80">
            Authentieke Italiaanse pizza&apos;s en pasta, vers bereid en klaar om
            af te halen.
          </p>
          <Link href="/menu" className="mt-9 inline-block">
            <Button size="lg" className="text-base font-semibold">
              Ontdek de kaart
            </Button>
          </Link>
        </div>
      </section>

      {/* Italiaanse vlag-strip */}
      <div className="flex h-1.5">
        <div className="flex-1 bg-basil" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-verdec-yellow" />
      </div>

      {popularProducts.length > 0 && (
        <section className="container mx-auto px-4 py-20">
          <div className="mb-10 text-center">
            <p className="font-display text-lg italic text-verdec-yellow">Le nostre specialità</p>
            <h2 className="mt-1 font-display text-4xl font-bold">Onze favorieten</h2>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 xl:grid-cols-4">
            {popularProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/menu">
              <Button variant="outline" size="lg" className="font-semibold">
                Bekijk de volledige kaart
              </Button>
            </Link>
          </div>
        </section>
      )}

      {/* Contact — rustieke kaarten op crème */}
      <section className="border-t border-border bg-secondary/40 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-10 text-center font-display text-4xl font-bold">Kom langs</h2>
          <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-3">
            {[
              { icon: MapPin, title: "Adres", value: settings.address },
              { icon: Phone, title: "Telefoon", value: settings.phone },
              { icon: Clock, title: "Openingsuren", value: settings.openingHours },
            ].map((item) => (
              <div
                key={item.title}
                className="flex flex-col items-center rounded-lg border border-verdec-yellow/20 bg-card p-7 text-center"
              >
                <item.icon className="mb-3 h-8 w-8 text-verdec-yellow" />
                <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
