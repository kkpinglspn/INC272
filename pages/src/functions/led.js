function LED(link) {
  const types = light_types
  const labels = light_labels;

  let uid = 0;
  const leds = [];

  types.forEach((type) => {
    let led = new Led({
      type: type,
      uid: uid,
      label: labels[uid],
    });
    led.setTextColor("#fff");
    led.setStatus(room_lights[uid] ? 1 : 0); // default off
    uid++;
    leds.push(led);
  });

  return leds;
}

// ------------------------------------------------
// ------------------------------------------------
