import React from 'react';



class Network extends React.Component {
    constructor(){
        super();
        this.canvas = React.createRef();
    }
    componentDidMount() {
        const canvas = this.canvas.current;
        if (canvas.getContext) {
            var ctx = canvas.getContext("2d");
            console.log(ctx);
            console.log(Object.getPrototypeOf(ctx));
            (function () {
                Object.getPrototypeOf(ctx).Triangle = function (x, y, r) {
                    this.save();
                    this.translate(x, y);
                    this.rotate(r);
                    this.beginPath();
                    this.moveTo(0, 0);
                    this.lineTo(10, 0);
                    this.lineTo(0, 10);
                    this.lineTo(-10, 0);
                    this.closePath();
                    this.fill();
                    this.restore();
                }
                Object.getPrototypeOf(ctx).line = function (x, y, x1, y1) {
                    this.save();
                    this.beginPath();
                    this.moveTo(x, y);
                    this.lineTo(x1, y1);
                    this.stroke();
                    this.restore();
                }
            })();
            ctx.strokeStyle = "#7C8B8C";
            ctx.line(90, 130, 320, 210);
            ctx.Triangle(320, 210, -Math.PI * .4);

        }

    }
    render(){
        return(
            <canvas ref={this.canvas} width="780" height="1800">
                您的浏览器不支持canvas，请更换浏览器.
            </canvas>
        )
    }












}

export default Network;