import { Seo } from '@/components/common';
import { MainLayout } from '@/components/layout';
import { Post } from '@/models';
import { getBlogList } from '@/utils/blog';
import { Box, Container, Divider } from '@mui/material';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import Script from 'next/script';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeDocument from 'rehype-document';
import rehypeFormat from 'rehype-format';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkPrism from 'remark-prism';
import remarkRehype from 'remark-rehype';
import remarkToc from 'remark-toc';
import { unified } from 'unified';

export interface BlogPageProps {
  post: Post;
}

const BlogDetailPage = ({ post }: BlogPageProps) => {
  return (
    <Box>
      <Seo
        data={{
          title: `${post.title} | Nguyen Thanh Ha`,
          description: post.description,
          url: `${process.env.HOST_URL || 'https://learn-nextjs-ruddy-eight.vercel.app'}/blog/${
            post.slug
          }`,
          thumbnailUrl:
            post.thumbnailUrl ||
            'https://images.unsplash.com/photo-1549923746-c502d488b3ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80',
        }}
      />
      <Container>
        <h1>{post.title}</h1>
        <p>{post.author?.name}</p>
        <Divider />
        <div dangerouslySetInnerHTML={{ __html: post.htmlContent || '' }}></div>
      </Container>
      <Script src="/prism.js" strategy="lazyOnload" />
    </Box>
  );
};
BlogDetailPage.Layout = MainLayout;

export default BlogDetailPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const postList = await getBlogList();

  return {
    paths: postList.map((post: Post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<BlogPageProps> = async (
  context: GetStaticPropsContext
) => {
  const postList = await getBlogList();
  const slug = context.params?.slug;
  if (!slug) return { notFound: true };

  const post = postList.find((x) => x.slug === slug);
  if (!post) return { notFound: true };

  // convert md to html
  const file = await unified()
    .use(remarkParse)
    .use(remarkToc, { heading: 'agenda.*' })
    .use(remarkPrism, { plugins: ['line-numbers', 'command-line'] })
    .use(remarkRehype)
    .use(rehypeDocument)
    .use(rehypeFormat)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: 'wrap' })
    .use(rehypeStringify)
    .process(post.mdContent || '');
  post.htmlContent = file.toString();

  return { props: { post } };
};
