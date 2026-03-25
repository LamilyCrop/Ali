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
import { usePathname } from "next/navigation";
import { normalizeCategorySlug } from "@/lib/categories";
import { cn } from "@/lib/utils";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const desktopMenuHeadingClass =
  "mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-primary/70";
const desktopMenuLinkClass =
  "block rounded-xl border border-transparent px-3 py-2 text-xs leading-5 text-muted-foreground no-underline transition-colors hover:border-primary/10 hover:bg-primary/5 hover:text-primary";
const mobileGroupHeadingClass =
  "text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-primary/70";
const mobileLinkClass =
  "block rounded-full px-3 py-2 text-sm text-foreground transition-colors hover:bg-primary/5 hover:text-primary";
const mobileSectionButtonClass =
  "flex w-full items-center justify-between rounded-2xl border border-primary/10 bg-white px-4 py-3 text-left text-sm font-medium text-foreground transition-colors hover:bg-primary/5";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>("products");
  const pathname = usePathname();

  useEffect(() => {
    if (!isMenuOpen) return;

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = original;
    };
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) {
      setOpenMobileSection(null);
      return;
    }

    setOpenMobileSection((current) => current ?? "products");
  }, [isMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
    <header className="fixed top-0 z-50 w-full border-b border-primary/10 bg-background/95 backdrop-blur-xl">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-4 sm:h-20 sm:gap-6">
          <a href="/" aria-label="Go to homepage" className="flex items-center gap-3">
            <img
              src="/uploads/Logo.jpg"
              alt="American Lighting Industry Corp Logo"
              className="h-9 w-9 shrink-0 rounded-full border border-primary/10 bg-card p-1 object-contain sm:h-11 sm:w-11 sm:p-1.5"
            />
            <span className="hidden lg:block">
              <span className="block text-sm font-bold tracking-[0.01em] text-foreground">
                American Lighting
              </span>
              <span className="block text-sm font-bold tracking-[0.01em] text-foreground">
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
                                href={`/products-and-accessories/${normalizeCategorySlug(item)}`}
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
                                href={`/products-and-accessories/${normalizeCategorySlug(item)}`}
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
                            href={`/products-and-accessories/${normalizeCategorySlug(item)}`}
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
            type="button"
            className="rounded-full border border-primary/10 bg-card p-2.5 text-foreground md:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-site-menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {isMenuOpen && (
          <>
            <button
              type="button"
              className="fixed inset-0 top-16 z-40 bg-black/10 md:hidden sm:top-20"
              aria-label="Close menu"
              onClick={() => setIsMenuOpen(false)}
            />

            <nav
              id="mobile-site-menu"
              className="absolute inset-x-0 top-full z-50 bg-white shadow-lg md:hidden"
            >
              <div className="container mx-auto max-h-[min(32rem,calc(100dvh-4rem))] overflow-y-auto overscroll-contain px-4 sm:max-h-[min(36rem,calc(100dvh-5rem))] sm:px-6">
                <div className="flex flex-col gap-6 py-5 sm:py-6">
                  <a
                    href="/products-and-accessories/all"
                    className="rounded-full border border-primary/10 bg-primary px-4 py-3 text-sm font-medium text-primary-foreground shadow-soft"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    View full catalog
                  </a>

                  <div className="space-y-3">
                    <button
                      type="button"
                      className={mobileSectionButtonClass}
                      onClick={() =>
                        setOpenMobileSection((current) => (current === "products" ? null : "products"))
                      }
                    >
                      <span>
                        <span className={mobileGroupHeadingClass}>Products</span>
                        <span className="mt-1 block text-xs text-muted-foreground">
                          Main fixture categories
                        </span>
                      </span>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
                          openMobileSection === "products" && "rotate-180"
                        )}
                      />
                    </button>

                    {openMobileSection === "products" && (
                      <div className="grid gap-1 pl-1">
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
                    )}
                  </div>

                  <div className="space-y-3">
                    <button
                      type="button"
                      className={mobileSectionButtonClass}
                      onClick={() =>
                        setOpenMobileSection((current) => (current === "area" ? null : "area"))
                      }
                    >
                      <span>
                        <span className={mobileGroupHeadingClass}>Area</span>
                        <span className="mt-1 block text-xs text-muted-foreground">
                          Filter by installation environment
                        </span>
                      </span>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
                          openMobileSection === "area" && "rotate-180"
                        )}
                      />
                    </button>

                    {openMobileSection === "area" && (
                      <div className="grid gap-1 pl-1">
                        {areaCategories.map((item) => (
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
                    )}
                  </div>

                  <div className="space-y-3">
                    <button
                      type="button"
                      className={mobileSectionButtonClass}
                      onClick={() =>
                        setOpenMobileSection((current) => (current === "mounting" ? null : "mounting"))
                      }
                    >
                      <span>
                        <span className={mobileGroupHeadingClass}>Mounting</span>
                        <span className="mt-1 block text-xs text-muted-foreground">
                          Browse by mounting method
                        </span>
                      </span>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
                          openMobileSection === "mounting" && "rotate-180"
                        )}
                      />
                    </button>

                    {openMobileSection === "mounting" && (
                      <div className="grid gap-1 pl-1">
                        {mountingCategories.map((item) => (
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
                    )}
                  </div>

                  <div className="space-y-3">
                    <button
                      type="button"
                      className={mobileSectionButtonClass}
                      onClick={() =>
                        setOpenMobileSection((current) => (current === "accessories" ? null : "accessories"))
                      }
                    >
                      <span>
                        <span className={mobileGroupHeadingClass}>Accessories</span>
                        <span className="mt-1 block text-xs text-muted-foreground">
                          Drivers, controls, and mounting parts
                        </span>
                      </span>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
                          openMobileSection === "accessories" && "rotate-180"
                        )}
                      />
                    </button>

                    {openMobileSection === "accessories" && (
                      <div className="grid gap-1 pl-1">
                        {accessoriesItems.map((item) => (
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
                    )}
                  </div>

                  <div className="space-y-1 border-t border-primary/10 pt-4">
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
              </div>
            </nav>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
