import { render, screen } from '@testing-library/react';
import { describe, it, expect } from "vitest";
import Homepage from '../pages/Homepage';

describe("example test", () => {
  it("should pass", () => {
    expect(true).toBe(true);
  });
});

describe("Homepage Component Tests", () => {
  it("renders the tagline and description", () => {
    render(<Homepage />);
    
    const tagline = screen.getByText("And... Presto!");
    expect(tagline).toBeInTheDocument();

    const description = screen.getByText("Your slides are your command.");
    expect(description).toBeInTheDocument();

    const additionalText = screen.getByText("Sign up or Login today.");
    expect(additionalText).toBeInTheDocument();
  });

  it("applies the correct initial animation styles", () => {
    render(<Homepage />);

    const homepageContainer = screen.getByTestId("homepage__container");

    expect(homepageContainer).toHaveStyle({
      transform: "translateX(0)",
      opacity: "1",
    });
  });

  it("renders additional text", () => {
    render(<Homepage />);
    const additionalText = screen.getByText("Sign up or Login today.");
    expect(additionalText).toBeInTheDocument();
  });
});
