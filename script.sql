DROP DATABASE IF EXISTS homeautomation; 

CREATE DATABASE homeautomation;

USE homeautomation;

CREATE TABLE sensor_history ( 
  id INT NOT NULL AUTO_INCREMENT,
  timestamp VARCHAR(255) NOT NULL, 
  sensor_value VARCHAR(255) NOT NULL,
  data_type VARCHAR(50) NOT NULL, 
  PRIMARY KEY (id)
);

CREATE TABLE room (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL, 
  PRIMARY KEY (id)
);

CREATE TABLE usage_history ( 
  id INT NOT NULL AUTO_INCREMENT,
  timestamp VARCHAR(255) NOT NULL, 
  sensor_value VARCHAR(255) NOT NULL,
  data_type VARCHAR(50) NOT NULL, 
  PRIMARY KEY (id)
);

CREATE TABLE systems (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL, 
  PRIMARY KEY (id)
);

CREATE TABLE time_automation ( 
  id INT NOT NULL AUTO_INCREMENT,
  is_active INT NOT NULL,
  days_of_week VARCHAR(50) NOT NULL, 
  timestamp VARCHAR(255) NOT NULL, 
  PRIMARY KEY (id)
);

CREATE TABLE users (
  name VARCHAR(50) NOT NULL, 
  role ENUM('admin', 'user', 'guest') NOT NULL, 
  id INT NOT NULL AUTO_INCREMENT,
  password VARCHAR(255) NOT NULL, 
  email VARCHAR(100) NOT NULL, 
  is_registered INT NOT NULL,
  system_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (system_id) REFERENCES Systems(id),
  UNIQUE (email)
);

CREATE TABLE sensors (
  id INT NOT NULL AUTO_INCREMENT,
  sensor_type VARCHAR(50) NOT NULL,
  value VARCHAR(255) NOT NULL,
  data_type VARCHAR(50) NOT NULL,
  role_access ENUM('admin', 'user', 'guest') NOT NULL,  
  room_id INT NOT NULL,
  system_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (room_id) REFERENCES Room(id),
  FOREIGN KEY (system_id) REFERENCES Systems(id)
);

CREATE TABLE settings (
  language VARCHAR(50) NOT NULL,
  using_darkmode INT NOT NULL,
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE devices (
  id INT NOT NULL AUTO_INCREMENT,
  device_type VARCHAR(50) NOT NULL,
  device_model VARCHAR(50) NOT NULL,
  sensor_value VARCHAR(255) NOT NULL,
  data_type VARCHAR(50) NOT NULL,
  role_access ENUM('admin', 'user', 'guest') NOT NULL,  
  system_id INT NOT NULL,
  room_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (system_id) REFERENCES Systems(id),
  FOREIGN KEY (room_id) REFERENCES Room(id)
);

CREATE TABLE sensor_automation (
  id INT NOT NULL AUTO_INCREMENT,
  threshold_value VARCHAR(50) NOT NULL, 
  is_active INT NOT NULL,
  threshold_type VARCHAR(50) NOT NULL, 
  action VARCHAR(50) NOT NULL,
  sensor_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (sensor_id) REFERENCES Sensors(id)
);

CREATE TABLE sensor_history_log (
  history_id INT NOT NULL AUTO_INCREMENT, 
  sensor_id INT NOT NULL,
  PRIMARY KEY (history_id, sensor_id),
  FOREIGN KEY (history_id) REFERENCES Sensors(id),
  FOREIGN KEY (sensor_id) REFERENCES sensor_history(id) 
);

CREATE TABLE user_usage_history ( 
  usage_id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  PRIMARY KEY (usage_id, user_id),
  FOREIGN KEY (usage_id) REFERENCES usage_history(id),
  FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE sensor_controls ( 
  automation_id INT NOT NULL,
  device_id INT NOT NULL,
  PRIMARY KEY (automation_id, device_id),
  FOREIGN KEY (automation_id) REFERENCES sensor_automation(id), 
  FOREIGN KEY (device_id) REFERENCES Devices(id)
);

CREATE TABLE timer_controls ( 
  device_id INT NOT NULL,
  automation_id INT NOT NULL,
  PRIMARY KEY (device_id, automation_id),
  FOREIGN KEY (device_id) REFERENCES Devices(id),
  FOREIGN KEY (automation_id) REFERENCES time_automation(id)
);

CREATE TABLE device_usage_history ( 
  device_id INT NOT NULL,
  history_id INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (device_id, history_id), 
  FOREIGN KEY (device_id) REFERENCES Devices(id),
  FOREIGN KEY (history_id) REFERENCES usage_history(id)
); 
