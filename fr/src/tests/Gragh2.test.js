import {fireEvent, render} from "@testing-library/react";
import Gragh2 from "../components/Gragh2";
import React from "react";

test('register', () => {

    const { getByText,getByTestId,mock } = render(<Gragh2/>);
    expect(getByTestId('container2')).toBeInTheDocument();
    expect(getByTestId('Gragh2')).toBeInTheDocument();

});

