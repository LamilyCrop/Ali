"use client";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { normalizeCategorySlug } from "@/lib/categories";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [isMenuOpen]);

  // Helper function for simple slug generation (for area/mounting categories)
  const toSlug = (value: string): string => {
    return value.toLowerCase().replace(/\s+/g, "-");
  };

  // Top-level nav items handled via grouped menus; Support and Contact are under About

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
    "Bollaeds"
  ];

  const areaCategories = [
    "Covered",
    "Damp Location",
    "Dry Location",
    "Indoor"
  ];

  const mountingCategories = [
    "Hanging and Pendant",
    "Inlay and Recessed",
    "Pole Mount",
    "Surface Mount",
    "Wall Mount"
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
    "Linear Light Connector"
  ];

  return (
    <header className="fixed top-0 w-full bg-white border-b border-border z-50 shadow-soft">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" aria-label="Go to homepage" className="flex items-center space-x-3">
            <img
              src="/uploads/8fbd59a6-728d-4cbd-9232-f8ae5cbe72ca.png"
              alt="Lamily Corp Logo"
              className="w-12 h-12"
            />
            <span className="hidden md:block text-lg font-bold font-sans text-foreground">Lamily Corp</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Products - own menu with original three columns, plus link to All Products */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className="text-foreground hover:text-primary transition-colors font-medium h-10"
                    onClick={() => {
                      window.location.href = "/products-and-accessories/all";
                    }}
                  >
                    Product
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-96 p-4">
                      <div className="grid grid-cols-3 gap-6">
                        {/* Product Categories */}
                        <div>
                          <h4 className="font-semibold text-foreground mb-3 text-sm">Categories</h4>
                          <div className="space-y-1">
                            {productCategories.map((item) => (
                              <NavigationMenuLink
                                key={item}
                                href={`/products-and-accessories/${normalizeCategorySlug(item)}`}
                                className="block px-2 py-1 text-xs text-muted-foreground hover:text-primary hover:bg-muted rounded transition-colors no-underline"
                              >
                                {item}
                              </NavigationMenuLink>
                            ))}
                          </div>
                        </div>
                        
                        {/* Area Categories */}
                        <div>
                          <h4 className="font-semibold text-foreground mb-3 text-sm">Area</h4>
                          <div className="space-y-1">
                            {areaCategories.map((item) => (
                              <NavigationMenuLink
                                key={item}
                                href={`/products-and-accessories/${toSlug(item)}`}
                                className="block px-2 py-1 text-xs text-muted-foreground hover:text-primary hover:bg-muted rounded transition-colors no-underline"
                              >
                                {item}
                              </NavigationMenuLink>
                            ))}
                          </div>
                        </div>
                        
                        {/* Mounting Categories */}
                        <div>
                          <h4 className="font-semibold text-foreground mb-3 text-sm">Mounting</h4>
                          <div className="space-y-1">
                            {mountingCategories.map((item) => (
                              <NavigationMenuLink
                                key={item}
                                href={`/products-and-accessories/${toSlug(item)}`}
                                className="block px-2 py-1 text-xs text-muted-foreground hover:text-primary hover:bg-muted rounded transition-colors no-underline"
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

            {/* Accessories - own menu */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className="text-foreground hover:text-primary transition-colors font-medium h-10"
                    onClick={() => {
                      window.location.href = "/products-and-accessories/all?prioritize=accessories";
                    }}
                  >
                    Accessories
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-64 p-4">
                      <div className="grid gap-2">
                        {accessoriesItems.map((item) => (
                          <NavigationMenuLink
                            key={item}
                            href={`/products-and-accessories/${item.toLowerCase().replace(/\s+/g, '-')}`}
                            className="block px-2 py-1 text-xs text-muted-foreground hover:text-primary hover:bg-muted rounded transition-colors no-underline"
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

            {/* About - simple link list */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className="text-foreground hover:text-primary transition-colors font-medium h-10"
                    onClick={() => {
                      window.location.href = "/about";
                    }}
                  >
                    About
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-48 p-3">
                      <div className="grid gap-1">
                        <NavigationMenuLink
                          href="/about?section=our-story"
                          onClick={(event) => {
                            if (window.location.pathname === "/about") {
                              event.preventDefault();
                              document
                                .getElementById("our-story")
                                ?.scrollIntoView({ behavior: "smooth", block: "start" });
                            }
                          }}
                          className="block px-3 py-2 text-xs text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors no-underline"
                        >
                          Our Story
                        </NavigationMenuLink>
                        <NavigationMenuLink
                          href="/about?section=support"
                          onClick={(event) => {
                            if (window.location.pathname === "/about") {
                              event.preventDefault();
                              document
                                .getElementById("support")
                                ?.scrollIntoView({ behavior: "smooth", block: "start" });
                            }
                          }}
                          className="block px-3 py-2 text-xs text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors no-underline"
                        >
                          Support
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
                          className="block px-3 py-2 text-xs text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors no-underline"
                        >
                          Product Warranty
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
                          className="block px-3 py-2 text-xs text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors no-underline"
                        >
                          Contact Us
                        </NavigationMenuLink>
                        
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Client Login (trigger styling without arrow) */}
            <a
              href="https://books.zohosecure.com/portal/lamilycorp"
              className={cn(navigationMenuTriggerStyle(), "text-foreground")}
            >
              Client Login
            </a>

 

          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

            {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden fixed top-20 inset-x-0 bottom-0 z-50 bg-white border-t border-border animate-fade-in overflow-y-auto">
            <div className="flex flex-col space-y-4 px-6 pb-10 pt-4">
                                  <a
                 href="/products-and-accessories/all"
                 className="text-primary hover:underline"
                 onClick={() => setIsMenuOpen(false)}
               >
                 View All Products →
               </a>
              <div className="py-2">
                <div className="text-foreground font-medium mb-2">Products</div>
                <div className="pl-4 space-y-1">
                  {productCategories.map((item) => (
                    <a
                      key={item}
                      href={`/products-and-accessories/${normalizeCategorySlug(item)}`}
                      className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>

              <div className="py-2">
                <div className="text-foreground font-medium mb-2">Area</div>
                <div className="pl-4 space-y-1">
                  {areaCategories.map((item) => (
                    <a
                      key={item}
                      href={`/products-and-accessories/${toSlug(item)}`}
                      className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>

              <div className="py-2">
                <div className="text-foreground font-medium mb-2">Mounting</div>
                <div className="pl-4 space-y-1">
                  {mountingCategories.map((item) => (
                    <a
                      key={item}
                      href={`/products-and-accessories/${toSlug(item)}`}
                      className="block text-xs text-muted-foreground hover:text-primary transition-colors py-1"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>
              <div className="py-2">
                <div className="text-foreground font-medium mb-2">Accessories</div>
                <div className="pl-4 space-y-2">
                  {accessoriesItems.map((item) => (
                    <a
                      key={item}
                      href={`/products-and-accessories/${toSlug(item)}`}
                      className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>
              <a
                href="/about"
                className="text-foreground hover:text-primary transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a
                href="/about?section=our-story"
                className="text-foreground hover:text-primary transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Our Story
              </a>
              <a
                href="/about?section=warranty"
                className="text-foreground hover:text-primary transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Product Warranty
              </a>
              <a
                href="/about?section=contact"
                className="text-foreground hover:text-primary transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </a>
              <a
                href="/login"
                className="text-base text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors font-medium py-2 px-3"
                onClick={() => setIsMenuOpen(false)}
              >
                Client Login
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;