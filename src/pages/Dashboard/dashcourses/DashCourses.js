import React from 'react';
import './_dashcourses.scss';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
const DashCourses = (props) => {
  const { icon, title, color } = props;
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? ` ${color}` : '#308fe8',
    },
  }));
  return (
    <div className="coursecard">
      <div className="imgContainer" style={{ background: color }}>
        <img alt="icon" src={icon} />
      </div>
      <div className="course-title">
        {title}
        <span>8:00Am - 9:00 PM</span>
        <BorderLinearProgress
          variant="determinate"
          aria-label=""
          value={50}
          style={{ width: '100%', marginTop: '5px' }}
        />
      </div>
      <IconButton style={{ width: '50px', height: '50px', marginTop: '10px' }}>
        <MoreVertIcon />
      </IconButton>
    </div>
  );
};

export default DashCourses;
