import { Link } from 'react-router-dom';
import { BlogPost } from '@/types/blog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, Eye, Heart, MessageCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface BlogCardProps {
  post: BlogPost;
  variant?: 'default' | 'featured' | 'compact';
  className?: string;
}

const BlogCard = ({ post, variant = 'default', className = '' }: BlogCardProps) => {
  const formattedDate = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true });

  if (variant === 'featured') {
    return (
      <Card className={`blog-card overflow-hidden group ${className}`}>
        <div className="relative">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <Badge 
              className="mb-3 bg-primary/90 text-white hover:bg-primary" 
            >
              {post.category.name}
            </Badge>
            <Link to={`/post/${post.slug}`} className="block">
              <h2 className="text-2xl font-bold text-white mb-2 hover:text-white/90 transition-colors line-clamp-2">
                {post.title}
              </h2>
            </Link>
          </div>
        </div>
        <CardContent className="p-6">
          <p className="text-muted-foreground mb-6 line-clamp-3 text-base leading-relaxed">{post.excerpt}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-foreground">{post.author.name}</p>
                <p className="text-sm text-muted-foreground">{formattedDate}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{post.readTime} min read</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (variant === 'compact') {
    return (
      <Card className={`blog-card group ${className}`}>
        <CardContent className="p-5">
          <div className="flex space-x-4">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-24 h-24 object-cover rounded-lg flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex-1 min-w-0">
              <Badge 
                className="mb-2 text-xs bg-primary/10 text-primary hover:bg-primary/20" 
              >
                {post.category.name}
              </Badge>
              <Link to={`/post/${post.slug}`}>
                <h3 className="text-lg font-semibold text-foreground mb-2 hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
              </Link>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{post.author.name}</span>
                <div className="flex items-center space-x-2">
                  <Clock className="h-3 w-3" />
                  <span>{post.readTime} min</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`blog-card overflow-hidden group ${className}`}>
      <div className="relative">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <Badge 
            className="bg-white/90 text-foreground hover:bg-white"
          >
            {post.category.name}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-6">
        <Link to={`/post/${post.slug}`}>
          <h3 className="text-xl font-bold text-foreground mb-3 hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>
        
        <p className="text-muted-foreground mb-6 line-clamp-3 leading-relaxed">{post.excerpt}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-foreground">{post.author.name}</p>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>{formattedDate}</span>
                <span>•</span>
                <span>{post.readTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCard;