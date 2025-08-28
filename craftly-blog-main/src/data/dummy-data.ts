import { Author, BlogPost, Category, Tag, Comment } from '@/types/blog';
import heroImage from '@/assets/hero-bg.jpg';
import aiImage from '@/assets/blog-ai.jpg';
import webdevImage from '@/assets/blog-webdev.jpg';
import productivityImage from '@/assets/blog-productivity.jpg';

// Authors
export const authors: Author[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b302?w=150&h=150&fit=crop&crop=face',
    bio: 'Senior Software Engineer and Tech Writer with 8+ years of experience in AI and machine learning.',
    email: 'sarah@example.com'
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bio: 'Full-stack developer and productivity enthusiast. Loves sharing tips on work-life balance.',
    email: 'marcus@example.com'
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    bio: 'UX Designer and frontend developer passionate about creating beautiful user experiences.',
    email: 'elena@example.com'
  }
];

// Categories
export const categories: Category[] = [
  {
    id: '1',
    name: 'Technology',
    slug: 'technology',
    color: 'hsl(240 100% 27%)',
    description: 'Latest trends in technology and software development'
  },
  {
    id: '2',
    name: 'Productivity',
    slug: 'productivity',
    color: 'hsl(142 76% 36%)',
    description: 'Tips and tricks to boost your productivity'
  },
  {
    id: '3',
    name: 'Design',
    slug: 'design',
    color: 'hsl(270 100% 60%)',
    description: 'UI/UX design principles and best practices'
  },
  {
    id: '4',
    name: 'Career',
    slug: 'career',
    color: 'hsl(38 92% 50%)',
    description: 'Career advice and professional development'
  }
];

// Tags
export const tags: Tag[] = [
  { id: '1', name: 'JavaScript', slug: 'javascript' },
  { id: '2', name: 'React', slug: 'react' },
  { id: '3', name: 'AI/ML', slug: 'ai-ml' },
  { id: '4', name: 'Productivity', slug: 'productivity' },
  { id: '5', name: 'Design', slug: 'design' },
  { id: '6', name: 'Career', slug: 'career' },
  { id: '7', name: 'Tutorial', slug: 'tutorial' },
  { id: '8', name: 'Best Practices', slug: 'best-practices' }
];

// Comments
const sampleComments: Comment[] = [
  {
    id: '1',
    content: 'This is such an insightful article! The examples really helped me understand the concepts better.',
    author: authors[1],
    createdAt: '2024-01-15T10:30:00Z',
    likes: 12
  },
  {
    id: '2',
    content: 'Great writeup! I\'ve been looking for exactly this kind of information. Thanks for sharing!',
    author: authors[2],
    createdAt: '2024-01-14T15:45:00Z',
    likes: 8
  }
];

