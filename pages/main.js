function init(link) {
  const types = ["red", "green", "yellow", "white"];
  const labels = ["LED #3", "LED #2", "LED #1", "LED #0"];

  let uid = 0;
  types.forEach((type) => {
    let led = new Led({
      type: type,
      uid: 3 - uid, // uid 3, 2, 1, 0 from left to right
      label: labels[uid],
      callback: (targetLed, evt) => {
        link.ledGet(targetLed.uid, (uid, sts, err) => {
          // read current state from simulator
          if (!err) {
            let status = sts;
            link.ledWrt(targetLed.uid, !status); // write the inverted state
            led.setStatus(status); // update display with the pre-inversion state
          }
        });
      },
    });
    led.setTextColor("#08f");
    uid++;
  });
}

function main() {
  console.log("main Function appears!");

  const link = new WSLink({
        conCallback: (ws) => { },
        datCallback: (ws, evt) => { },
        ledCallback: (ch, sts) => { },
        pswCallback: (ch, sts) => { },
        adcCallback: (ch, val, dif, dir) => { }
    });
    init(link);
}
