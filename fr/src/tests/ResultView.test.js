import {render} from "@testing-library/react";
import IndexView from "../view/IndexView";
import React from "react";

test('register', () => {
    const { getByText,getByTestId } =render (<IndexView/>);
    const title=getByText(/Pedia Search/i);
    expect(title).toBeInTheDocument();
    expect(getByTestId('searchinput')).toBeInTheDocument();

    const notlogin=getByTestId('notlogin');
    expect(notlogin).not.toBeEmpty();
    expect(notlogin).toHaveAttribute('value','right');

    expect(getByTestId('tologin')).toBeInTheDocument();
    //expect(getByTestId('gragh1-container')).toBeInTheDocument();
    //expect(getByTestId('gragharea')).toBeInTheDocument();


});