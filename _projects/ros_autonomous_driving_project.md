---
layout: page
title: ROS-Based Autonomous Driving
description: A modular ROS-based autonomous driving system developed for the Introduction to ROS course at TUM, integrating perception, planning, decision-making, and control.
img: assets/img/ros_autonomous.png
importance: 1
category: Master Course
---

## 🧭 ROS-Based Autonomous Driving Project

**Course:** *Introduction to ROS* — Technical University of Munich  
**Team Members:** Oğuzhan Eşen, Aras Fırat, Mert Kulak, Arif Güvenkaya, Hyunji Lee  
**Repository:** [GitLab – autonomous_driving_ros](https://gitlab.lrz.de/intro2ros2/autonomous_driving_ros)  
**Demo Video:** [YouTube – Project Demo](https://www.youtube.com/watch?v=hG--16rI4ik)

---

### 🚗 Overview
This project demonstrates a **ROS-based autonomous driving system** developed within the *Introduction to ROS* course at TUM.  
The system drives a simulated car through a **Unity-based urban environment**, obeying traffic rules, stopping at red lights, and navigating efficiently along a predefined route — all implemented within a **modular ROS framework**.

The project covers the **complete autonomous driving pipeline**, including:
- **Perception:** Environment mapping and traffic light detection  
- **Path Planning:** Global and local trajectory generation using the TEB planner  
- **Decision Making:** Traffic-light–aware velocity control  
- **Control:** Real-time steering, throttle, and braking with PID feedback  

---

### 🧠 System Architecture

The software stack was designed using the **ROS 1 navigation framework** and organized into multiple custom nodes communicating via standard ROS topics.  
All components can be launched together with a single `launch_all.launch` file for seamless execution.

#### **1. Perception**
- **3D Mapping (OctoMap):**  
  Depth camera images are processed into 3D voxel maps (10 cm resolution) using the *OctoMap* library.  
  The map is projected into a 2D occupancy grid for navigation, filtering obstacles within –1 m to +5 m height range.

- **Red Light Detection (YOLOv8):**  
  A *YOLOv8-medium* model detects traffic lights in RGB frames.  
  HSV color filtering identifies red states, while synchronized depth images estimate distance to the light.  
  The node publishes:
  - `/red_light_detected` → True/False  
  - `/red_light_is_close` → True when within 40 m  

  This forms the primary input for rule-based decision-making.

---

#### **2. Path Planning**
The planning pipeline integrates **global waypoints**, **short-term goal selection**, and **TEB local trajectory generation**.

- **Global Waypoint Extraction:**  
  Recorded by manual driving in Unity; filtered via a Python script for smoothness and optimized manually.

- **Short-Term Goal Selector:**  
  Publishes sequential navigation goals from the global path to `/move_base_simple/goal` until the mission completes.

- **Trajectory Planning (TEB Planner):**  
  The *Timed Elastic Band* (TEB) local planner computes feasible, collision-free trajectories using both global and local costmaps.  
  Configurations include:
  - Vehicle wheelbase: 2.63 m  
  - Max velocity: 1.2 m/s  
  - Map resolution: 0.1 m  
  - Obstacle sensing range: 80 m  

---

#### **3. Decision Making**
A lightweight **state machine** overrides motion commands during red-light events.  
If both `/red_light_detected` and `/red_light_is_close` are true, the vehicle halts by publishing zero velocity to `/last_vel`.  
Otherwise, it forwards the TEB planner’s velocity commands, ensuring safety and compliance with traffic rules.

---

#### **4. Control**
The controller node translates planner velocities into **steering, throttle, and brake commands** for the Unity simulator.

- **Path Tracking:** Implemented via a *Pure Pursuit* algorithm using vehicle kinematics.  
- **PID Steering Control:** Maintains heading alignment with smooth corrections (limited to ±0.698 rad).  
- **PID Speed Control:** Adjusts throttle and brake proportionally to velocity error for smooth acceleration and stopping.

This control logic ensures stable navigation across complex intersections and curves.

---

### 🧩 ROS Graph
The system includes multiple custom nodes under packages such as:
- `perception` → Octomap & YOLOv8 detection  
- `planning` → Global and local trajectory generation  
- `decision_making` → State machine logic  
- `controller` → PID & Pure Pursuit control  

All nodes are connected through standard ROS topics forming a complete autonomy loop from **sensor input → perception → planning → control**.

---

### 📊 Results
- The car successfully navigates the full route without collisions.  
- Stops correctly at red lights detected by YOLO.  
- Maintains smooth, kinematically feasible trajectories using the TEB planner.  
- Demonstrates modularity and real-time synchronization across all ROS nodes.

<div align="center">
  <img src="https://img.youtube.com/vi/hG--16rI4ik/0.jpg" width="600" alt="Autonomous Driving Demo Thumbnail"><br>
  <a href="https://www.youtube.com/watch?v=hG--16rI4ik">▶ Watch the full demo on YouTube</a>
</div>



---

### 📚 References
- Rösmann, C. – *teb_local_planner*, ROS Wiki  
- Pure Pursuit Algorithm – *Algorithms for Automated Driving* (GitHub Pages)
