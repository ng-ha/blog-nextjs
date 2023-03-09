import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import React from "react";

export interface PostPageProps {
    post: any;
}

const PostDetailPage = ({ post }: PostPageProps) => {
    if (!post) return null;
    return (
        <div>
            <h1>Post Detail Page</h1>
            <p>{post.title}</p>
            <p>{post.author}</p>
            <p>{post.description}</p>
        </div>
    );
};

export default PostDetailPage;

export const getStaticPaths: GetStaticPaths = async () => {
    const response = await fetch(
        "https://js-post-api.herokuapp.com/api/posts?_page=1"
    );
    const data = await response.json();

    return {
        paths: data.data.map((post: any) => ({ params: { postId: post.id } })),
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps<PostPageProps> = async (
    context: GetStaticPropsContext
) => {
    const postId = context.params?.postId;
    if (!postId) {
        return {
            notFound: true,
        };
    }
    const response = await fetch(
        `https://js-post-api.herokuapp.com/api/posts/${postId}`
    );
    const data = await response.json();

    return {
        props: {
            post: data,
        },
    };
};
