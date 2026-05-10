// ------------------------------------------
// ============ LED Controller ==============
// ------------------------------------------

function LEDController(link) {
  const classes = "primary";
  const labelText = "Toggle";

  let uid = 0;

  const buttons = [];
  const labels = light_labels;

  labels.forEach((label) => {
    const button = new Button({
      text: `${labelText} ${label}`,
      uid: uid,
      className: classes,
      iconLeft: "lightbulb-o",
      iconRight: "none",
      callback: (btn) => {
        const id = btn.uid;
        link.ledInv(id); // send toggle command to the simulator

        link.ledGet(id, (uid, sts, err) => {
          console.log(id, sts, new Date().toLocaleTimeString());
          leds[id].setStatus(sts);
          room_lights[id] = sts ? true : false

          localStorage.setItem("Room_Lights", JSON.stringify(room_lights));
        });
      },
    });
    uid++;
    buttons.push(button);
  });
}

// -----------------------------------------
// ============ AC Controller ==============
// -----------------------------------------

function createACGuage() {
  let gauge = new Gauge({
    min: AC_limit[0],
    max: AC_limit[1],
    uid: 50
  });

  gauge.setValue(AC_temp);
  return gauge;
}

function ACController(link, ui) {
  let acStateContainer = document.createElement("div");
  acStateContainer.classList.add("ac-container");
  acStateContainer.innerHTML += `<button id="ac_state" class="btn btn-primary text-white">Toggle AC</button>`;
  document.body.appendChild(acStateContainer);

  gauge = createACGuage();

  ui.Utils.newLine();

  let acContainer = document.createElement("div");
  acContainer.classList.add("ac-container");
  acContainer.innerHTML += `<button id="temp_down" class="btn btn-primary text-white">-</button>`;
  acContainer.innerHTML += `<button id="temp_up" class="btn btn-primary text-white">+</button>`;

  document.body.appendChild(acContainer);
  ac_callback();
}
