import { Post, Work } from '@/models';
import { Box, Container, Link as MuiLink, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { PostCard } from './PostCard';
import pic1 from '@/images/pic1.png';
import pic2 from '@/images/pic2.png';
import pic3 from '@/images/pic3.png';
import { WorkList } from '../work/WorkList';

export function FeaturedWorks() {
  const workList: Work[] = [
    {
      id: '1',
      title: 'Designing Dashboards',
      shortDescription:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
      createdAt: '1678258675865',
      updatedAt: '',
      tagList: ['Dashboard'],
      fullDescription: '',
      thumbnailUrl: pic1,
    },
    {
      id: '2',
      title: 'Vibrant Portraits of 2023',
      shortDescription:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
      createdAt: '1678258675865',
      updatedAt: '',
      tagList: ['Illustration'],
      fullDescription: '',
      thumbnailUrl: pic2,
    },
    {
      id: '3',
      title: '36 Days of Malayalam type',
      shortDescription:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
      createdAt: '1678258675865',
      updatedAt: '',
      tagList: ['Typography'],
      fullDescription: '',
      thumbnailUrl: pic3,
    },
  ];
  return (
    <Box component="section" pt={2} pb={4}>
      <Container>
        <Box textAlign={{ xs: 'center', md: 'start' }}>
          <Typography variant="h5" mb={3} mt={1}>
            Featured Works
          </Typography>
        </Box>

        <WorkList workList={workList} />
      </Container>
    </Box>
  );
}
