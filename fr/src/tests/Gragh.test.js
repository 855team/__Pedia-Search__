import {fireEvent, render} from "@testing-library/react";
import Gragh from "../components/Gragh";
import React from "react";

test('register', () => {
    const { getByText,getByTestId } = render(<Gragh/>);

    expect(getByTestId('gragharea')).not.toBeEmpty();
    expect(getByTestId('card')).not.toBeEmpty();
    expect(getByTestId('sider')).not.toBeEmpty();
    expect(getByTestId('content')).not.toBeEmpty();
});

