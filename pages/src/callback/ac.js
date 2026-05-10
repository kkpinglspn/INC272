function ac_update(temp) {
  gauge.setValue(temp);
  localStorage.setItem("AC_Temp", temp);
  AC_temp = temp;
}

const ac_callback = () => {
  document.querySelector("#temp_up").addEventListener("click", function () {
    let temp = Number(AC_temp) + 1;

    if (temp > AC_limit[1]) {
      Swal.fire({
        title: "error",
        icon: "error",
        text: "Temperature cannot be higher than " + AC_limit[1] + "°C",
      });
    } else {
      ac_update(temp);
    }
  });

  document.querySelector("#temp_down").addEventListener("click", function () {
    let temp = Number(AC_temp) - 1;

    if (temp < AC_limit[0]) {
      Swal.fire({
        title: "error",
        icon: "error",
        text: "Temperature cannot be lower than " + AC_limit[0] + "°C",
      });
    } else {
      ac_update(temp);
    }
  });
};
