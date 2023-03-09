import { PostItem } from '@/components/blog';
import { Seo } from '@/components/common';
import { MainLayout } from '@/components/layout';
import { Post } from '@/models';
import { getBlogList } from '@/utils/blog';
import { Box, Container, Divider } from '@mui/material';
import { GetStaticProps } from 'next';
import Link from 'next/link';

export interface BlogListPageProps {
  posts: Post[];
}

const BlogListPage = ({ posts }: BlogListPageProps) => {
  return (
    <Box component="section">
      <Seo
        data={{
          title: ' Blogs - My NextJS App | Nguyen Thanh Ha',
          description:
            'Step by step tutorials to build a full CRUD website using NextJS for beginners.',
          url: process.env.HOST_URL || 'https://learn-nextjs-ruddy-eight.vercel.app/blog',
          thumbnailUrl:
            'https://images.unsplash.com/photo-1525789351284-e1e7de240152?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8dW5zcGxhc2h8ZW58MHx8MHx8&w=1000&q=80',
        }}
      />
      <Container>
        <h1>Blog</h1>
        <Box component="ul" sx={{ listStyleType: 'none', p: 0 }}>
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`blog/${post.slug}`}>
                <PostItem post={post} />
              </Link>
              <Divider sx={{ my: 3 }} />
            </li>
          ))}
        </Box>
      </Container>
    </Box>
  );
};
BlogListPage.Layout = MainLayout;
export default BlogListPage;

export const getStaticProps: GetStaticProps<BlogListPageProps> = async () => {
  //   convert markdown into pojo[]
  const postList = await getBlogList();
  return {
    props: {
      posts: postList,
    },
  };
};
