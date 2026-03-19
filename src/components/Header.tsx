"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { normalizeCategorySlug } from "@/lib/categories";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const desktopMenuHeadingClass =
  "mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground";
const desktopMenuLinkClass =
  "block rounded-xl px-3 py-2 text-xs leading-5 text-muted-foreground no-underline transition-colors hover:bg-muted hover:text-foreground";
const mobileGroupHeadingClass =
  "text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground";
const mobileLinkClass =
  "block rounded-full px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) return;

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = original;
    };
  }, [isMenuOpen]);

  const toSlug = (value: string): string => {
    return value.toLowerCase().replace(/\s+/g, "-");
  };

  const productCategories = [
    "Area Light",
    "Wall Pack",
    "Canopy",
    "Flood Light",
    "Frame Light",
    "Backlit Panel",
    "Troffer Light",
    "Ceiling Light",
    "Slim Down Light",
    "UFO High Bay",
    "Linear High Bay",
    "Linear Strip",
    "Up and down linear slot light",
    "Vapor Tight",
    "Tube Series",
    "Integrated Tubes",
    "Bollaeds",
  ];

  const areaCategories = ["Covered", "Damp Location", "Dry Location", "Indoor"];

  const mountingCategories = [
    "Hanging and Pendant",
    "Inlay and Recessed",
    "Pole Mount",
    "Surface Mount",
    "Wall Mount",
  ];

  const accessoriesItems = [
    "Emergency Driver",
    "Sensor",
    "Mount bracket",
    "Surface Mount Kit",
    "UFO Reflector",
    "Remote control",
    "Stepdown transformer",
    "Suspending rope",
    "Junction box",
    "Adapter",
    "Linear Light Connector",
  ];

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/70 bg-background/90 backdrop-blur-xl">
      <div className="container mx-auto px-6">
        <div className="flex h-20 items-center justify-between gap-6">
          <a href="/" aria-label="Go to homepage" className="flex items-center gap-3">
            <img
              src="/uploads/Logo.jpg"
              alt="American Lighting Industry Corp Logo"
              className="h-11 w-11 shrink-0 rounded-full border border-border/80 bg-card p-1.5 object-contain"
            />
            <span className="hidden lg:block">
              <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                American Lighting
              </span>
              <span className="block text-sm font-semibold tracking-[0.01em] text-foreground">
                Industry Corp
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-2 md:flex">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className="text-foreground"
                    onClick={() => {
                      window.location.href = "/products-and-accessories/all";
                    }}
                  >
                    Products
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[44rem] p-5">
                      <div className="grid grid-cols-3 gap-6">
                        <div>
                          <h4 className={desktopMenuHeadingClass}>Categories</h4>
                          <div className="space-y-1">
                            {productCategories.map((item) => (
                              <NavigationMenuLink
                                key={item}
                                href={`/products-and-accessories/${normalizeCategorySlug(item)}`}
                                className={desktopMenuLinkClass}
                              >
                                {item}
                              </NavigationMenuLink>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className={desktopMenuHeadingClass}>Area</h4>
                          <div className="space-y-1">
                            {areaCategories.map((item) => (
                              <NavigationMenuLink
                                key={item}
                                href={`/products-and-accessories/${toSlug(item)}`}
                                className={desktopMenuLinkClass}
                              >
                                {item}
                              </NavigationMenuLink>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className={desktopMenuHeadingClass}>Mounting</h4>
                          <div className="space-y-1">
                            {mountingCategories.map((item) => (
                              <NavigationMenuLink
                                key={item}
                                href={`/products-and-accessories/${toSlug(item)}`}
                                className={desktopMenuLinkClass}
                              >
                                {item}
                              </NavigationMenuLink>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className="text-foreground"
                    onClick={() => {
                      window.location.href = "/products-and-accessories/all?prioritize=accessories";
                    }}
                  >
                    Accessories
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-72 p-5">
                      <div className="grid gap-1">
                        {accessoriesItems.map((item) => (
                          <NavigationMenuLink
                            key={item}
                            href={`/products-and-accessories/${toSlug(item)}`}
                            className={desktopMenuLinkClass}
                          >
                            {item}
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className="text-foreground"
                    onClick={() => {
                      window.location.href = "/about";
                    }}
                  >
                    About
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-64 p-4">
                      <div className="grid gap-1">
                        <NavigationMenuLink
                          href="/about?section=about-us"
                          onClick={(event) => {
                            if (window.location.pathname === "/about") {
                              event.preventDefault();
                              document
                                .getElementById("about-us")
                                ?.scrollIntoView({ behavior: "smooth", block: "start" });
                            }
                          }}
                          className={desktopMenuLinkClass}
                        >
                          About Us
                        </NavigationMenuLink>
                        <NavigationMenuLink
                          href="/about?section=warranty"
                          onClick={(event) => {
                            if (window.location.pathname === "/about") {
                              event.preventDefault();
                              document
                                .getElementById("warranty")
                                ?.scrollIntoView({ behavior: "smooth", block: "start" });
                            }
                          }}
                          className={desktopMenuLinkClass}
                        >
                          Product Warranty
                        </NavigationMenuLink>
                        <NavigationMenuLink
                          href="/about?section=return-authorizations"
                          onClick={(event) => {
                            if (window.location.pathname === "/about") {
                              event.preventDefault();
                              document
                                .getElementById("return-authorizations")
                                ?.scrollIntoView({ behavior: "smooth", block: "start" });
                            }
                          }}
                          className={desktopMenuLinkClass}
                        >
                          Return Authorizations
                        </NavigationMenuLink>
                        <NavigationMenuLink
                          href="/about?section=contact"
                          onClick={(event) => {
                            if (window.location.pathname === "/about") {
                              event.preventDefault();
                              document
                                .getElementById("contact")
                                ?.scrollIntoView({ behavior: "smooth", block: "start" });
                            }
                          }}
                          className={desktopMenuLinkClass}
                        >
                          Contact Us
                        </NavigationMenuLink>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <a
              href="https://books.zohosecure.com/portal/lamilycorp"
              className={cn(navigationMenuTriggerStyle(), "text-foreground")}
            >
              Client Login
            </a>
          </div>

          <button
            className="rounded-full border border-border/80 bg-card p-2.5 text-foreground md:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="fixed inset-x-0 bottom-0 top-20 z-50 overflow-y-auto border-t border-border/70 bg-background/95 backdrop-blur md:hidden">
            <div className="flex flex-col gap-6 px-6 pb-10 pt-6">
              <a
                href="/products-and-accessories/all"
                className="rounded-full border border-border/80 bg-card px-4 py-3 text-sm font-medium text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                View full catalog
              </a>

              <div className="space-y-3">
                <div className={mobileGroupHeadingClass}>Products</div>
                <div className="grid gap-1">
                  {productCategories.map((item) => (
                    <a
                      key={item}
                      href={`/products-and-accessories/${normalizeCategorySlug(item)}`}
                      className={mobileLinkClass}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className={mobileGroupHeadingClass}>Area</div>
                <div className="grid gap-1">
                  {areaCategories.map((item) => (
                    <a
                      key={item}
                      href={`/products-and-accessories/${toSlug(item)}`}
                      className={mobileLinkClass}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className={mobileGroupHeadingClass}>Mounting</div>
                <div className="grid gap-1">
                  {mountingCategories.map((item) => (
                    <a
                      key={item}
                      href={`/products-and-accessories/${toSlug(item)}`}
                      className={mobileLinkClass}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className={mobileGroupHeadingClass}>Accessories</div>
                <div className="grid gap-1">
                  {accessoriesItems.map((item) => (
                    <a
                      key={item}
                      href={`/products-and-accessories/${toSlug(item)}`}
                      className={mobileLinkClass}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>

              <div className="space-y-1 border-t border-border/70 pt-4">
                <a href="/about" className={mobileLinkClass} onClick={() => setIsMenuOpen(false)}>
                  About
                </a>
                <a
                  href="/about?section=about-us"
                  className={mobileLinkClass}
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Us
                </a>
                <a
                  href="/about?section=warranty"
                  className={mobileLinkClass}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Product Warranty
                </a>
                <a
                  href="/about?section=return-authorizations"
                  className={mobileLinkClass}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Return Authorizations
                </a>
                <a
                  href="/about?section=contact"
                  className={mobileLinkClass}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact Us
                </a>
                <a
                  href="https://books.zohosecure.com/portal/lamilycorp"
                  className={mobileLinkClass}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Client Login
                </a>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
