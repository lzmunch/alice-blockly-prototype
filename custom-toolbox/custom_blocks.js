Blockly.defineBlocksWithJsonArray([
  {
    "type": "play_sound",
    "message0": "Move %1 %2 units",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "DIR",
        "options": [
          ["Right", "1,0,0"],
          ["Left", "-1,0,0"],
          ["Down", "0,-1,0"],
          ["Up", "0,1,0"],
        ]
      },
      {
        "type": "field_dropdown",
        "name": "AMT",
        "options": [
          ["0.0", "0.0"],
          ["0.5", "0.5"],
          ["1.0", "1.0"],
          ["2.0", "2.0"],
        ]
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 355,
  },
]);

Blockly.JavaScript['play_sound'] = function(block) {
  let amt = parseFloat(block.getFieldValue('AMT'));
  let dir = block.getFieldValue('DIR').split(',');

  let code = '';
  code += 'position.x += ' + dir[0]*amt + ';'
  code += 'position.y += ' + dir[1]*amt + ';'
  code += 'position.z += ' + dir[2]*amt + ';'
  code += 'console.log(position);';
  return code;
};
