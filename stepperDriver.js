import { Gpio } from 'onoff';

const motors = {
  L: {
    motorPins: [new Gpio(17, 'out'), new Gpio(18, 'out'), new Gpio(27, 'out'), new Gpio(22, 'out')]
  },
  R: {
    motorPins: [new Gpio(17, 'out'), new Gpio(18, 'out'), new Gpio(27, 'out'), new Gpio(22, 'out')]
  }
}

const step_sequence = [
  [1, 0, 0, 1],
  [1, 0, 0, 0],
  [1, 1, 0, 0],
  [0, 1, 0, 0],
  [0, 1, 1, 0],
  [0, 0, 1, 0],
  [0, 0, 1, 1],
  [0, 0, 0, 1]];


function cleanup() {
  for (let motorPin of motorPins) {
    motorPin.writeSync(0);
    motorPin.unexport();
  }
}

function run(motor, steps, direction, speed) {
  let sequence_step_counter = direction == 'CCW' ? steps : 0;

  for (let i = 0; i < steps; i++) {

    setTimeout(() => {
      for (let pinID = 0; pinID < motor.motorPins.length; pinID++) {
        motor.motorPins[pinID].writeSync(step_sequence[sequence_step_counter % 8][pinID]);
      }

      if (direction == 'CW') {
        sequence_step_counter++;
      } else if (direction == 'CCW') {
        sequence_step_counter--;
      }

    }, speed * (i + 1));

  }
  setTimeout(cleanup, speed * (steps + 1));
}

run(motors.L, 4096, 'CW', 1);
