import React from 'react';
import {DatePicker, Card, message} from 'antd';
import { Row, Col } from 'antd';
import { Form, Input, Button} from 'antd';
import * as userService from "../services/userService";
import {postRequest_v3} from "../utils/Ajax";

class ManageForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const url = `http://49.235.245.206:8080/user/grant`;
                message.config({
                    prefixCls: 'my-message',
                    className: 'my-message'
                });
                const callback = (data) => {
                    if(data==1) {
                        alert("成功为该用户授予权限");
                    }
                    else{
                        alert("授权失败");
                    }
                };
                postRequest_v3(url, values, callback);
            }
        });
    };

    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form" data-testid="submitform">
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                            placeholder="Username" className="uinput"
                        />,
                    )}
                </Form.Item>

                <Form.Item>
                    <Button type="primary" data-textid="submit2" htmlType="submit" className="login-form-button">
                        为该用户授予管理员权限
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}


const ManageMember = Form.create({ name: 'normal_login' })(ManageForm);
export default ManageMember;