import {fireEvent, render} from "@testing-library/react";
import '@testing-library/jest-dom'
import RegiterView from "../view/RegiterView";
import React from "react";

test('register', () => {
    const { getByText,getByTestId} = render(<RegiterView/>);

    expect(getByText(/欢迎你的加入/i)).toBeInTheDocument();
    expect(getByText(/立即注册/i)).toBeInTheDocument();
    expect(getByTestId('uinput')).toHaveAttribute('placeholder', 'Username');
    expect(getByTestId('pinput')).toHaveAttribute('type', 'password');
    expect(getByTestId('pinput')).toHaveAttribute('placeholder', '输入密码');
    fireEvent.change(getByTestId('uinput'), { target: { value: 'test' } });
    expect(getByTestId('uinput')).toHaveProperty('value','test');
    expect(getByTestId('registerform')).not.toBeEmpty();
    expect(getByTestId('submitform')).not.toBeEmpty();

    const pinput = getByTestId('pinput');
    fireEvent.change(pinput, { target: { value: 'test' } });
    expect(pinput).toHaveProperty('value','test');

});

