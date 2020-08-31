import React, {Component} from "react";
import './Node.css'
class Node extends Component
{
    constructor(props) {
        super(props);
    };
    render(){
        if(this.props.index.issrc)
        {
            return (
                <div className="node src"></div>
            );
        }
        else if(this.props.index.isdst)
        {
            return (
                <div className="node dst"></div>
            );
        }
        else if(this.props.index.wallNode)
        {
            return (
                <div className="node wall" ></div>
            );
        }
        else {
            return (
                <div className="node" id={`node-${this.props.index.rowid}-${this.props.index.colid}`}
                     onMouseDown={()=>this.props.mouseclick(this.props.index.rowid,this.props.index.colid)}
                     onMouseEnter={()=>this.props.mousedrag(this.props.index.rowid,this.props.index.colid)}
                     onTouchEnd={this.props.mouseup}
                ></div>
            );
        }
    }
}
export default Node;