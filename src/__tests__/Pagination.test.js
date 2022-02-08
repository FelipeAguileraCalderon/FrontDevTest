import ReactDOM from "react-dom";
import { Pagination } from "../components/Pagination";

test('Render without crashing', () => {
  const div = document.createElement("div");
  ReactDOM.render(<Pagination />, div);
});