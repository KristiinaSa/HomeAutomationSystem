/* eslint-env jest */
import { render, screen } from "@testing-library/react";
import TestCard from "../../components/TestCard.jsx";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCoffee as faLightbulb } from "@fortawesome/free-solid-svg-icons";

library.add(faLightbulb);

describe("TestCard", () => {
  it("renders correctly", () => {
    const mockCardTest = {
      title: "Test Title",
      icon: "lightbulb",
      count: 2,
    };

    render(<TestCard {...mockCardTest} />);

    const titleElement = screen.getByText("Test Title");
    expect(titleElement).toBeInTheDocument();

    const countElement = screen.getByText("2 On");
    expect(countElement).toBeInTheDocument();
  });
});
