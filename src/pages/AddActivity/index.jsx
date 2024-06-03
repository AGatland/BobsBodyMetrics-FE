import { useContext, useState } from 'react'
import Map from '../Map'
import classes from './styles.module.css'
import { NativeSelect, Slider, TextInput, Button } from '@mantine/core'
import { environment } from '../../environments/environments'
import { AuthContext } from '../../App'
import { useNavigate } from 'react-router-dom'

const activityTypes = [
  "Running",
  "Swimming",
  "Cycling",
  "Walking",
  "Roller skating"
]

export default function AddActivity() {
  const [distance, setDistance] = useState(0);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    type: "Running",
    duration: 0,
    caloriesBurned: 0,
    avgHeartRate: 100
  });

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSliderChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      avgHeartRate: value
    }));
  }

  const handleFormSubmit = () => {
    event.preventDefault()
    
    fetch(`${environment.apiUrl}/activity/${user.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({...formData, type: activityTypes.indexOf(formData.type), distance: distance}),
    }).then((response) => {
      if (response.status === 200) {
        navigate("/dashboard")
      } else {
        console.log("Error or some")
      }
    });
  }

  return (
    <div className={classes.dashboard}>
        <Map setDistance={setDistance}/>

      <div className={classes.infobox}>
        <h1>Plot your activity</h1>
        <label style={{fontWeight: 500}}>Distance <span style={{color: "#fa5252"}}>*</span>
          <p  style={{fontWeight: 500, paddingLeft: 10, margin: 0}}>{(distance / 1000).toFixed(2)} km</p>
        </label>
        <NativeSelect name="type" label="Activity" required radius="md" value={formData.type} data={activityTypes} onChange={handleChange} />
        <TextInput name="duration" label="Duration" required size="md" value={formData.duration} onChange={handleChange}/>
        <TextInput name="caloriesBurned" label="Calories Burned" required size="md" value={formData.caloriesBurned} onChange={handleChange}/>
        <label style={{fontWeight: 500, display: "flex", flexDirection: "column"}}>
          <span style={{alignSelf: "flex-start"}}>
            Average HR <span style={{color: "#fa5252"}}>*</span>
          </span>
          <p style={{fontWeight: 500, margin: "0 auto"}}>{formData.avgHeartRate}</p>
          <Slider name="avgHeartRate" color="red" min={0} max={200} value={formData.avgHeartRate} onChange={handleSliderChange} />
        </label>
        <Button onClick={handleFormSubmit}>Create Activity</Button>
      </div>
    </div>
  );
}