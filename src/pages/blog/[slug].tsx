import { MainLayout } from '@/components/layout';
import { Post } from '@/models';
import { getBlogList } from '@/utils/blog';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import React from 'react';

export interface BlogPageProps {
  post: Post;
}

const BlogDetailPage = ({ post }: BlogPageProps) => {
  return (
    <div>
      <h1>Blog Detail Page</h1>
      <p>{post.title}</p>
      <p>{JSON.stringify(post.author)}</p>
      <p>{post.description}</p>
      <p>{post.mdContent}</p>
    </div>
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

  return { props: { post } };
};
