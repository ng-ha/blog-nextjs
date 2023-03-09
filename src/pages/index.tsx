import { Seo } from '@/components/common';
import { FeaturedWorks, HeroSection, RecentPosts } from '@/components/home';
import { MainLayout } from '@/components/layout';
import { NextPageWithLayout } from '@/models';
import { Box } from '@mui/material';

const Home: NextPageWithLayout = () => {
  return (
    <Box>
      <Seo
        data={{
          title: 'My NextJS App | Nguyen Thanh Ha',
          description:
            'Step by step tutorials to build a full CRUD website using NextJS for beginners.',
          url: process.env.HOST_URL || 'https://learn-nextjs-ruddy-eight.vercel.app',
          thumbnailUrl:
            'https://images.unsplash.com/photo-1525789351284-e1e7de240152?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8dW5zcGxhc2h8ZW58MHx8MHx8&w=1000&q=80',
        }}
      />
      <HeroSection />
      <RecentPosts />
      <FeaturedWorks />
    </Box>
  );
};
Home.Layout = MainLayout;
export default Home;
