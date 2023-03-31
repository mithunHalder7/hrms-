import React, { useCallback } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, MiniMap, Controls } from 'reactflow';

import 'reactflow/dist/base.css';

// import './tailwind-config.js';
import CustomNode from './components/CustomNode';
import './index.css';

import { Box, TextField } from "@mui/material";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";


const nodeTypes = {
  custom: CustomNode,
};

const initNodes = [
  {
    id: '1',
    type: 'custom',
    data: { name: 'Jane Doe', job: 'CEO', emoji: '😎' },
    position: { x: 0, y: 50 },
  },
  {
    id: '2',
    type: 'custom',
    data: { name: 'Tyler Weary', job: 'Designer', emoji: '🤓' },
    position: { x: -200, y: 200 },
  },
  {
    id: '3',
    type: 'custom',
    data: { name: 'Kristi Price', job: 'Developer', emoji: '🤩' },
    position: { x: 200, y: 200 },
  },
];

const initEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
  },
  {
    id: 'e1-3',
    source: '1',
    target: '3',
  },
];


const Organogram = () => {

  const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  return (
    <div className="layoutflow">
      <Box m="20px">
      <Header
        title="অরগানোগ্রাম"
        subtitle="সামগ্রিক অরগানোগ্রাম"
      />
      </Box>
      <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      fitView
      className="bg-teal-50"
      >
      <MiniMap />
      <Controls />
    </ReactFlow>
    </div>
  );
};

export default Organogram;
      

  