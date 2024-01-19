import { Stepper } from 'wpi-stepper';

const pins = [
  17, // A+
  18, // A-
  27, // B+
  22  // B-
];
const motor = new Stepper({ pins, steps: 4096 });
 
motor.speed = 20; // 20 RPM
 
// Move the motor forward 800 steps (4 rotations), logging to console when done:
motor.move(800).then(() => console.log('motion complete'));