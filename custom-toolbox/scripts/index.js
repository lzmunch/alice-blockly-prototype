'use strict';

// global vars
let workspace = null;
var position = { x: 0, y:0, z:0 };
let currentTab;

const userBlocksConfig = {
	 'myFirstMethodTab': 'my_first_method'
};

(function() {

// Functions
function createUserBlock(blockType, blockMsg) {
	// create block for new method
	Blockly.Blocks[blockType] = {
		init: function() {
				let blockJson = userBlockJsonTemplate;
				blockJson['message0'] = blockMsg;

		    this.jsonInit(blockJson);
		    this.setPreviousStatement(true);
			},
	};
	Blockly.JavaScript[blockType] = function(block) {
	  return 'console.log("No code to execute");';
	}

	addUserBlockToToolbox(blockType);

	// doesn't work?
	try {
		console.log(toolboxConfig[currentTab.id])
		workspace.updateToolbox(toolboxConfig[currentTab.id]);		
	} catch (e) {
		console.log(e)
	}
	console.log('update toolbox with new user block')
}

function createNewTab() {
	let newTab = document.querySelector('#myFirstMethodTab').cloneNode(true);
	// TODO how to modify name
	newTab.textContent = 'New Tab';
	newTab.classList = ['tab'];
	newTab.id = 'newTab';
	newTab.addEventListener('click', switchTab);

	document.querySelector('#tabs').appendChild(newTab);

	toolboxConfig[newTab.id] = userMethodToolbox;

	createUserBlock('new_method', 'newMethod');
	userBlocksConfig[newTab.id] = 'new_method';
}

function updateCurrentTabBlock() {
	let blockType = userBlocksConfig[currentTab.id];
  let code = Blockly.JavaScript.workspaceToCode(Blockly.getMainWorkspace());
	Blockly.JavaScript[blockType] = function(block) {
	  return code;
	}
}

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

	// change toolbox
	console.log('update toolbox')
	workspace.updateToolbox(toolboxConfig[currentTab.id]);
}

// Connect buttons
document.querySelector('#runBtn').addEventListener('click', runCode);
document.querySelector('#newTabBtn').addEventListener('click', createNewTab);
document.querySelector('#saveBtn').addEventListener('click', updateCurrentTabBlock);
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
