import { boot } from "quasar/wrappers";
import { Notify } from "quasar";

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot((/* { app, router, ... } */) => {
  // something to do
  Notify.registerType("error", {
    color: "red-4",
    textColor: "white",
    icon: "error",
    timeout: 1000,
  });
  Notify.registerType("success", {
    color: "green-4",
    textColor: "white",
    icon: "cloud_done",
    timeout: 500,
  });
});
