// Lights
const light_labels = ["Living Room", "Kitchen", "Bedroom", "Bathroom"];
const light_types = ["white", "yellow", "blue", "red"];
let room_lights = [false, false, false, false];

if (localStorage.getItem("Room_Lights") === null || localStorage.getItem("Room_Lights") === undefined) {
    room_lights = [false, false, false, false];
    localStorage.setItem("Room_Lights", JSON.stringify(room_lights));
} else {
    room_lights = JSON.parse(localStorage.getItem("Room_Lights"));
}

// AC
const AC_limit = [16, 30];
let AC_state = false;
let AC_temp = 24;

if (localStorage.getItem("AC_State") === null || localStorage.getItem("AC_State") === undefined) {
    AC_state = false;
    localStorage.setItem("AC_State", AC_state);
} else {
    AC_state = (localStorage.getItem("AC_State") === "true");
}

if (localStorage.getItem("AC_Temp") === null || localStorage.getItem("AC_Temp") === undefined) {
    AC_temp = 24;
    localStorage.setItem("AC_Temp", AC_temp);
} else {
    AC_temp = Number(localStorage.getItem("AC_Temp"));
}