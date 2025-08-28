import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { categories, blogPosts } from '@/data/dummy-data';
import { ArrowRight, BookOpen } from 'lucide-react';

const CategoryGrid = () => {
  const getCategoryPostCount = (categoryId: string) => {
    return blogPosts.filter(post => post.category.id === categoryId).length;
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Explore by 
            <span className="text-gradient-primary"> Category</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover content that matches your interests. From technology to productivity, 
            find articles that inspire and educate.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const postCount = getCategoryPostCount(category.id);
            
            return (
              <Link 
                key={category.id} 
                to={`/category/${category.slug}`}
                className="group"
              >
                <Card className="blog-card h-full transition-all duration-300 hover:shadow-premium group-hover:-translate-y-2">
                  <CardContent className="p-6 text-center">
                    <div 
                      className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: category.color }}
                    >
                      <BookOpen className="h-8 w-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {category.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {postCount} {postCount === 1 ? 'article' : 'articles'}
                      </span>
                      <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            to="/categories" 
            className="inline-flex items-center text-primary hover:text-primary-light font-semibold transition-colors group"
          >
            View all categories
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;