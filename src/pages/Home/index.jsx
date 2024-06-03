import { Container, Title, Text, Button } from '@mantine/core';
import classes from './styles.module.css';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate()

  return (
    <div className={classes.root}>
      <Container size="lg" style={{color: "rgba(255, 255, 255, 0.87)"}}>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              Welcome to{' '}
              <Text
                component="span"
                inherit
                variant="gradient"
                gradient={{ from: 'red', to: 'blue' }}
              >
                Bob&apos;s Body Metrics
              </Text>{' '}
              
            </Title>

            <Text className={classes.description} mt={30}>
              Track health progress through your fitness journey
            </Text>

            <Button
              variant="gradient"
              gradient={{ from: 'red', to: 'blue' }}
              size="xl"
              className={classes.control}
              mt={40}
              onClick={() => navigate("/register")}
            >
              Register now
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}