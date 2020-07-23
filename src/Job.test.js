import React from "react";

import Adapter from "enzyme-adapter-react-16";
import { mount, shallow, configure } from "enzyme";
import Job from "./Job";
configure({ adapter: new Adapter() });

describe("when user click the button state value should changed", () => {
  const job = jest.fn();

  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Job job={job} />);
  });
  it("should render", () => {
    expect(wrapper).not.toBeNull();
  });

  it("button text change", () => {
    wrapper.find("#button").at(1).simulate("click");
    expect(wrapper.find("#button").first().text()).toEqual("Hide Detail");
  });

  //   test("user click button", () => {
  //     const setIsOpen = jest.fn();
  //     wrapper.find("#button").at(1).simulate("click");
  //     expect(setIsOpen).toHaveBeenCalled();
  //   });
});
