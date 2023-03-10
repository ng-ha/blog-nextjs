import { Icon } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

export const ROUTE_LIST = [
  {
    label: [
      <Icon key={0} component={HomeIcon} sx={{ fontSize: 28, color: 'inherit', mr: 0.5 }} />,
      'Home',
    ],
    path: '/',
  },
  {
    label: [
      <Icon
        key={0}
        component={DriveFileRenameOutlineIcon}
        sx={{ fontSize: 26, color: 'inherit', mr: 0.5 }}
      />,
      'Work',
    ],
    path: '/works',
    requireLogin: true,
  },
  {
    label: [
      <Icon key={0} component={AutoStoriesIcon} sx={{ fontSize: 26, color: 'inherit', mr: 0.5 }} />,
      'Blog',
    ],
    path: '/blog',
  },
];
