import { a, b, c } from "./a";

console.log(a, b, c);

import("./lazy").then((res) => {
  console.log(res, "~res");
});
