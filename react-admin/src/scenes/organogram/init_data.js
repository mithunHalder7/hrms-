const position = {x:0, y:0};

export const initNodes = [
    {
      id: '1',
      type: 'custom',
      data: { name: 'Jane Doe', job: 'CEO', emoji: '😎' },
      position: {x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight}
    },
    {
      id: '2',
      type: 'custom',
      data: { name: 'Tyler Weary', job: 'Designer', emoji: '🤓' },
      position: {x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight}
    },
    {
      id: '3',
      type: 'custom',
      data: { name: 'Kristi Price', job: 'Developer', emoji: '🤩' },
      position: {x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight}
    },
  ];

  export const initEdges = [
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

  export const make_positions=(nodes)=>
  {
    const nodeWidth = 172;
    const nodeHeight = 36;
  
    return nodes.map((data)=> {
      data.position.x = data.position.x - nodeWidth/2;
      data.position.y = data.position.y - nodeHeight/2;
      console.log(data.position);
    });
  };