import { render, screen } from "@testing-library/react";
import Navbar from "../components/Navbar";
import { store } from "../redux-store/Store";
import { Provider } from "react-redux";

import userEvent from "@testing-library/user-event";

test("renders Basic Element in Navbar", () => {
  render(
    <Provider store={store}>
          <Navbar />
    </Provider>
  );
 
  const LoginElement = screen.getByText(/Login/i);
  expect(LoginElement).toBeInTheDocument();
  const LogoElement = screen.getByText(/video-gallery/i);
  expect(LogoElement).toBeInTheDocument();
 
 
});