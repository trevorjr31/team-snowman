import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Menu from '@material-ui/core/Menu';
import { Box } from '@material-ui/core';
import { useNotification } from '../../context/useNotificationContext';
import { Link } from 'react-router-dom';
import useStyles from './useStyles';
import { Badge } from '@material-ui/core';
import NotificationListing from './NotificationListing/NotifcationListing';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { MenuItem } from '@mui/material';

const NotificationLink = (): JSX.Element => {
  const classes = useStyles();
  const { notifications, update } = useNotification();
  const [notificationDisplay, toggleNotificationDisplay] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    toggleNotificationDisplay(event.currentTarget);
  };
  const handleClose = () => {
    update();
    toggleNotificationDisplay(null);
  };
  if (notifications) {
    return (
      <Box display="flex">
        <Button color="secondary" size="large" variant="text" onClick={handleClick}>
          <Badge variant="dot" className={classes.badge} invisible={!notifications.length}>
            <Typography variant="h3">Notifications</Typography>
          </Badge>
        </Button>
        <Box className={notificationDisplay ? classes.point : classes.pointClosed}>
          <ArrowDropUpIcon />
        </Box>
        <Menu
          className={classes.menu}
          id="simple-menu"
          anchorEl={notificationDisplay}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
          keepMounted
          open={Boolean(notificationDisplay)}
          onClose={handleClose}
        >
          {!notifications.length ? (
            <Box padding={2}>
              <Typography variant="h3">You have no new notifications</Typography>
            </Box>
          ) : (
            notifications.map((notification) => {
              return (
                <MenuItem key={notification._id}>
                  <Link
                    onClick={handleClose}
                    className={classes.link}
                    to={
                      notification.type === 'message'
                        ? '/messages'
                        : notification.type === 'newRequest'
                        ? '/my-jobs'
                        : '/my-sitters'
                    }
                  >
                    <NotificationListing notification={notification} />
                  </Link>
                </MenuItem>
              );
            })
          )}
        </Menu>
      </Box>
    );
  }
  return <Typography variant="h3">Notifications</Typography>;
};

export default NotificationLink;
