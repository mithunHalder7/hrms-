import React, { useCallback } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, MiniMap, Controls } from 'reactflow';

import 'reactflow/dist/base.css';

// import './tailwind-config.js';
import CustomNode from './components/CustomNode';
import './index.css';

import { Box, Grid, TextField, Typography } from "@mui/material";
import Header from "../../components/Header";
// import ReactFlow, { addEdge, ConnectionLineType, useNodesState, useEdgesState } from 'reactflow';
import dagre from 'dagre';
import 'reactflow/dist/style.css';
import {initNodes, initEdges, make_positions} from './init_data';




const nodeTypes = {
    custom: CustomNode,
  };

// const {newNodes} = make_positions(initNodes);

const OrganogramScene=()=>{

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
  

export default OrganogramScene;

