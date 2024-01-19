import { Gpio } from 'onoff';

const motorPins = [new Gpio(17, 'out'), new Gpio(18, 'out'), new Gpio(27, 'out'), new Gpio(22, 'out')];

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
  in1.writeSync(0);
  in2.writeSync(0);
  in3.writeSync(0);
  in4.writeSync(0);
  in1.unexport();
  in2.unexport();
  in3.unexport();
  in4.unexport();
}

function run(steps, direction, speed) {
  let sequence_step_counter = direction == 'CCW' ? steps : 0;

  for (let i = 0; i < steps; i++) {

    setTimeout(() => {
      for (let pinID = 0; pinID < motorPins.length; pinID++) {
        motorPins[pinID].writeSync(step_sequence[sequence_step_counter][pinID]);
      }

      if (direction == 'CW') {
        sequence_step_counter = (sequence_step_counter + 1) % 8;
      } else if (direction == 'CCW') {
        sequence_step_counter = (sequence_step_counter - 1) % 8
      }

    }, speed * (i + 1));
    
  }
  setTimeout(cleanup, speed * (steps + 1));
}

run(4096, 'CW', 1);
