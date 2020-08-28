import React, {Component} from 'react';
import Node from './Node'
import './PathFinder.css'
import {dijkstra} from "./algo/dijkstra";
const begining=[1,1];
const end=[10,19];
class PathFinder extends Component {
    constructor() {
        super();
        this.state = {
            grid: [[]],
            isMousePressed: false,
        };
    }
    componentDidMount() {
        const grid=MakeGrid();
        this.setState({grid});
    }
    runDijkastra(){
        const grid=this.state.grid;
        const src=grid[begining[0]][begining[1]];
        const dst=grid[end[0]][end[1]];
        const visitedNodes=dijkstra(grid,src,dst);
        this.visualizeDijkstra(visitedNodes);
    }
    optimalPath(visitedNode){
        console.log(visitedNode);
        if(visitedNode[visitedNode.length-1].isdst) {
            const arr = [];
            let currNode = visitedNode[visitedNode.length - 1];
            while (!currNode.issrc) {
                arr.push(currNode);
                currNode = currNode.prevNode;
            }
            arr.push(currNode);
            return arr;
        }
        else
            return [];
    }
    visualizeDijkstra(visitedNodes) {
        for (let i = 1; i <= visitedNodes.length; i++) {
            if (i === visitedNodes.length  ) {
                const opPath = this.optimalPath(visitedNodes);
                if(opPath.length!==0)
                {
                    setTimeout(() => {
                        for (let i = 1; i < opPath.length - 1; i++) {
                            setTimeout(() => {
                                const node = opPath[i];
                                document.getElementById(`node-${node.rowid}-${node.colid}`).className =
                                    'node path';
                            }, 50 * i);
                        }
                    }, 10 * i);
                }
                else
                {
                    setTimeout(()=>alert("No Path Found"),10*i);
                }
            }
            else {
                setTimeout(() => {
                    const node = visitedNodes[i];
                        if(!node.isdst )
                        {
                        //console.log(document.getElementById(`node-${node.rowid}-${node.colid}`));
                        document.getElementById(`node-${node.rowid}-${node.colid}`).className =
                            'node visited';
                }}, 10 * i);

            }
        }
    }
    handlemouseClick(row,col)
    {
        const newgrid=gridwithWalls(this.state.grid,row,col);
        this.setState({grid: newgrid, isMousePressed: true});
    }
    handlemousedrag(row,col)
    {
        if(this.state.isMousePressed)
        {
            const newgrid=gridwithWalls(this.state.grid,row,col);
            this.setState({grid: newgrid, isMousePressed: true});
        }
        else
            return;
    }
    handlemouseUp()
    {
        this.setState({isMousePressed: false});
    }
    render() {
        return(
            <div style={{marginTop: "10px"}}>
            <button onClick={()=>this.runDijkastra()}>Find Path</button>
            <div style={{marginTop: "10px"}}>
            {this.state.grid.map((row)=>{
                return(
                    <div className="row-mine">
                        {row.map((node)=>{
                    return(
                        <Node index={node} mouseclick={(row,col)=>this.handlemouseClick(row,col)}  mouseup={()=>this.handlemouseUp()}  mousedrag={(row,col)=>this.handlemousedrag(row,col)}></Node>
                    );}
                    )
                        }
                    </div>
            )
            })}
            </div>
            </div>
        )
    }
}
function MakeGrid(){
    const grid= [];
    for(let i=0;i<50;i++)
    {
        const arr=[];
        for(let j=0;j<50;j++)
        {
            arr.push(MakeNode(i,j));
        }
        grid.push(arr);
    }
    return grid;
}
function MakeNode(row,col){
    return({
        rowid: row,
        colid: col,
        isVisited: false,
        issrc: row===begining[0] && col===begining[1],
        isdst: row===end[0]&&col===end[1],
        prevNode: null,
        wallNode: false,
        distance: Infinity,
    })
}
function gridwithWalls(grid,row,col){
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        wallNode: !node.wallNode,
    };
    newGrid[row][col] = newNode;
    return newGrid;
}
export default PathFinder;