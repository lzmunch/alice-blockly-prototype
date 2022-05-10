// Move Camera
Blockly.defineBlocksWithJsonArray([
  {
    "type": "move_camera",
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
    'extensions': 'set_root'
  },
  // Parameters (variables) getter and setter
  // Getter
  {
    "type": "parameters_get",
    "message0": "%1",
    "args0": [
      {    // Beginning of the field variable dropdown
        "type": "field_variable",
        "name": "VAR",    // Static name of the field
        "variable": "default_var"    // Given at runtime
      }    // End of the field variable dropdown
    ],
    "output": null,    // Null means the return value can be of any type
  },
  // Setter
  {
    "type": "parameters_set",
    "message0": "%{BKY_VARIABLES_SET}",
    "args0": [
      {
        "type": "field_variable",
        "name": "VAR",
        "variable": "default_var"
      },
      {
        "type": "input_value",    // This expects an input of any type
        "name": "VALUE"
      }
    ],
  },
]);
Blockly.JavaScript['move_camera'] = function(block) {
  let amt = parseFloat(block.getFieldValue('AMT'));
  let dir = block.getFieldValue('DIR').split(',');

  let code = '';
  code += 'position.x += ' + dir[0]*amt + ';'
  code += 'position.y += ' + dir[1]*amt + ';'
  code += 'position.z += ' + dir[2]*amt + ';'
  code += 'console.log(position);';
  return code;
};

// Key Press Listener
Blockly.Blocks['on_key_pressed'] = {
  init: function() {
    this.appendDummyInput().appendField('onKeyPressed:')
    this.appendDummyInput().appendField('    do in order')
    this.appendStatementInput('do_in_order');

    this.setDeletable(false);
    this.setEditable(false);
  },
  extensions: 'add_do_in_order'
}
Blockly.JavaScript['on_key_pressed'] = function(block) {
  let code = 'document.addEventListener("keyup", (e) => { alert("key pressed"); });';
  code += 'console.log("added key press listener");';
  return code;
}

// Do In Order
Blockly.Blocks['do_in_order'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('do in order')
    this.appendStatementInput('DO');

    this.setDeletable(false);
    this.setMovable(false);
    this.setEditable(false);
  }
}
Blockly.JavaScript['do_in_order'] = function(block) {
  let branch = Blockly.JavaScript.statementToCode(block, 'DO');
  return branch + '\n';
}

// Use 'do in order' block as root, since built in function block not as flexible
// Blockly.Blocks['root_block'] = {
//   ...Blockly.Blocks['do_in_order'],
//   extensions: 'set_root'
// };
// Blockly.JavaScript['root_block'] = Blockly.JavaScript['do_in_order'];

//
// Blockly.Blocks['root_block'] = {
//   ...Blockly.Blocks['procedures_defnoreturn'],
//   extensions: 'set_root'
// };
// Blockly.JavaScript['root_block'] = Blockly.JavaScript['procedures_defnoreturn'];

Blockly.JavaScript['parameters_set'] = Blockly.JavaScript['variables_set'];
Blockly.JavaScript['parameters_get'] = Blockly.JavaScript['variables_get'];


