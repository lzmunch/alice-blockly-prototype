'use strict';

// global vars
let workspace = null;
var position = { x: 0, y:0, z:0 };
let currentTab;

(function() {

// Functions

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

function setupWorkspace(workspace) {
	try {
		var parentBlock = workspace.newBlock('root_block');
		parentBlock.initSvg();
		parentBlock.render();
	} catch(e) {
		console.log(e)
	}
	workspace.addChangeListener(Blockly.Events.disableOrphans);
}

function loadWorkspace(tab) {
	let workspace = Blockly.getMainWorkspace();
	workspace.clear();
	let saved = tab.blocklySave;
	if (saved) {
	  Blockly.serialization.workspaces.load(saved, workspace);
	} 
	else { // fresh workspace
		setupWorkspace(workspace);
	}
	return workspace;
}

function saveWorkspace(tab) {
	tab.blocklySave = Blockly.serialization.workspaces.save(Blockly.getMainWorkspace()); 
}

function switchTab(e) {
	// save previous workspace, update current tab, and load workspace
	saveWorkspace(currentTab);
	currentTab = e.target;
	let workspace = loadWorkspace(currentTab);

	// update tabs
	document.querySelectorAll('.tab').forEach(tab => {
	  tab.classList.remove('current-tab');
	});
	currentTab.classList.add('current-tab');

	// TEST - change toolbox
	// .render(customToolbox2);
	console.log('update toolbox')
	workspace.updateToolbox(customToolbox2);
}

// Register menus and connect buttons
document.querySelector('#runBtn').addEventListener('click', runCode);
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', switchTab);
});

// set current tab
currentTab = document.querySelector('#myFirstMethodTab');

// inject toolbox
Blockly.inject('blocklyDiv',
      {
        toolbox: customToolbox,
      });

setupWorkspace(Blockly.getMainWorkspace());

})();
