import React, { useCallback } from 'react';
import ReactFlow, { addEdge, ConnectionLineType, useNodesState, useEdgesState, Background, MiniMap } from 'reactflow';
import dagre from 'dagre';
import 'reactflow/dist/style.css';

import { initialNodes, initialEdges } from './nodes-edges.js';

import './index.css';
import CustomNode from './components/CustomNode.js';
import { Box } from '@mui/material';
import Header from '../../components/Header.jsx';
import DataPosition from './all_data/Data_positions.json';
import { Controls } from 'reactflow';
import useFetch from './useFetch.js';

const nodeTypes = {
    custom: CustomNode,
  };



const dagreGraph = new dagre.graphlib.Graph();

dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 180;
const nodeHeight = 105;

const getLayoutedElements = (nodes, edges, direction = 'TB') => {
  if(nodes === null || edges === null)
  {
    return null;
  }
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);
  
  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? 'left' : 'top';
    node.sourcePosition = isHorizontal ? 'right' : 'bottom';

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};


// const makeNodes=()=>
// {
//     let arr = [];
//     DataPosition.map((items) => arr.push(items));
//     console.log(arr);
//     return arr;
// }

// const arr = makeNodes();
// let initNode = JSON.parse(window.localStorage.getItem('user'));
// let initEdge = JSON.parse(window.localStorage.getItem('edges'));
// console.log(initEdge);
// if(initNode === null)
// {
//   initNode = Array.from(initNode);
//   initEdge = Array.from(initEdge);
// }



// const obj = {
//           id: values.পদের_নাম.toString(),
//           type: 'custom',
//           data: { name: '', job: pName.toString(), emoji: '', department: values.বিভাগ },
//           position: { x: 0, y: 0 },
//         };



const onNodeClick = (event, node) => {

  // console.log(window.localStorage.getItem('edges'));

  window.localStorage.setItem('parent', JSON.stringify(node.id));
  window.localStorage.setItem('parent_pos', JSON.stringify(node.data.job));
  // console.log(window.localStorage.getItem('parent'));
  // console.log(window.localStorage.getItem('edges'));
  // makeNodes();
  // var newObj = window.localStorage.getItem('user');
  // console.log(node.data.job);

}


const initNode = JSON.parse(window.localStorage.getItem('nodes'));
const initEdge = JSON.parse(window.localStorage.getItem('edges'));

console.log(initNode);




const AsholOrganogram = () => {
  
  // console.log(initEdges);

  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    initNode,
    initEdge
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge({ ...params, type: ConnectionLineType.SmoothStep}, eds)
      ),
    []
  );
  const onLayout = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        nodes,
        edges,
        direction
      );

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges]
  );

  const [captureElementClick, setCaptureElementClick] = React.useState(true);

  return (
    <div className="layoutflow">
        <Box mx="60px">
        <Header
          title="অরগানোগ্রাম"
          subtitle="সামগ্রিক অরগানোগ্রাম"
        />
        </Box>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        connectionLineType={ConnectionLineType.SmoothStep}
        onNodeClick={captureElementClick ? onNodeClick : undefined}
        fitView
        className="bg-teal-50"
        style={
          {height : "400px"}
        }
      >
      <Background color='#000'/>
      <MiniMap />
      <Controls />
      </ReactFlow>
      <div className="controls">
        <button onClick={() => onLayout('TB')}>vertical layout</button>
        <button onClick={() => onLayout('LR')}>horizontal layout</button>
      </div>
    </div>
  );
};


export default AsholOrganogram;