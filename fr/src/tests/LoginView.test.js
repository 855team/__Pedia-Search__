import {render} from "@testing-library/react";
import LoginView from "../view/LoginView";
import React from "react";

test('register', () => {
    const { getByText,getByTestId } = render(<LoginView/>);

    expect(getByText(/Welcome to PediaSearch/i)).toBeInTheDocument();
    expect(getByText(/立即注册/i)).toBeInTheDocument();
    expect(getByText(/Log in/i)).toBeInTheDocument();
    expect(getByTestId('uinput')).toHaveAttribute('placeholder', 'Username');
    expect(getByTestId('pinput')).toHaveAttribute('type', 'password');
    expect(getByTestId('pinput')).toHaveAttribute('placeholder', 'Password');
    expect(getByTestId('loginform')).not.toBeEmpty();
    expect(getByTestId('submitform')).not.toBeEmpty();

});

