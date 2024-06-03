/* eslint-disable react/prop-types */

import ViewMap from '../ViewMap'
import classes from './styles.module.css'
import { Group, Progress, Text } from '@mantine/core'

const activityTypes = [
  "Running",
  "Swimming",
  "Cycling",
  "Walking",
  "Roller skating"
]

export default function ViewActivity({ activity }) {
  const avgHeartRateProgress = 100 - (200 - activity.avgHeartRate)/2;
  const avgHeartRateProgressNeg = 100 - avgHeartRateProgress;

  return (
    <div className={classes.dashboard}>
        <ViewMap wps={[{lat: 63.433678187868104, lng: 10.470173803146361}, {lat: 63.428146090292636, lng: 10.448535969072587}]}/>

      <div className={classes.infobox}>
        <label style={{fontWeight: 500}}>Activity Type
          <p  style={{fontWeight: 500, paddingLeft: 10, margin: 0}}>{activityTypes[activity.type]}</p>
        </label>
        <label style={{fontWeight: 500}}>Distance
          <p  style={{fontWeight: 500, paddingLeft: 10, margin: 0}}>{(activity.distance / 1000).toFixed(2)} km</p>
        </label>
        <label style={{fontWeight: 500}}>Duration
          <p  style={{fontWeight: 500, paddingLeft: 10, margin: 0}}>{activity.duration} Minutes</p>
        </label>
        <label style={{fontWeight: 500}}>Calories Burned
          <p  style={{fontWeight: 500, paddingLeft: 10, margin: 0}}>{activity.caloriesBurned} KCal</p>
        </label>
        <label style={{fontWeight: 500}}>Average HR
        <Group justify="space-between">
            <Text fz="xs" c="red" fw={700}>
              0
            </Text>
            <Text fz="xs" c="red" fw={700}>
              {activity.avgHeartRate}
            </Text>
            <Text fz="xs" c="red" fw={700}>
              200
            </Text>
          </Group>
        <Progress.Root>
            <Progress.Section
              className={classes.progressSection}
              value={avgHeartRateProgress}
              color="red"
            />

            <Progress.Section
              className={classes.progressSection}
              value={avgHeartRateProgressNeg}
              color="rgba(255, 255, 255, 0.87)"
            />
          </Progress.Root>
        </label>
      </div>
    </div>
  );
}