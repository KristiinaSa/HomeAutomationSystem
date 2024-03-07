import './Analytics.css'
import {dummyAnalytics} from '../dummyData/dummyAnalytics'

const Analytics = () => {

  return (
    <div className="analytics-container">
        <h1>Analytics</h1>
        <div>
            <h2>Devices</h2>
            <div className='analytics-card'>
                {dummyAnalytics.map((device) => {
                    return (
                        <div key={device.id} className="device-box">
                            <h4>{device.name}</h4>

                            <p>Active time today: {device.active_time} hours</p>
                            <p>Last interaction: {device.last_interaction}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    </div>
  )
}

export default Analytics