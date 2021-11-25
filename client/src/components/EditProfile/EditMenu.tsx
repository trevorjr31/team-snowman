import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import useStyles from './useStyles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import { useState, ChangeEvent } from 'react';
import ProfileForm from './ProfileForm/ProfileForm';
import EditPhoto from './EditPhoto/EditPhoto';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const EditMenu = (): JSX.Element => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event: ChangeEvent<Record<string, unknown>>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={9} md={9} lg={9} className={classes.content}>
        <Grid item className={classes.tabContainer}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            className={classes.tabs}
            onChange={handleChange}
          >
            <Tab label="Edit Profile" {...a11yProps(0)} />
            <Tab label="Profile Photo" {...a11yProps(1)} />
            <Tab label="Availability" {...a11yProps(2)} />
            <Tab label="Payment" {...a11yProps(3)} />
            <Tab label="Security" {...a11yProps(4)} />
            <Tab label="Settings" {...a11yProps(5)} />
          </Tabs>
        </Grid>
        <Grid component={Paper} className={classes.tabComponents}>
          <TabPanel value={value} index={0}>
            <Box className={classes.tabComponentHolder}>
              <ProfileForm />
            </Box>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Box className={classes.tabComponentHolder}>
              <EditPhoto />
            </Box>
          </TabPanel>
          <TabPanel value={value} index={2}>
            Availability Placeholder
          </TabPanel>
          <TabPanel value={value} index={3}>
            Payment Placeholder
          </TabPanel>
          <TabPanel value={value} index={4}>
            Security Placeholder
          </TabPanel>
          <TabPanel value={value} index={5}>
            Settings Placeholder
          </TabPanel>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EditMenu;
