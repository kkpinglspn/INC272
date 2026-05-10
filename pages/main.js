let leds, btns, guage;

function init(link, ui) {
  headingCreator("Smart Home Control Panel", 3);
  ui.Utils.newLine();

  headingCreator("Lights Controller", 4);
  ui.Utils.newLine();

  leds = LED(link);
  ui.Utils.newLine();
  btns = LEDController(link, leds);
  ui.Utils.newLine();
  ui.Utils.newLine();
  ui.Utils.newLine();

  headingCreator("AC Controller", 4);
  ui.Utils.newLine();
  ACController(link, ui);
}

function main(ui) {
  const link = new WSLink({
    conCallback: (ws) => {},
    datCallback: (ws, evt) => {},
    ledCallback: (ch, sts) => {},
    pswCallback: (ch, sts) => {},
    adcCallback: (ch, val, dif, dir) => {},
  });

  init(link, ui);
}
