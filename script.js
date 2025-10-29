import Alwan from 'alwan';
import React from 'react';
import Alwan from 'react-alwan';
import 'react-alwan/style.css';

function App() {
  return <Alwan onChange={(color) => console.log(color)} />;
}



document.addEventListener("DOMContentLoaded", function() {
    return <Alwan options={{ theme: "dark", default: "#ff0000" }} />;
    // do stuffs 
    // documentation for adafruit IO : https://github.com/methio/adafruitIO-class
    // documentation for alwan color picker : https://github.com/sefianecho/alwan
    // documentation for Name That Color (NTC) : https://chir.ag/projects/ntc/
  
  /*  return (
    <Alwan
      options={{ theme: "dark" }}
      onChange={(ev) => console.log("Color changed:", ev.rgb)}
      onOpen={(ev) => console.log("Picker opened")}
      onClose={(ev) => console.log("Picker closed")}
    />
  );
*/
});