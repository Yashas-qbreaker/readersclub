import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, TrendingUp, Users, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-bg.jpg';

const HeroSection = () => {
  return (
    <section className="relative bg-white dark:bg-background">
      {/* Clean Professional Background */}
      <div className="absolute inset-0 gradient-hero opacity-50" />
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="text-center">
          {/* Main Heading - WordPress Style */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 leading-tight tracking-tight">
            Meet 
            <span className="block text-primary font-bold">
              BlogPro
            </span>
          </h1>
          
          {/* Subtitle - Clean and Professional */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
            The modern publishing platform of choice for creators and businesses worldwide—from personal blogs to enterprise content.
          </p>
          
          {/* Search Bar - Cleaner Design */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="search"
                placeholder="Search articles, topics, or authors..."
                className="pl-12 pr-32 py-4 text-lg bg-white border border-border rounded-lg shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <Button 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-primary-dark text-primary-foreground"
                size="lg"
              >
                Search
              </Button>
            </div>
          </div>
          
          {/* CTA Buttons - WordPress Style */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary-dark text-primary-foreground px-8 py-4 text-lg font-medium rounded-lg shadow-sm transition-colors"
              asChild
            >
              <Link to="/explore">
                <BookOpen className="mr-2 h-5 w-5" />
                Explore Articles
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg font-medium rounded-lg transition-colors"
              asChild
            >
              <Link to="/write">
                Start Writing
              </Link>
            </Button>
          </div>
          
          {/* Feature Highlights - WordPress Style */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-xl flex items-center justify-center">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Create</h3>
              <p className="text-muted-foreground leading-relaxed">
                Powerful writing tools and rich text editor to bring your ideas to life with professional formatting.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-xl flex items-center justify-center">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Connect</h3>
              <p className="text-muted-foreground leading-relaxed">
                Build your audience with engaging content and connect with readers through comments and discussions.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Grow</h3>
              <p className="text-muted-foreground leading-relaxed">
                Analytics and insights to understand your audience and grow your reach across all platforms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;