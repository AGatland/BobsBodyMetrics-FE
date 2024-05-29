import {
    Group,
    Button,
    Box,
  } from '@mantine/core';

  import classes from './Header.module.css';
  
  export default function Header() {
  
    return (
      <Box bg={"#353535"}>
        <header className={classes.header}>
          <Group justify="space-between" h="100%">
            
  
            <Group h="100%" gap={0} visibleFrom="sm">
              <a href="#" className={classes.link}>
                Home
              </a>
              <a href="#" className={classes.link}>
                Learn
              </a>
              <a href="#" className={classes.link}>
                Academy
              </a>
            </Group>
  
            <Group visibleFrom="sm">
              <Button variant="default">Log in</Button>
              <Button>Register</Button>
            </Group>
          </Group>
        </header>
      </Box>
    );
  }