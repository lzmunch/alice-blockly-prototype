'use strict';

let workspace = null;

var position = { x: 0, y:0, z:0 };

(function() {

function runCode() {
	console.log('Output -->')
	position = { x: 0, y:0, z:0 };
  try {
    let code = Blockly.JavaScript.workspaceToCode(Blockly.getMainWorkspace());
    // do more securely eventually
    eval(code);
  } catch (error) {
    console.log(error);
  }
}

document.querySelector('#runBtn').addEventListener('click', runCode);

let toolbox = {
  'kind': 'categoryToolbox',
  'contents': [
    {
      'kind': 'category',
      'name': 'Shark',
      'contents': [
        {
          'kind': 'block',
          'type': 'play_sound'
        },
      ]
    },
    {
      'kind': 'category',
      'name': 'Basic',
      'contents': [
        {
        	'kind': 'block',
        	'type': 'controls_repeat'
        },
        {
        	'kind': 'block',
        	'type': 'controls_repeat_ext'
        },
        {
        	'kind': 'block',
        	'type': 'controls_whileUntil'
        },
        {
        	'kind': 'block',
        	'type': 'controls_forEach'
        },
        {
          'kind': 'block',
          'type': 'controls_if'
        },
      ]
    },
  ]
}

// function start() {
//   // Create main workspace.
//   workspace = Blockly.inject('blocklyDiv',
//       {
//         toolbox: toolbox,
//       });
// }


Blockly.inject('blocklyDiv',
      {
        toolbox: toolbox,
      });

})();
