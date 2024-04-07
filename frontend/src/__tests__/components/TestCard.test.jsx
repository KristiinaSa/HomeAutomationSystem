/* eslint-env jest */
import { render, screen } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import TestCard from "../../components/TestCard.jsx";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCoffee as faLightbulb } from "@fortawesome/free-solid-svg-icons";
import i18n from "../../i18n.js";

library.add(faLightbulb);

describe("TestCard", () => {
  it("renders correctly", () => {
    const mockCardTest = {
      title: "Test Title",
      icon: "lightbulb",
      status: "on",
    };

    render(
      <I18nextProvider i18n={i18n}>
        <TestCard {...mockCardTest} />
      </I18nextProvider>
    );

    const titleElement = screen.getByText("On");
    expect(titleElement).toBeInTheDocument();
  });

  it("renders correctly in Japanese", async () => {
    const mockCardTest = {
      title: "Test Title",
      icon: "lightbulb",
      status: "on",
    };

    await i18n.changeLanguage("jp");
    render(
      <I18nextProvider i18n={i18n}>
        <TestCard {...mockCardTest} />
      </I18nextProvider>
    );

    const statusElement = screen.getByText("オン");
    expect(statusElement).toBeInTheDocument();
  });

  it("renders correctly in Finnish", async () => {
    const mockCardTest = {
      title: "Test Title",
      icon: "lightbulb",
      status: "on",
    };

    await i18n.changeLanguage("fi");
    render(
      <I18nextProvider i18n={i18n}>
        <TestCard {...mockCardTest} />
      </I18nextProvider>
    );

    const statusElement = screen.getByText("Päällä");
    expect(statusElement).toBeInTheDocument();
  });
});
