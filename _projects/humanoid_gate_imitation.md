---
layout: page
title: Humanoid Modeling Using Real Gait Data
description: Train a humanoid robot to imitate human gait by using MuJoCo, Opensim, dm_control and Stable Baselines-3.
img: assets/img/mujoco_humanoid.png
importance: 2
category: Master Course
---

### Project Overview

This project was developed for the **Reinforcement Learning for Optimizations in Biomechanics (RL4OB)** course at **Technical University of Munich (TUM)**.  
Our goal was to teach a **humanoid robot** to imitate **human gait** by using **real motion capture data** and training an RL agent in a physics simulation.

The project was conducted by utilizing **OpenSim**, **MuJoCo**, and **dm_control** environments and **Stable Baselines-3**.

---


### 🔹 Data Collection

- Human motion data was collected using a **Vicon Motion Capture System** by **TUM MIRMI**.  
- Reflective markers were attached to the subject’s body, and their **3D positions (X, Y, Z)** were recorded during walking.  
- These trajectories served as **target reference motions** for our RL agent.

[Reference Human Gait (MIRMI Vicon Data simulated by Opensim)](https://drive.google.com/file/d/1KUjIl1_35r3DgLoKaqX2Eci8DJgmYguq/view?usp=drive_link)

---

### 🔹 Data Processing

#### Static Trial
- Unnecessary markers were removed and coordinates rotated to align with OpenSim’s reference frame.  
- Data was stored as `.trc` files.  
- The **OpenSim Scale Tool** was used to personalize the biomechanical model to the subject’s anatomy.

#### Dynamic Trial
- Marker trajectories during gait were cleaned using **moving mean filters**.  
- Non-relevant joints were removed to match the humanoid configuration.  
- Extracted gait cycles were used for **Inverse Kinematics (IK)** computations in OpenSim.

---

### 🔹 Simulation and Reinforcement Learning

We used **DeepMind’s `dm_control` Humanoid-v5 environment** integrated with the **MuJoCo physics engine**.  
Each simulation step followed the standard RL interaction loop:

> **State → Action → Reward → Next State**

- **Agent:** Humanoid robot  
- **State:** Joint positions and velocities  
- **Action:** Torque commands to joints  
- **Environment:** MuJoCo physics simulation  
- **Goal:** Maximize total reward over training episodes

---

### 🔹 Reward Function

To teach realistic human-like gait, we designed a multi-component reward:

- **R_track:** Encourages humanoid joints to follow real human joint angles  
- **R_upright:** Rewards keeping torso upright and balanced  
- **R_control:** Penalizes excessive control effort for smoother, energy-efficient motion  

\[
R_{total} = w_1 R_{track} + w_2 R_{upright} + w_3 R_{control}
\]

Each episode was initialized from a **real gait-cycle frame** extracted from `.sto` data to ensure realistic starting poses.

---

### 🔹 Experiments & Results

We trained multiple policies using **Proximal Policy Optimization (PPO)** with varying parameters:

| Experiment | Timesteps | Gravity | Focus | Demo Link |
|-------------|------------|----------|--------|-------------|
| Reference Human Gait | — | — | MIRMI Vicon Data | [View](https://drive.google.com/file/d/1KUjIl1_35r3DgLoKaqX2Eci8DJgmYguq/view?usp=drive_link) |
| PPO_100000 | 100k | -9.8 m/s² | Standing stability | [View](https://drive.google.com/file/d/1hryCC0VJFy-QhZu8RdrQZTGcQTSnVeuz/view?usp=drive_link) |
| PPO_1500000 (Upward) | 1.5M | -9.8 m/s² | Standing & partial motion | [View](https://drive.google.com/file/d/1woDafmgaTKnQl4kZsx5rZSuimJlrF7yf/view?usp=drive_link) |
| PPO_4000000 | 4M | -9.8 m/s² | Gait learning | [View](https://drive.google.com/file/d/1iuwsg2A-9QLdmBzbbDJ-TxSPMxJzzaON/view?usp=drive_link) |
| PPO_8000000 | 8M | -9.8 m/s² | Extended training | [View](https://drive.google.com/file/d/1AhgoTZETknHA4K01li2goR1k7hyldsgO/view?usp=drive_link) |
| PPO_500000 (1.0 gravity) | 500k | -1.0 m/s² | Reduced-gravity learning | [View](https://drive.google.com/file/d/1jBaHCsvB8KDGZNORF-bi2AmdJgLHS8MJ/view?usp=drive_link) |
| PPO_1000000 (1.0 gravity) | 1M | -1.0 m/s² | Extended reduced-gravity training | [View](https://drive.google.com/file/d/1LLFIaUIXn3bwHNfHT1c6EWrgyjz9y7UF/view?usp=drive_link) |

The humanoid successfully learned **partial gait-like movements**.  
However, **full stable walking** was not achieved — highlighting the challenge of combining stability and motion imitation in high-dimensional control.




---

- **Team:** Oğuzhan Eşen and Arif Güvenkaya 
- **Course:** Reinforcement Learning for Optimization in Biomechanics
- **Supervisor:** Gheorghe Lisca  
- **Tools:** Python, MuJoCo, OpenSim, dm_control, Stable Baselines-3
