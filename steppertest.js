import { Gpio } from 'onoff';

const in1 = new Gpio(17, 'out');
const in2 = new Gpio(18, 'out');
const in3 = new Gpio(27, 'out');
const in4 = new Gpio(22, 'out');

const step_sleep = 1;

const step_count = 4096;

const direction = false;

const step_sequence = [
[1, 0, 0, 1],
[1, 0, 0, 0],
[1, 1, 0, 0],
[0, 1, 0, 0],
[0, 1, 1, 0],
[0, 0, 1, 0],
[0, 0, 1, 1],
[0, 0, 0, 1]];

let motor_step_counter = 0;

function cleanup() {
  in1.writeSync(0);
  in2.writeSync(0);
  in3.writeSync(0);
  in4.writeSync(0);
  in1.unexport();
  in2.unexport();
  in3.unexport();
  in4.unexport();
}

function run() {
  for (let i = 0; i < step_count; i++) {
    setTimeout(step, step_sleep * (i + 1));
  }
  setTimeout(cleanup, step_sleep * (step_count + 1));
}

function step() {
  in1.writeSync(step_sequence[Math.abs(motor_step_counter)][0]);
  in2.writeSync(step_sequence[Math.abs(motor_step_counter)][1]);
  in3.writeSync(step_sequence[Math.abs(motor_step_counter)][2]);
  in4.writeSync(step_sequence[Math.abs(motor_step_counter)][3]);

  if (direction) {
    motor_step_counter = (motor_step_counter - 1) % 8;
  } else {
    motor_step_counter = (motor_step_counter + 1) % 8
  }
}

run();
