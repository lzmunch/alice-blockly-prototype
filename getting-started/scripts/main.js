/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
 (function() {

  let currentButton;

  function handlePlay(event) {
    loadWorkspace(event.target);

    try {
      let code = Blockly.JavaScript.workspaceToCode(Blockly.getMainWorkspace());
      code += 'MusicMaker.play();';

      eval(code);
    } catch (error) {
      console.log(error);
    }
  }

  function runCode() {
    try {
      let code = Blockly.JavaScript.workspaceToCode(Blockly.getMainWorkspace());
      code += 'MusicMaker.play();';

      eval(code);
    } catch (error) {
      console.log(error);
    }
  }

  function loadWorkspace(button) {
    let workspace = Blockly.getMainWorkspace();
    if (button.blocklySave) {
      Blockly.serialization.workspaces.load(button.blocklySave, workspace);
    }
  }

  function save(button) {
    button.blocklySave = Blockly.serialization.workspaces.save(
        Blockly.getMainWorkspace());    
  }

  function handleSave() {
    // document.body.setAttribute('mode', 'blockly');
    save(currentButton);
  }

  function enableSceneMode() {
    document.body.setAttribute('mode', 'scene');
  }

  function enableBlocklyMode(e) {
    document.body.setAttribute('mode', 'blockly');
    currentButton = e.target;
    loadWorkspace(currentButton);
  }

  document.querySelector('#edit').addEventListener('click', enableBlocklyMode);
  document.querySelector('#scene').addEventListener('click', enableSceneMode);
  document.querySelector('#save').addEventListener('click', handleSave);
  document.querySelector('#run').addEventListener('click', runCode);

  enableSceneMode();

  const toolbox = {
    'kind': 'flyoutToolbox',
    'contents': [
      {
        'kind': 'block',
        'type': 'controls_repeat_ext',
        'inputs': {
          'TIMES': {
            'shadow': {
              'type': 'math_number',
              'fields': {
                'NUM': 5,
              },
            },
          },
        },
      },
      {
        'kind': 'block',
        'type': 'play_sound',
      },
    ],
  };

  Blockly.inject('blocklyDiv', {
    toolbox: toolbox,
    scrollbars: false,
  });

  // enableBlocklyMode();
})();
