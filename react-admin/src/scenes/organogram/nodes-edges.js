const position = { x: 0, y: 0 };
const edgeType = 'smoothstep';

export const initialNodes = [
  {
    id: '1',
    type: 'custom',
    data: { name: 'Jane Doe', job: 'CEO', emoji: '😎' },
    position,
  },
  {
    id: '2',
    type: 'custom',
    data: { name: 'Tyler Weary', job: 'Designer', emoji: '🤓' },
    position,
  },
  {
    id: '3',
    type: 'custom',
    data: { name: 'Kristi Price', job: 'Developer', emoji: '🤩' },
    position,
  },
];

export const initialEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    type: edgeType,
    animated: true,
  },
  {
    id: 'e1-3',
    source: '1',
    target: '3',
    type: edgeType,
    animated: true,
  },
];