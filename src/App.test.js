import ReactDOM from "react-dom";
import App from './App';

test('Render without crashing', () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});
