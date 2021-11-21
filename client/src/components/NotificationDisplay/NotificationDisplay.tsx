import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Menu from '@material-ui/core/Menu';
import { Box } from '@material-ui/core';
import { useNotification } from '../../context/useNotificationContext';
import { Link } from 'react-router-dom';
import useStyles from './useStyles';
import { Badge } from '@material-ui/core';

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
      <Box>
        <Badge badgeContent={notifications.length} color="primary">
          <Button color="secondary" size="large" variant="text" onClick={handleClick}>
            <Typography variant="h3">Notifications</Typography>
          </Button>
        </Badge>
        <Menu
          className={classes.menu}
          id="simple-menu"
          anchorEl={notificationDisplay}
          keepMounted
          open={Boolean(notificationDisplay)}
          onClose={handleClose}
        >
          {notifications.length < 1 ? (
            <Box padding={2}>
              <Typography variant="h3">You have no new notifications</Typography>
            </Box>
          ) : (
            notifications.map((notification) => {
              return (
                <Box key={notification._id} padding={2}>
                  <Typography
                    onClick={handleClose}
                    component={Link}
                    className={classes.message}
                    to={notification.type == 'message' ? '/messages' : '/my-jobs'}
                    variant="h3"
                  >
                    {notification.description}
                  </Typography>
                </Box>
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
