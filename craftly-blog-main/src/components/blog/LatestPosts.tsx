import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import BlogCard from './BlogCard';
import { latestPosts } from '@/data/dummy-data';
import { Clock, ArrowRight } from 'lucide-react';

const LatestPosts = () => {
  const displayPosts = latestPosts.slice(0, 6);

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="h-6 w-6 text-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                Fresh Content
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Latest 
              <span className="text-gradient-primary"> Articles</span>
            </h2>
            <p className="text-lg text-muted-foreground mt-2">
              Stay updated with our newest insights and discoveries
            </p>
          </div>
          
          <Button 
            variant="outline" 
            className="hidden md:flex items-center space-x-2 hover:bg-primary hover:text-primary-foreground transition-colors group"
            asChild
          >
            <Link to="/articles">
              View all articles
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayPosts.map((post, index) => (
            <BlogCard 
              key={post.id} 
              post={post} 
              variant="default"
              className={`animate-fade-in`}
            />
          ))}
        </div>
        
        <div className="text-center mt-12 md:hidden">
          <Button 
            variant="outline" 
            className="inline-flex items-center space-x-2 hover:bg-primary hover:text-primary-foreground transition-colors group"
            asChild
          >
            <Link to="/articles">
              View all articles
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LatestPosts;