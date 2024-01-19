import StepperWiringPi from "stepper-wiringpi";
var motor = StepperWiringPi.setup(4096, 17, 18, 27, 22);

motor.setSpeed(30);

motor.forward();
