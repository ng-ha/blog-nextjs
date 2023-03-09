import { GetStaticProps, GetStaticPropsContext } from "next";
import Link from "next/link";
import React from "react";

export interface PostListPageProps {
    posts: any[];
}

const PostListPage = ({ posts }: PostListPageProps) => {
    return (
        <div>
            <h1>Post List Page</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <Link href={`posts/${post.id}`}>{post.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostListPage;

export const getStaticProps: GetStaticProps<PostListPageProps> = async (
    context: GetStaticPropsContext
) => {
    const response = await fetch(
        "https://js-post-api.herokuapp.com/api/posts?_page=1"
    );
    const data = await response.json();

    return {
        props: {
            posts: data.data.map((x: any) => ({ id: x.id, title: x.title })),
        },
    };
};
