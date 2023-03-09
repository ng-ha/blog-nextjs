import { PostItem } from '@/components/blog';
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
