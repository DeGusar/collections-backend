const app = require("./app");

const PORT = process.env.PORT || 5000;

try {
  app.listen(PORT, () => console.log(`server started on ${PORT}`));
} catch (e) {
  console.log(e);
}
