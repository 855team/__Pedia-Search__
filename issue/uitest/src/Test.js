import { Popover, Button } from 'antd';
import React from 'react';



class Test extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false
        };
    }

    hide = () => {
        this.setState({
            visible: false,
        });
    };

    handleVisibleChange = visible => {
        this.setState({ visible });
    };

    render() {
        let para=[]
        para.push(<a style={{textDecoration:"underline",color:"black",cursor: "not-allowed"}}>这是文章</a>)
        para.push(<br/>)
        para.push(<a onClick={this.hide}>Close</a> )
        return (
            <div>
            <Popover
                style={{width:'500vw'}}
                content={para}
                title="tagname"
                trigger="click"
                visible={this.state.visible}
                onVisibleChange={this.handleVisibleChange}
            >
                <Button type="primary">Click me</Button>
            </Popover>
            </div>
        );
    }
}

export default Test;