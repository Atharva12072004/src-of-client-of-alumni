import { useTheme } from '@mui/material/styles';
import { Stack, Typography, TextField } from '@mui/material';
import Avatar from '../../components/extended/Avatar';
import { LinkedinFilled, InstagramFilled } from '@ant-design/icons';
import { FaXTwitter } from 'react-icons/fa6'; // ✅ NEW valid X icon
import React from 'react';

const AboutUSProfile = ({ image, name, title, link1, link2, link3 }) => {
  const theme = useTheme();

  return (
    <>
      <Stack spacing={2.5} alignItems="center">
        <Avatar alt={name} src={image} sx={{ width: 124, height: 124 }} />
        <TextField
          type="file"
          id="change-avatar"
          variant="outlined"
          sx={{ display: 'none' }}
        />
        <Stack spacing={0.5} alignItems="center">
          <Typography variant="h5">{name}</Typography>
          <Typography color="secondary">{title}</Typography>
        </Stack>

        {/* Social Links */}
        <Stack
          direction="row"
          spacing={3}
          sx={{
            '& svg': {
              fontSize: '32px', // ✅ Increased size
              cursor: 'pointer',
            },
          }}
        >
          {/* LinkedIn */}
          <a href={link1} target="_blank" rel="noopener noreferrer">
            <span style={{ color: '#0e76a8' }}>
              <LinkedinFilled />
            </span>
          </a>

          {/* Instagram */}
          <a href={link2} target="_blank" rel="noopener noreferrer">
            <span style={{ color: '#E1306C' }}>
              <InstagramFilled />
            </span>
          </a>

          {/* X (Twitter) */}
          <a href={link3} target="_blank" rel="noopener noreferrer">
            <span style={{ color: '#000000' }}>
              <FaXTwitter />
            </span>
          </a>
        </Stack>
      </Stack>
    </>
  );
};

export default AboutUSProfile;
