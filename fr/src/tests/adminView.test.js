import {render} from "@testing-library/react";
import AdminView from "../view/AdminView";
import React from "react";

test('admin', () => {
    const { getByText,QueryByText,getByTestId } = render(<AdminView/>);
    const title=getByText("Pedia Search");
    expect(title).toBeInTheDocument();
    const menu=getByTestId("label0");
    expect(menu).toBeInTheDocument();
    const item1=getByTestId("label1");
    expect(item1).toBeInTheDocument();
    const item2=getByTestId("label2");
    expect(item2).toBeInTheDocument();
    const button=getByText("为该用户授予管理员权限");
    expect(button).toBeInTheDocument();

});
