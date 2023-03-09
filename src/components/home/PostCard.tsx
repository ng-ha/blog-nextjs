import { Post } from '@/models';
import { Card, CardContent, Divider, Typography } from '@mui/material';
import { format } from 'date-fns';

export interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  if (!post) return null;
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" fontWeight="700">
          {post.title}
        </Typography>
        <Typography component="span" variant="body1" my={2} display="flex">
          {format(Number(post.publishedDate), 'dd MMM yyyy')}
          <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
          {post.tagList.join(', ')}
        </Typography>
        <Typography variant="body2">{post.description}</Typography>
      </CardContent>
    </Card>
  );
};
