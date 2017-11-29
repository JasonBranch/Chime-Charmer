var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem411';  // fill in your serial port name here
var inData;
var values;
//var mappedValue;
var counter1 = 0;
var counter2 = 0;
var counter3 = 0;
var counter4 = 0;
var counter5 = 0;
//var counter4 = 0;
var piezo1 = 0;
var piezo2 = 0;
var piezo3 = 0;
var piezo4 = 0;
var piezo5 = 0;

function preload(){
chime1 = loadSound("http://res.cloudinary.com/abhinav21/video/upload/v1508957364/chime1_wg555g.mp3")
chime2 = loadSound("http://res.cloudinary.com/abhinav21/video/upload/v1508957371/chime2_f8ni4u.mp3")
chime3 = loadSound("http://res.cloudinary.com/abhinav21/video/upload/v1508957420/chime4_qsu5lk.mp3")
chime4 = loadSound("http://res.cloudinary.com/abhinav21/video/upload/v1508957421/chime5_yn0va2.mp3")
chime5 = loadSound("http://res.cloudinary.com/abhinav21/video/upload/v1508957497/324325__opmartin__wind-chimes_rvsezq.mp3")
}

function setup() {
 createCanvas(400, 300);
 background(0);
 print("CHIME starting!");
 
 serial = new p5.SerialPort();    // make a new instance of the serialport library
 serial.on('list', printList);    // set a callback function for the serialport list event
 serial.on('data', serialEvent);    // callback for when new data arrives
 
 // change the data rate to whatever you wish
 var options = { baudrate: 9600};
 serial.open(portName, options);
}

function draw() {
//background(0);
 // print(piezo1 + "   " + piezo2 + "   " + piezo3);
  //if (mappedValue>=0 && mappedValue<25 && counter1 ==0){
   // text(" values is " + counter1);
    if ( piezo1>0 && counter1 == 0){
  
  //ellipse(width/4, height/2, piezo1 +100, piezo1 +100);
 
  //chime2.stop();
  counter2 = 0;
  //chime3.stop();
  counter3 = 0;
  //chime4.stop();
  counter4 = 0;
  counter5 = 0;
  chime1.play();
  counter1 ++;
  fill(255,0,0);
  ellipse(width/6, height/2, piezo1+100, piezo1+100);
}

//else if (mappedValue>=25 && mappedValue<50 && counter2 ==0){
  else if (piezo2>0 && counter2 ==0){
    
  fill(0,255,0);
  ellipse(width*2/6, height/2, piezo2+100, piezo2+100);
 // chime1.stop();
  counter1 = 0;
  //chime2.stop();
 // chime3.stop();
  counter3 = 0;
//  chime4.stop();
  counter4 = 0;
  counter5 = 0;
  chime2.play();
  counter2 ++;
}
  else if (piezo3>0 && counter3 ==0){
  fill(0,0,255);
  ellipse(width*3/6, height/2, piezo3+100, piezo3+100);
 // chime1.stop();
  counter1 = 0;
  //chime2.stop();
 // chime3.stop();
  counter2 = 0;
  counter4 = 0;
  counter5 = 0;
//  chime4.stop();
  //counter4 = 0;
  chime3.play();
  counter3 ++;
}
else if (piezo4>0 && counter4 ==0){
  fill(255,255,0);
  ellipse(width*4/6, height/2, piezo4+100 , piezo4+100);
 // chime1.stop();
  counter1 = 0;
  //chime2.stop();
 // chime3.stop();
  counter2 = 0;
//  chime4.stop();
  counter3 = 0;
  counter5 = 0;
  chime4.play();
  counter4 ++;
}
else if (piezo5>0 && counter5 ==0){
  fill(0,255,255);
  ellipse(width*5/6, height/2, piezo5+100 , piezo5+100);
 // chime1.stop();
  counter1 = 0;
  //chime2.stop();
 // chime3.stop();
  counter2 = 0;
  counter4 = 0;
//  chime4.stop();
  counter3 = 0;
  chime4.play();
  counter5 ++;
}
  // print out the sensor value
 // text("sensor value: " + inData, 30, 30);
  //ellipse(width/2, height/2, inData, inData);
}
function serialEvent() {
  // retreive value from serial port
  // this code wortks with serial.write() ONLY!:
  //inData = Number(serial.read());
  // below code works with serial.print() ONLY!
  var inString = serial.readStringUntil("\r\n");
  //print(inString);
     //check to see that there's actually a string there:
  if (inString.length > 0 ) {
    //inData = trim(inData);    // just in case any spaces or other junk still in there
    // adapt this code if expecting multiple values:
    // this is all from Eric's GraphMultiple example...
    //var values = float(splitTokens(inString, ", \t")); // delimiter can be comma space or tab
       values = split(inString, ','); 
      // if the array has at least the # of elements as your # of sensors, you know
      //   you got the whole data packet.
      if (values.length >= 5) {
        // do something...
        piezo1 = map(values[0], 0, 1023, 0, 100);
        piezo2 = map(values[1], 0, 1023, 0, 100);
        piezo3 = map(values[2], 0, 1023, 0, 100);
        piezo4 = map(values[3], 0, 1023, 0, 100);
        piezo5 = map(values[4], 0, 1023, 0, 100);
        //pieozo1 = map(values[0], 0, 1023, 0, 100);
        //pieozo2 = map(values[1], 0, 1023, 0, 100);
        //pieozo3 = map(values[2], 0, 1023, 0, 100);
      }
      }
    //  ...
   // */
   print(piezo1 + "  " + piezo2 + "  " + piezo3 + piezo4 + " " + piezo5 + " ");
    //print(piezo1 + "   " + piezo2 + "   " + piezo3);
    // NOTE: this is the raw bytes, NOT the ASCII equivalent
    // so if you are not sending single raw bytes from Arduino, you will need to convert
    // (if Arduino sends with serial.write, this will work. If it sends with serial.print, you need to convert)
    //mappedValue = map(inData,20,150, 0, 100);
   // print(inData + "\t" + mappedValue);
  }
// print list of ports for debugging
function printList(portList) {
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
  print(i + " " + portList[i]);
   }
 }