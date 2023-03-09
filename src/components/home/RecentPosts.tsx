import { Post } from '@/models';
import { Box, Container, Link as MuiLink, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { PostCard } from './PostCard';

export function RecentPosts() {
  const postList: Post[] = [
    {
      id: '1',
      title: 'Making a design system from scratch',
      description:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
      publishedDate: '1678258675865',
      tagList: ['Design', 'Pattern'],
    },
    {
      id: '2',
      title: 'Creating pixel perfect icons in Figma',
      description:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
      publishedDate: '1678258675865',
      tagList: ['Figma', 'Icon Design'],
    },
  ];
  return (
    <Box component="section" bgcolor="secondary.light" pt={2} pb={4}>
      <Container>
        <Stack
          direction="row"
          mb={2}
          justifyContent={{ xs: 'center', md: 'space-between' }}
          alignItems="center"
        >
          <Typography variant="h5">Recent posts</Typography>
          <Link href="/blog" passHref legacyBehavior>
            <MuiLink display={{ xs: 'none', md: 'inline-block' }}>View all</MuiLink>
          </Link>
        </Stack>

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          sx={{
            '& > div': { width: { xs: '100%', md: '50%' } },
          }}
        >
          {postList.map((post) => (
            <Box key={post.id}>
              <PostCard post={post} />
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
