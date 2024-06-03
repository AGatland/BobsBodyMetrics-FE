/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { UnstyledButton, Text, Paper, Group, rem } from '@mantine/core';
import {
  IconSwimming,
  IconBike,
  IconRun,
  IconChevronDown,
  IconChevronUp,
  IconWalk,
  IconRollerSkating,
} from '@tabler/icons-react';
import classes from './styles.module.css';

const activityTypes = [
  { icon: IconRun, label: 'Running' },
  { icon: IconSwimming, label: 'Swimming' },
  { icon: IconBike, label: 'Cycling' },
  { icon: IconWalk, label: 'Walking' },
  { icon: IconRollerSkating, label: 'Roller Skating' }
]

export default function ProfileGoals({ goals }) {
  const [date, setDate] = useState(new Date());
  const [goalData, setGoalData] = useState([])

    // Update goalData whenever the date changes
    useEffect(() => {
        const currentMonth = dayjs(date).month();
        const currentMonthGoals = goals.find(g => g.month === currentMonth)?.goals || [];
        setGoalData(currentMonthGoals);
        }, [date, goals]);

  const stats = goalData.map((stat) => {
    const activityType = activityTypes[stat.activityType];

    return (
    <Paper className={classes.stat} radius="md" shadow="md" p="xs" key={activityTypes[stat.activityType].label}>
      <activityType.icon
        style={{ width: rem(32), height: rem(32) }}
        className={classes.icon}
        stroke={1.5}
      />
      <div>
        <Text className={classes.label}>{activityTypes[stat.activityType].label}</Text>
        <Text fz="xs" className={classes.count}>
          <span className={classes.value}>{stat.progress.toFixed(2)} km</span> / {stat.distance}  km
        </Text>
      </div>
    </Paper>
  )});

  return (
    <div className={classes.root}>
      <div className={classes.controls}>
        <UnstyledButton
          className={classes.control}
          onClick={() => setDate((current) => dayjs(current).add(1, 'month').toDate())}
        >
          <IconChevronUp
            style={{ width: rem(16), height: rem(16) }}
            className={classes.controlIcon}
            stroke={1.5}
          />
        </UnstyledButton>

        <div className={classes.date}>
          <Text className={classes.month}>{dayjs(date).format('MMMM')}</Text>
          <Text className={classes.month}>{dayjs(date).format('YYYY')}</Text>
        </div>

        <UnstyledButton
          className={classes.control}
          onClick={() => setDate((current) => dayjs(current).subtract(1, 'month').toDate())}
        >
          <IconChevronDown
            style={{ width: rem(16), height: rem(16) }}
            className={classes.controlIcon}
            stroke={1.5}
          />
        </UnstyledButton>
      </div>
      <Group style={{ flex: 1 }}>{stats}</Group>
    </div>
  );
}