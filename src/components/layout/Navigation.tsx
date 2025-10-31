import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { href: "/", label: "Home" },
    { href: "/articles", label: "Articles" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto max-w-4xl px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-large font-medium">
            <a href="/" className="focus-ring transition-micro hover:text-muted-foreground">
              Koza Kurumlu
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Button 
                key={item.href} 
                variant="ghost" 
                size="sm" 
                className="text-small font-medium focus-ring" 
                asChild
              >
                <a href={item.href}>{item.label}</a>
              </Button>
            ))}
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden focus-ring">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="flex flex-col space-y-4 mt-8">
                {navigationItems.map((item) => (
                  <Button 
                    key={item.href} 
                    variant="ghost" 
                    className="justify-start text-left font-medium focus-ring" 
                    asChild
                    onClick={() => setIsOpen(false)}
                  >
                    <a href={item.href}>{item.label}</a>
                  </Button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