// Blog Posts
export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of AI: Machine Learning Trends in 2024',
    slug: 'future-of-ai-machine-learning-trends-2024',
    excerpt: 'Explore the latest developments in artificial intelligence and machine learning that are shaping the future of technology.',
    content: `
      <p>Artificial Intelligence continues to evolve at an unprecedented pace, transforming industries and reshaping how we work and live. In 2024, we're witnessing remarkable breakthroughs that promise to revolutionize various sectors.</p>
      
      <h2>Key Trends Shaping AI in 2024</h2>
      
      <h3>1. Multimodal AI Systems</h3>
      <p>The integration of text, image, audio, and video processing in single AI models is becoming more sophisticated. These systems can understand and generate content across multiple formats, opening new possibilities for creative and practical applications.</p>
      
      <h3>2. Edge AI Computing</h3>
      <p>Processing AI workloads directly on devices rather than in the cloud is gaining momentum. This approach reduces latency, improves privacy, and enables AI functionality even without internet connectivity.</p>
      
      <h3>3. Ethical AI and Responsible Development</h3>
      <p>As AI becomes more powerful, the focus on ethical considerations, bias mitigation, and responsible AI development has intensified. Organizations are implementing frameworks to ensure AI systems are fair, transparent, and accountable.</p>
      
      <h2>Impact on Industries</h2>
      <p>From healthcare diagnostics to autonomous vehicles, AI is creating new opportunities while also presenting challenges that require careful consideration and planning.</p>
      
      <p>The future of AI is bright, but it requires collaboration between technologists, policymakers, and society to ensure its benefits are realized responsibly.</p>
    `,
    coverImage: aiImage,
    author: authors[0],
    category: categories[0],
    tags: [tags[2], tags[7]],
    createdAt: '2024-01-10T09:00:00Z',
    updatedAt: '2024-01-10T09:00:00Z',
    readTime: 8,
    views: 2543,
    likes: 156,
    featured: true,
    published: true,
    comments: sampleComments,
    seo: {
      metaTitle: 'The Future of AI: Machine Learning Trends in 2024 | TechBlog',
      metaDescription: 'Discover the latest AI and machine learning trends shaping 2024. From multimodal systems to edge computing, explore what\'s next in artificial intelligence.',
      keywords: ['artificial intelligence', 'machine learning', 'AI trends 2024', 'multimodal AI', 'edge computing']
    }
  },
  {
    id: '2',
    title: 'Building Modern Web Applications with React and TypeScript',
    slug: 'building-modern-web-applications-react-typescript',
    excerpt: 'Learn how to create scalable and maintainable web applications using React and TypeScript with modern development practices.',
    content: `
      <p>Building robust web applications requires the right tools and practices. React combined with TypeScript provides an excellent foundation for creating scalable, maintainable applications.</p>
      
      <h2>Why React + TypeScript?</h2>
      
      <h3>Type Safety</h3>
      <p>TypeScript adds static type checking to JavaScript, catching errors at compile time rather than runtime. This leads to more reliable code and better developer experience.</p>
      
      <h3>Better Developer Experience</h3>
      <p>With TypeScript, you get excellent IDE support including autocompletion, refactoring tools, and inline documentation.</p>
      
      <h2>Best Practices</h2>
      
      <h3>1. Component Architecture</h3>
      <p>Design components to be reusable and composable. Use props interfaces to define clear contracts between components.</p>
      
      <h3>2. State Management</h3>
      <p>Choose the right state management solution based on your application's complexity. For simple apps, React's built-in state might be sufficient, while complex applications might benefit from Redux or Zustand.</p>
      
      <h3>3. Performance Optimization</h3>
      <p>Leverage React's performance features like useMemo, useCallback, and React.memo to optimize re-renders and improve user experience.</p>
      
      <p>By following these practices, you'll be well on your way to building professional-grade React applications.</p>
    `,
    coverImage: webdevImage,
    author: authors[2],
    category: categories[0],
    tags: [tags[0], tags[1], tags[7]],
    createdAt: '2024-01-08T14:30:00Z',
    updatedAt: '2024-01-08T14:30:00Z',
    readTime: 12,
    views: 1876,
    likes: 94,
    featured: true,
    published: true,
    comments: [sampleComments[1]],
    seo: {
      metaTitle: 'Building Modern Web Apps with React & TypeScript | Web Development Guide',
      metaDescription: 'Complete guide to building scalable web applications with React and TypeScript. Learn best practices, architecture patterns, and performance optimization.',
      keywords: ['React', 'TypeScript', 'web development', 'JavaScript', 'frontend development']
    }
  },
  {
    id: '3',
    title: '10 Productivity Hacks That Will Transform Your Workday',
    slug: '10-productivity-hacks-transform-workday',
    excerpt: 'Discover proven productivity techniques that successful professionals use to maximize their efficiency and achieve better work-life balance.',
    content: `
      <p>In today's fast-paced work environment, productivity isn't just about working harder—it's about working smarter. Here are ten proven strategies that can transform your workday.</p>
      
      <h2>Time Management Techniques</h2>
      
      <h3>1. The Pomodoro Technique</h3>
      <p>Work in focused 25-minute intervals followed by 5-minute breaks. This technique helps maintain concentration and prevents burnout.</p>
      
      <h3>2. Time Blocking</h3>
      <p>Assign specific time blocks to different tasks or types of work. This prevents task-switching and helps you maintain deep focus.</p>
      
      <h3>3. The Two-Minute Rule</h3>
      <p>If a task takes less than two minutes, do it immediately rather than adding it to your to-do list.</p>
      
      <h2>Digital Organization</h2>
      
      <h3>4. Email Management</h3>
      <p>Check email at designated times rather than constantly throughout the day. Use filters and labels to automatically organize incoming messages.</p>
      
      <h3>5. Digital Note-Taking Systems</h3>
      <p>Implement a consistent system for capturing and organizing ideas, whether using apps like Notion, Obsidian, or simple text files.</p>
      
      <h2>Mindset and Habits</h2>
      
      <h3>6. Start with the Most Important Task</h3>
      <p>Tackle your most critical or challenging task first when your energy and focus are at their peak.</p>
      
      <p>Remember, productivity is personal. Experiment with these techniques to find what works best for your unique situation and work style.</p>
    `,
    coverImage: productivityImage,
    author: authors[1],
    category: categories[1],
    tags: [tags[3], tags[7]],
    createdAt: '2024-01-06T11:15:00Z',
    updatedAt: '2024-01-06T11:15:00Z',
    readTime: 6,
    views: 3421,
    likes: 287,
    featured: false,
    published: true,
    comments: sampleComments,
    seo: {
      metaTitle: '10 Productivity Hacks to Transform Your Workday | Productivity Tips',
      metaDescription: 'Boost your productivity with these 10 proven hacks. Learn time management techniques, digital organization tips, and mindset strategies for better work-life balance.',
      keywords: ['productivity tips', 'time management', 'work efficiency', 'productivity hacks', 'workplace productivity']
    }
  }
];

// Featured posts (subset of all posts)
export const featuredPosts = blogPosts.filter(post => post.featured);

// Latest posts
export const latestPosts = [...blogPosts].sort((a, b) => 
  new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
);