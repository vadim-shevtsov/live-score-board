import { render, screen } from "@testing-library/react";

import App from "../App";

test("renders scoreboard heading", () => {
  render(<App />);
  expect(screen.getByText(/live football world cup scoreboard/i)).toBeInTheDocument();
});