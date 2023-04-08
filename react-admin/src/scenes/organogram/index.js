import React, { useCallback } from 'react';
import 'reactflow/dist/base.css';
import './index.css';
import { Box, Grid, TextField, Typography } from "@mui/material";
import Header from "../../components/Header";
import DataPos from './all_data/positioned';
import DefaultScreen from './DefaultScreen';
// import OrganogramScene from './OrganogramScreen';
import AsholOrganogram from './AsholOrganogram';
import useFetch from './useFetch';



const makeNodes = (node) => {
  if (!node.employee) {
    // console.log("true");
    return {
      id: node.id.toString(),
      type: 'custom',
      data: { name: '', job: node.name, emoji: '', department: node.department.name, dep_id: node.department.id },
      position: {},
    }
  }
  return {
    id: node.id.toString(),
    type: 'custom',
    data: { name: node.employee.name, job: node.name, emoji: '', department: node.department.name, dep_id: node.department.id },
    position: {},
  };
}
const makeFnode=(node)=>
{
  if (!node.employee) {
    return {
      id: node.id.toString(),
      type: 'custom',
      data: { name: '', job: node.name, emoji: '', department: node.department.name, dep_id: node.department.id },
      position: {x:0,y:0},
    }
  }
  return {
    id: node.id.toString(),
    type: 'custom',
    data: { name: node.employee.name, job: node.name, emoji: '', department: node.department.name, dep_id: node.department.id },
    position: {x:0,y:0},
  };
}


const makeFedge=(nodes)=>
{
  let newID = "e-".concat(nodes.id);

  const edge ={
    id: newID,
    source: nodes.id.toString(),
    target: nodes.parent_id.toString(),
    type: 'smoothstep',
    style: { stroke: '#CA4E79' }
  }
  return edge;
}

const makeEdges=(nodes)=>
{
  let newID = "e-".concat(nodes.id);

  const edge ={
    id: newID,
    source: nodes.parent_id.toString(),
    target: nodes.id.toString(),
    type: 'smoothstep',
    style: { stroke: '#CA4E79' }
  }
  return edge;
}




const Organogram = () => {
  const [open, setOpen] = React.useState(false);
  const chuncks = useFetch("http://localhost:5000/office_post");
  const initNodes = chuncks.map((items)=>(items.parent_id == -1)?makeFnode(items): makeNodes(items));

  const initEdges = chuncks.map((items)=>(items.parent_id == -1)?makeFedge(items): makeEdges(items));
  window.localStorage.setItem('nodes', JSON.stringify(initNodes));
  window.localStorage.setItem('edges', JSON.stringify(initEdges));
  console.log(initNodes);

// window.localStorage.clear();
  // console.log(window.localStorage.length);
  if(initNodes.length === 0)
  {
    return <DefaultScreen open={open} setOpen = {setOpen}/>
  }

  else 
  {
    return (
      // <OrganogramScene/>
      <AsholOrganogram/>
    );

  }
  
};

export default Organogram;
      

  