#include "config.h"
#include <Adafruit_NeoPixel.h>

#define LED_PIN 21
#define LED_COUNT 12

//object declaration
Adafruit_NeoPixel ring(LED_COUNT, LED_PIN, NEO_GRB + NEO_KHZ800);
uint32_t blanc = ring.Color(255,255,255);

//working with the feed called "color"
AdafruitIO_Feed *digital = io.feed("color");
AdafruitIO_Feed *onoff = io.feed("onoff");

int state = 0;

void setup() {
  
  pinMode(LED_PIN, OUTPUT);
  ring.begin();

  ring.setBrightness(20); 
  
  // start the serial connection
  Serial.begin(115200);

  // wait for serial monitor to open
  while(! Serial);

  // connect to io.adafruit.com
  Serial.print("Connecting to Adafruit IO");
  io.connect();

  digital->onMessage(handleMessage);
  onoff->onMessage(powerToggle);

  // wait for a connection
  while(io.status() < AIO_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  // we are connected
  Serial.println();
  Serial.println(io.statusText());
  digital->get();
  onoff->get();




}

void loop() {
   io.run();
   
   if(state == 0){
    ring.clear();
    ring.show();

   }
  
}

void handleMessage(AdafruitIO_Data *data) {
  Serial.print("received <- ");
  Serial.println(data->toString());


   if(state == 1){
      ring.clear(); //switch off all LEDs
      ring.fill(data->toNeoPixel()); //variavle in the handleMessage
    
       ring.show();
   }else{
     Serial.println("off");
   }


}

void powerToggle(AdafruitIO_Data *data) {
  Serial.print("received <- ");
  //Serial.print("received <- ");
  Serial.println(data->toInt());

  state = data->toInt();
  if(state == 1){
    ring.fill(blanc);
    ring.show();
  }

}