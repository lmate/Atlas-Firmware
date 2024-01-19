#!/usr/bin/python3
//import RPi.GPIO as GPIO
import { Gpio } from 'onoff';
//import time

//in1 = 17
//in2 = 18
//in3 = 27
//in4 = 22
const in1 = new Gpio(17, 'out');
const in2 = new Gpio(18, 'out');
const in3 = new Gpio(27, 'out');
const in4 = new Gpio(22, 'out');

// careful lowering this, at some point you run into the mechanical limitation of how quick your motor can move
const step_sleep = 0.002;

const step_count = 4096; // 5.625*(1/64) per step, 4096 steps is 360°

const direction = False; // True for clockwise, False for counter-clockwise

// defining stepper motor sequence (found in documentation http://www.4tronix.co.uk/arduino/Stepper-Motors.php)
const step_sequence = [[1, 0, 0, 1],
[1, 0, 0, 0],
[1, 1, 0, 0],
[0, 1, 0, 0],
[0, 1, 1, 0],
[0, 0, 1, 0],
[0, 0, 1, 1],
[0, 0, 0, 1]];

// setting up
//GPIO.setmode( GPIO.BCM )
//GPIO.setup( in1, GPIO.OUT )
//GPIO.setup( in2, GPIO.OUT )
//GPIO.setup( in3, GPIO.OUT )
//GPIO.setup( in4, GPIO.OUT )

// initializing
//GPIO.output( in1, GPIO.LOW )
//GPIO.output( in2, GPIO.LOW )
//GPIO.output( in3, GPIO.LOW )
//GPIO.output( in4, GPIO.LOW )

const motor_pins = [in1, in2, in3, in4];
let motor_step_counter = 0;

function cleanup() {
  //GPIO.output( in1, GPIO.LOW )
  //GPIO.output( in2, GPIO.LOW )
  //GPIO.output( in3, GPIO.LOW )
  //GPIO.output( in4, GPIO.LOW )
  //GPIO.cleanup();
  in1.writeSync(0);
  in2.writeSync(0);
  in3.writeSync(0);
  in4.writeSync(0);
  LED.unexport();
}

// the meat
/*
try:
    i = 0
    for i in range(step_count):
        for pin in range(0, len(motor_pins)):
            GPIO.output( motor_pins[pin], step_sequence[motor_step_counter][pin] )
        if direction==True:
            motor_step_counter = (motor_step_counter - 1) % 8
        elif direction==False:
            motor_step_counter = (motor_step_counter + 1) % 8
        else: # defensive programming
            print( "uh oh... direction should *always* be either True or False" )
            cleanup()
            exit( 1 )
        time.sleep( step_sleep )
*/
function run() {
  for (let i = 0; i < step_count; i++) {
    setTimeout(step, step_sleep * i);
  }
}

function step() {
  in1.writeSync(step_sequence[motor_step_counter][0]);
  in2.writeSync(step_sequence[motor_step_counter][1]);
  in3.writeSync(step_sequence[motor_step_counter][2]);
  in4.writeSync(step_sequence[motor_step_counter][3]);

  if (direction) {
    motor_step_counter = (motor_step_counter - 1) % 8;
  } else {
    motor_step_counter = (motor_step_counter + 1) % 8
  }
}

run();

/*except KeyboardInterrupt:
    cleanup()
    exit( 1 )*/

//cleanup()
//exit( 0 )