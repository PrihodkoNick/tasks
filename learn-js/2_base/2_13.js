// Напишите if..else, соответствующий следующему switch:

let browser = "Chrome";

switch (browser) {
  case "Edge":
    console.log("You've got the Edge!");
    break;

  case "Chrome":
  case "Firefox":
  case "Safari":
  case "Opera":
    console.log("Okay we support these browsers too");
    break;

  default:
    console.log("We hope that this page looks ok!");
}

if (browser === "Edge") {
  console.log("You've got the Edge!");
} else if (
  browser === "Chrome" ||
  browser === "Firefox" ||
  browser === "Safari" ||
  browser === "Opera"
) {
  console.log("Okay we support these browsers too");
} else {
  console.log("We hope that this page looks ok!");
}
