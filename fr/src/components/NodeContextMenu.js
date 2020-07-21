import React from "react";

class NodeContextMenu extends React.Component {
    render () {
        const x = this.props.x;
        const y = this.props.y;

        let handleClick = function(e) {
            e.stopPropagation();
        };

        return (
            <div className="nodeContextMenu" style={{left: x + 'px', top: y + 'px'}} onClick={handleClick}>
                <div className="header">{this.props.node.text}</div>
            </div>
        );
    }
}

export default NodeContextMenu;
