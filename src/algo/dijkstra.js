export function dijkstra(grid,src,dst){
    const unvisitedNodes=grid.flat();
    //console.log(unvisitedNodes);
    let currNode=src;
    currNode.distance=0;

    const visitedNodes=[];
    let t=1;
    while(true)
    {
        sortArr(unvisitedNodes);
        // console.log(unvisitedNodes);
        currNode=unvisitedNodes.shift();
        currNode.isVisited=true;
        if(currNode.wallNode)
        {
            continue;
        }
        else {
            if (currNode.distance === Infinity)
                return visitedNodes;
            if (currNode === dst) {
                visitedNodes.push(currNode);
                return visitedNodes;
            }
            const neigh = getNeighbours(grid, currNode);
            updateneighs(neigh, currNode);
            visitedNodes.push(currNode);
        }
        //console.log(neigh);
    }
}
function updateneighs(neigh,currNode)
{
    for(let node of neigh)
    {
        node.distance=currNode.distance+1;
        node.prevNode=currNode;
    }
}
function getNeighbours(grid,currNode)
{
    const ret=[];
    const row=currNode.rowid;
    const col=currNode.colid;
    if(row>0)
    {
        if(!grid[row-1][col].isVisited)
            ret.push(grid[row-1][col]);
    }
    if(row<grid.length-1)
    {
        if(!grid[row+1][col].isVisited)
            ret.push(grid[row+1][col]);
    }
    if(col>0)
    {
        if(!grid[row][col-1].isVisited)
            ret.push(grid[row][col-1]);
    }
    if(col<grid[0].length-1)
    {
        if(!grid[row][col+1].isVisited)
            ret.push(grid[row][col+1]);
    }
    return ret;
}
function sortArr(arr){
    arr.sort((nodeA,nodeB)=>(nodeA.distance<nodeB.distance)?-1:1);
}