import ReactDOM from "react-dom";
import { Main } from "../components/Main";

test('Render without crashing', () => {
  const div = document.createElement("div");
  ReactDOM.render(<Main />, div);
});