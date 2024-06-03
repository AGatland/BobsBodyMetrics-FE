/* eslint-disable react/prop-types */
import { useState } from 'react';
import classes from './styles.module.css';

import { Table, Progress, Text, Group, TextInput, Slider, NativeSelect } from '@mantine/core';
import ViewActivity from '../../../ViewActivity';


const activityTypes = [
    "Running",
    "Swimming",
    "Cycling",
    "Walking",
    "Roller skating"
]

export default function ProfileActivities({ activities }) {
  const [viewActivity, setViewActivity] = useState(null)

  const rows = activities.map((activity, index) => {
    const avgHeartRateProgress = 100 - (200 - activity.avgHeartRate)/2;
    const avgHeartRateProgressNeg = 100 - avgHeartRateProgress;

    return (
      <Table.Tr key={index} onClick={() => setViewActivity(activity)}>
        <Table.Td>{activityTypes[activity.type]}</Table.Td>
        <Table.Td>{activity.distance} Meters</Table.Td>
        <Table.Td>{activity.duration} Minutes</Table.Td>
        <Table.Td>{activity.caloriesBurned} KCAL</Table.Td>

        <Table.Td>
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
        </Table.Td>

      </Table.Tr>
    );
  });

  const [formData, setFormData] = useState({
    type: 0,
    distance: 0,
    duration: 0,
    caloriesBurned: 0,
    avgHeartRate: 100
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
  }

  const handleSliderChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      avgHeartRate: value
    }));
  }

  const rowAdd = (
      <Table.Tr>
        <Table.Td>
            <NativeSelect name="type" radius="md" value={formData.type} data={activityTypes} onChange={handleChange} />
        </Table.Td>
        <Table.Td>
            <TextInput name="distance" required size="md" value={formData.distance} onChange={handleChange}/>
        </Table.Td>
        <Table.Td>
            <TextInput name="duration" required size="md" value={formData.duration} onChange={handleChange}/>
        </Table.Td>
        <Table.Td>
            <TextInput name="caloriesBurned" required size="md" value={formData.caloriesBurned} onChange={handleChange}/>
        </Table.Td>
        <Table.Td>
            <Slider name="avgHeartRate" color='red' min={0} max={200} value={formData.avgHeartRate} onChange={handleSliderChange} />
        </Table.Td>
      </Table.Tr>
    );

    if (viewActivity) {
      return <ViewActivity activity={viewActivity}/>
    }

  return (
    <Table.ScrollContainer minWidth={800} style={{color: "rgba(255, 255, 255, 0.87)"}}>
      <Table verticalSpacing="xs">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Activity</Table.Th>
            <Table.Th>Distance</Table.Th>
            <Table.Th>Duration</Table.Th>
            <Table.Th>Calories</Table.Th>
            <Table.Th>Average HR</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}{rowAdd}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}