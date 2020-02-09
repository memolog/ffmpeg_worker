import { h, render } from "preact";
import { App } from "./app/app";
import "../scss/index.scss";

async function main () {
  const element = document.getElementById("container");
  if (element) {
    render(<App />, element);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", main);
} else {
  main();
}

export default main;
