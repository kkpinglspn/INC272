function createGrids(r, c) {
  const grids = new Grids({
    rows: r,
    cols: c,
  });
  return grids;
}

function createButtons() {
  const classes = [
    "success",
    "warning",
    "danger",
    "primary",
    "secondary",
    "dark",
  ];

  const buttons = [];

  classes.map((c) => {
    // buttons.push(new Button({ className: c, text: c }));
    buttons.push(new Button({ className: c, text: "Button" }));
  });
  return buttons;
}

function controllerTable() {
  for (let i = 0; i < 3; i++) {
    const buttons = createButtons();
    const Cols = 6;
    const grids = createGrids(1, Cols);

    let bi = 0;

    for (let j = 0; j < Cols; j++) {
      grids.addChildTo(0, j, buttons[bi++]); // fill row by row
    }
  }
}

// Plotting

// Create and return a Plotter widget
function createPlot() {
    const plotter = new Plotter({
        min: 0,
        max: 100,   // ADC values are scaled from 0–1023 to 0–100 before plotting
        samples: 30,
        step: 5
    });
    plotter.clear();
    return plotter;
}

// Called by adcCallback each time a new ADC value arrives from the simulator
function updatePlot(ch, val) {
    val = val * 100 / 1023; // scale ADC range 0–1023 to plotter range 0–100
    Data[ch] = val;         // update this channel's entry in the shared array
    Plot.addPoint(Data);    // plot the current snapshot of all four channels
}