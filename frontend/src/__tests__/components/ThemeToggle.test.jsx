import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import ThemeToggle from "../../components/ThemeToggle.jsx";
import { ThemeContext } from "../../ThemeContext.jsx";

describe("ThemeToggle", () => {
  it("renders without crashing", () => {
    const toggleTheme = vi.fn();
    const contextValue = { theme: "light", toggleTheme };

    render(
      <ThemeContext.Provider value={contextValue}>
        <ThemeToggle />
      </ThemeContext.Provider>
    );
  });

  it("renders the correct icon and classes based on the theme", () => {
    const toggleTheme = vi.fn();
    let contextValue = { theme: "light", toggleTheme };

    const { getByTestId, rerender } = render(
      <ThemeContext.Provider value={contextValue}>
        <ThemeToggle />
      </ThemeContext.Provider>
    );

    let circle = getByTestId("circle");
    expect(circle).toHaveClass(/circle-light/);

    contextValue = { theme: "dark", toggleTheme };

    rerender(
      <ThemeContext.Provider value={contextValue}>
        <ThemeToggle />
      </ThemeContext.Provider>
    );

    circle = getByTestId("circle");
    expect(circle).toHaveClass(/circle-dark/);
  });

  it("calls the toggleTheme function when the input is clicked", () => {
    const toggleTheme = vi.fn();
    const contextValue = { theme: "light", toggleTheme };

    const { getByTestId } = render(
      <ThemeContext.Provider value={contextValue}>
        <ThemeToggle />
      </ThemeContext.Provider>
    );

    const toggle = getByTestId("theme-toggle");
    fireEvent.click(toggle);

    expect(toggleTheme).toHaveBeenCalled();
  });
});
