import { render, screen } from '@testing-library/react';
import App from './App';
import Form from './components/Form';
import DallasPostList from './components/DallasPostList';
//import Dallas from '/Pages/Dallas';
import Login from './components/Login';
import { Nav } from './components/NavBar/NavBarElements';

// test("renders add Button", () => {
//   render(<Form />);
//   screen.getByRole("button", {
//     name: /submit/
//   });
// });

describe("App", () => {
  test("renders App component", () => {
    render(<App />);
  });
});

describe("Form", () => {
  test("render the Form component", () => {
    render(<Form />);
  });
});

describe("DallasPostList", () => {
  test("render the Form component", () => {
    render(<DallasPostList />);
  });
});

test("renders login Button", () => {
  render(<Login />);
  screen.getByRole("button", {
    name: /Login/
  });
});

describe("Nav", () => {
  test("render the Form component", () => {
    render(<Nav />);
  });
});