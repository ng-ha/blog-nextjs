import { AdminLayout } from '@/components/layout';
import { Box, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Header = dynamic(() => import('@/components/common').then((mod) => mod.Header), {
  ssr: false,
});
export interface AboutProps {}

export default function About(props: AboutProps) {
  const [postList, setPostList] = useState([]);

  const router = useRouter();
  console.log('About query: ', router.query);
  const page = router.query?.page;

  useEffect(() => {
    if (!page) return;
    (async () => {
      const response = await fetch(`https://js-post-api.herokuapp.com/api/posts?_page=${page}`);
      const data = await response.json();
      setPostList(data.data);
    })();
  }, [page]);

  const handleNextClick = () => {
    router.push(
      {
        pathname: '/about',
        query: {
          page: (Number(page) || 1) + 1,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <Box>
      <Typography component="h1" variant="h3" color="primary.main">
        About
      </Typography>
      <Header />
      <ul>
        {postList.map((post: any) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>

      <button onClick={handleNextClick}>Next page</button>
    </Box>
  );
}

About.Layout = AdminLayout;

export const getStaticProps = () => {
  return {
    props: {},
  };
};
