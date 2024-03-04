import addDevice from '../services/accessoryServices';
import 
import { useState, useEffect } from 'react';

const AddingDevice = () => {
    const [device, setDevice] = useState({});

    useEffect(() => {

    }, []);

    const newDevice = async (device) => {
        try {
            await addDevice(device);
            console.log("Device added successfully");
        } catch (error) {
            console.log("Error adding device", error.message);
        }
    }

    return (
        <div>
            <h1>Adding a device</h1>
            <div>
            <label htmlFor="roomName">Choose a room:</label>
            <select>
                <option value="1">Bedroom</option>
                <option value="2">Kitchen</option>
                <option value="3">Bathroom</option>
            </select>
            </div>
            <div>
                <label htmlFor="deviceType">Choose a device category:</label>
                <select>
                    <option value="1">Light</option>
                    <option value="2">Thermostat</option>
                </select>
            </div>
            <form onSubmit={newDevice}>
                <label htmlFor="deviceName">Device Name:</label>
                <input type="text" id="deviceName" name="deviceName" />
            </form>

            <button 
            type="submit"
            >Add Device
            </button>
            <button type="reset">Cancel</button>
        </div>
    );
}

export default AddingDevice;