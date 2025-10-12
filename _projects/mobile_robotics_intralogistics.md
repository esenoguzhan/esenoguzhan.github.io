---
layout: page
title: Mobile Robotics Lab – Intralogistics Challenge
description: Autonomous mobile robot for intralogistics using Dijkstra path planning and OpenCV detection
img: assets/img/lab_robot.png
importance: 1
category: Master Course
---



---

### 📖 Project Overview
This project was developed as part of the **Mobile Robotics Laboratory Challenge**, where teams simulated the automation of an entire intralogistics process using a mobile robot platform.  
The goal was to demonstrate the feasibility of **autonomous guided vehicles (AGVs)** for internal material transport, similar to real-world operations at *Meyer & Meyer Logistics*.

Our robot was programmed to navigate autonomously through eight consecutive tasks involving **lane following, path planning, obstacle avoidance, worker interaction, and packaging selection**.

---

<div class="row justify-content-sm-center">
  <div class="col-sm-8 mt-3 mt-md-0">
    {% include figure.liquid path="assets/img/robot_mobile_agv.jpeg" title="Path" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  The AGV
</div>

### ⚙️ Hardware Platform

The mobile robot platform was developed using components provided by **LFM at TUM**.  
It integrates modular sensors and actuators to simulate an industrial autonomous guided vehicle (AGV).  

#### Main Hardware Components

- **Controller Units**
  - *Mindstorms EV3*: Base control and motor interface  
  - *BrickPi*: Interface between EV3 components and Raspberry Pi  
  - *Raspberry Pi*: High-level computation for camera processing and MQTT communication  

- **Motors**
  - **Locomotion:** Independent control of the right and left wheels → *Differential drive*  
  - **Load lifting:** Servo-actuated lifting fork with parallel kinematics for container manipulation  

- **Sensors**
  - **Color sensors (×2):** Floor color detection for line following  
  - **Distance sensors (×2):** Measuring distances to the front and to the right for obstacle avoidance  
  - **Color camera:** Optical detection of the environment in front of the robot (used for QR/barcode reading and OpenCV-based object detection) 
- **Communication:** MQTT via Wi-Fi module for worker-robot interaction  

### 🏭 Scenario Description
The AGV operated on a miniature logistics testbed with **black lane markings**, **colored task markers**, **QR codes**, and **barcodes**.  
The complete process chain consisted of:

1. **Start in Front of the Factory** – Wait for a green traffic light before entering the area.  
2. **Pick Up a Container at Goods Receipt** – Identify the correct container via barcode comparison and pick it up.  
3. **Storage Process** – Use **Dijkstra’s algorithm** to plan the optimal route to one of the storage positions [g, i, k, l], deposit the container, and exit via [n].  
4. **Interaction with Worker (MQTT)** – Exchange task data with a virtual worker through MQTT, receiving packaging shape information for later use.  
5. **Follow the Worker** – Continuously follow a moving **QR code** representing the worker while maintaining safe distance.  
6. **Bypass an Obstacle** – Detect and classify obstacles using **OpenCV-based object detection**. If the obstacle remains for more than 10 seconds, execute a **bypass maneuver** maintaining a maximum 30 cm clearance.  
7. **Packaging Identification** – Match the received packaging shape with the correct station and place the container there.  
8. **Return to Charging Station** – Navigate back to the charging dock **without lane guidance**, relying on camera-based perception and obstacle monitoring.  

---


<div class="row justify-content-sm-center">
  <div class="col-sm-8 mt-3 mt-md-0">
    {% include figure.liquid path="assets/img/path_intralogistic.jpeg" title="Path" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  The AGV successfully completed the entire logistics workflow autonomously, from goods receipt to warehouse storage and charging.
</div>

---

### ⚙️ System Architecture
The robot’s control software followed a modular, layered design:

- **Challenge.py** – Main control node managing the global state machine and task transitions  
- **Task Modules (task1–task8)** – Independent state machines implementing each sub-task  
- **Perception Layer** – OpenCV-based line tracking, QR and barcode decoding, and object detection  
- **Path Planning Layer** – Dijkstra algorithm for shortest-path navigation  
- **Communication Layer** – MQTT interface for simulated worker-robot collaboration  
- **Control Layer** – PID-based motor control for stable trajectory tracking  

---

### 🚀 Highlights
- Implemented **Dijkstra path planning** for warehouse navigation  
- Developed **OpenCV-based object detection** for obstacle recognition and avoidance  
- Built a **modular, task-oriented framework** covering all eight logistics processes  
- Enabled **MQTT communication** for dynamic human–robot interaction  
- Demonstrated **fully autonomous end-to-end logistics operation**
- 🏆 **Achieved the maximum score among all groups** in the challenge evaluation  

---


