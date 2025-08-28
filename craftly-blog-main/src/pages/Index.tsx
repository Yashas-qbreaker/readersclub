import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/blog/HeroSection';
import FeaturedPosts from '@/components/blog/FeaturedPosts';
import CategoryGrid from '@/components/blog/CategoryGrid';
import LatestPosts from '@/components/blog/LatestPosts';

const Index = () => {
  return (
    <Layout>
      <div className="min-h-screen">
        <HeroSection />
        <FeaturedPosts />
        <CategoryGrid />
        <LatestPosts />
      </div>
    </Layout>
  );
};

export default Index;
