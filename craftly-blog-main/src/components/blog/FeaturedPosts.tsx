import BlogCard from './BlogCard';
import { featuredPosts } from '@/data/dummy-data';
import { TrendingUp, Star } from 'lucide-react';

const FeaturedPosts = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Star className="h-6 w-6 text-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                Editor's Choice
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Featured 
              <span className="text-gradient-primary"> Articles</span>
            </h2>
            <p className="text-lg text-muted-foreground mt-2">
              Hand-picked stories that are trending and worth your time
            </p>
          </div>
          
          <div className="hidden md:flex items-center space-x-2 text-muted-foreground">
            <TrendingUp className="h-5 w-5" />
            <span className="text-sm font-medium">Trending Now</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {featuredPosts.map((post, index) => (
            <BlogCard 
              key={post.id} 
              post={post} 
              variant="featured"
              className={`animate-fade-in ${index === 1 ? 'lg:mt-8' : ''}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;