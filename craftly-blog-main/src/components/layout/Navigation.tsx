import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Search, 
  Menu, 
  X, 
  PenTool, 
  User, 
  Settings, 
  LogOut, 
  Moon, 
  Sun,
  ChevronDown
} from 'lucide-react';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const navLinks = [
    { name: 'News', href: '/news' },
    { name: 'Showcase', href: '/showcase' },
    { name: 'Hosting', href: '/hosting' },
    { name: 'Learn', href: '/learn' },
    { name: 'Community', href: '/community' },
    { name: 'About', href: '/about' }
  ];

  return (
    <nav className="bg-white dark:bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - WordPress Style */}
          <Link to="/" className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <span className="text-xl font-bold hidden sm:block">BlogPro</span>
          </Link>

          {/* Desktop Navigation - Clean WordPress Style */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-foreground hover:text-primary transition-colors font-medium text-sm"
              >
                {link.name}
              </Link>
            ))}
            
            {/* Categories Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-foreground hover:text-primary font-medium text-sm p-0 h-auto">
                  Categories
                  <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 bg-white/95 backdrop-blur border shadow-sm">
                <DropdownMenuItem asChild>
                  <Link to="/category/technology" className="text-sm">Technology</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/category/design" className="text-sm">Design</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/category/business" className="text-sm">Business</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/category/lifestyle" className="text-sm">Lifestyle</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search - WordPress Style */}
            <div className="relative hidden md:block">
              {isSearchOpen ? (
                <div className="flex items-center">
                  <Input
                    type="search"
                    placeholder="Search articles..."
                    className="w-64 pr-10 bg-white border-border text-sm"
                    autoFocus
                    onBlur={() => setIsSearchOpen(false)}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1"
                    onClick={() => setIsSearchOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsSearchOpen(true)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Search className="h-5 w-5" />
                </Button>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="text-muted-foreground hover:text-foreground"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            {/* Get BlogPro Button - WordPress Style */}
            <Button
              className="bg-primary hover:bg-primary-dark text-primary-foreground font-medium text-sm px-4 py-2 rounded-md hidden sm:flex"
              asChild
            >
              <Link to="/write">
                Write
              </Link>
            </Button>

            {/* User Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" />
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white/95 backdrop-blur border shadow-sm" align="end">
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center text-sm">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="flex items-center text-sm">
                    <PenTool className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="flex items-center text-sm">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive text-sm">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <div className="space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search articles..."
                  className="pl-10 bg-white border-border text-sm"
                />
              </div>

              {/* Mobile Navigation Links */}
              <div className="space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="block px-3 py-2 text-foreground hover:text-primary hover:bg-muted/50 rounded-md transition-colors text-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Mobile Categories */}
              <div className="space-y-2">
                <div className="px-3 py-2 text-sm font-semibold text-muted-foreground">
                  Categories
                </div>
                <Link
                  to="/category/technology"
                  className="block px-3 py-2 text-foreground hover:text-primary hover:bg-muted/50 rounded-md transition-colors text-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Technology
                </Link>
                <Link
                  to="/category/design"
                  className="block px-3 py-2 text-foreground hover:text-primary hover:bg-muted/50 rounded-md transition-colors text-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Design
                </Link>
                <Link
                  to="/category/business"
                  className="block px-3 py-2 text-foreground hover:text-primary hover:bg-muted/50 rounded-md transition-colors text-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Business
                </Link>
                <Link
                  to="/category/lifestyle"
                  className="block px-3 py-2 text-foreground hover:text-primary hover:bg-muted/50 rounded-md transition-colors text-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Lifestyle
                </Link>
              </div>

              {/* Mobile Actions */}
              <div className="flex items-center justify-between px-3 pt-4 border-t border-border">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleDarkMode}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {isDarkMode ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </Button>
                
                <Button className="bg-primary hover:bg-primary-dark text-primary-foreground font-medium text-sm px-4 py-2 rounded-md">
                  <PenTool className="h-4 w-4 mr-2" />
                  Write
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;