---
layout: page
title: Amazing Ball Control with PD Controller on dsPIC33F
description: Implementation of a PD-controlled ball balancing system on a dsPIC33F-based touchscreen servo platform
img: assets/img/amazing_ball.png
importance: 4
category: Master Course
---

In the **MW2411 – Concepts and Software Design for Cyber-Physical Systems** laboratory, we worked with the *Amazing Ball System (ABS)* — an embedded real-time control platform built around a **Microchip dsPIC33FJ256MC710** microcontroller, servomotors, and a 4-wire resistive touchscreen.

### 🔹 Project Goal
The objective of **Amazing Ball Control** was to design a **real-time PD controller** capable of moving a steel ball along a circular trajectory on the touchscreen by precisely tilting the plate through servo actuation. The system continuously tracks the ball’s position and corrects deviations from the reference trajectory in real-time.

### 🔹 System Architecture
The hardware consists of:
- **dsPIC33FJ256MC710** microcontroller (40 MIPS)
- **Two servo motors** for X/Y plate actuation  
- **4-wire resistive touchscreen** for real-time position feedback  
- **LCD module** (UART-based) for displaying system status and deadline misses  
- **FLEX-UI board stack** with LEDs, joystick, and DACs for interfacing and debugging  

All software was implemented in **C** using **MPLAB X IDE**, with direct register-level programming for the ADC, timers, PWM output, and UART peripherals.

### 🔹 Control & Software Design
- **Sampling**: Touchscreen X/Y coordinates were read alternately at **100 Hz**.  
- **Filtering**: A **1st-order Butterworth low-pass filter** (3 Hz cutoff) was implemented to remove signal noise.  
- **Control Law**: Independent **PD controllers** were developed for each axis. Controller parameters were tuned experimentally to ensure smooth circular motion.  
- **Reference Trajectory**: Circular path generated at **50 Hz**, configurable via preprocessor macros.  
- **Scheduling**: A periodic **timer interrupt** maintained strict real-time execution; a counter tracked any missed deadlines.  
- **Display**: The system printed real-time performance metrics and deadline counts to the LCD at 5 Hz.

### 🔹 Engineering Highlights
- Integrated multiple peripherals (ADC, PWM, UART, LCD, touchscreen) within a deterministic real-time loop.  
- Achieved stable circular ball motion through optimized PD gains and signal filtering.  
- Validated real-time performance via deadline monitoring and debugging using LEDs and LCD output.  
- Developed under strict timing constraints to ensure system responsiveness and control precision.  

### 🔹 Outcome
Our group successfully demonstrated continuous circular motion of the ball on the touchscreen..  

[🎥 **Watch Demo Video on YouTube**](https://www.youtube.com/shorts/TMfso_s-ocY)

---

**Team:** Oğuzhan Eşen, Ercan Kaçmaz, Mert Kulak, Iliasu Salaudeen
