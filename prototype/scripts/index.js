'use strict';

// global vars
let workspace = null;
var position = { x: 0, y:0, z:0 };
let currentTab;

// TODO consolidate dicts into one that stores all the info for each tab
const userBlocksConfig = {
	 'myFirstMethodTab': 'my_first_method'
};

const parametersMap = {};

// Functions

function parametersFlyoutCallback(workspace) {
	let allVars = Blockly.getMainWorkspace().getAllVariables();
	let blockList = [];
	blockList.push(
    {
      "kind": "button",
      "text": "Create parameter",
      "callbackKey": "CREATE_PARAMETER"
    });
	console.log(allVars);
	blockList = blockList.concat(allVars);
	return blockList;
}

function createParameter(button) {
	let callback = function(varName) {
		console.log(varName);
		let currentTabName = currentTab.textContent;
		if (currentTabName in parametersMap) {
			parametersMap[currentTabName].push(varName);
		} else {
			parametersMap[currentTabName] = [varName];
		}
		console.log(parametersMap);
	}
	// create variable 
	Blockly.Variables.createVariableButtonHandler(button.getTargetWorkspace(), callback);
	// only add to toolbox for this tab
}

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
	// TODO check for name uniqueness
	let newTabName = window.prompt("Enter new tab name","myMethod");

	// TODO clone template tab
	let newTab = document.querySelector('#templateTab').cloneNode(true);

	// TODO how to modify name
	newTab.textContent = newTabName;
	newTab.classList = ['tab'];
	newTab.id = newTabName.replace(/\s+/g, '');
	newTab.addEventListener('click', switchTab);

	document.querySelector('#tabs').appendChild(newTab);

	toolboxConfig[newTab.id] = userMethodToolbox;

	createUserBlock(newTabName, newTabName);
	userBlocksConfig[newTab.id] = newTabName;
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
		console.log('setup workspace called')
		var rootBlock = workspace.newBlock('do_in_order');
		rootBlock.setMovable(false);
		rootBlock.setDeletable(false);
		console.log(rootBlock)
		rootBlock.initSvg();
		rootBlock.render();
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
		if (tab.textContent != 'Scene' && tab.textContent != 'initializeEventListeners')
			setupWorkspace(workspace);
	}
	return workspace;
}

function saveWorkspace(tab) {
	let workspace = Blockly.getMainWorkspace()
	// save workspace to current tab
	tab.blocklySave = Blockly.serialization.workspaces.save(workspace); 

	if (currentTab == 'Scene' || currentTab == 'initializeEventListeners')
		return

	// update code generator for user block
	let blockType =  userBlocksConfig[currentTab.id];
	console.log('update user block', blockType);
	let code = Blockly.JavaScript.workspaceToCode(workspace);
	Blockly.JavaScript[blockType] = function(block) {
		return code;
	};
}

function switchTab(e) {
	// save previous workspace, update current tab, and load workspace
	saveWorkspace(currentTab);
	currentTab = e.target;
	let workspace = loadWorkspace(currentTab);

	// update tabs display
	document.querySelectorAll('.tab').forEach(tab => {
	  tab.classList.remove('current-tab');
	});
	currentTab.classList.add('current-tab');

	// change toolbox
	console.log('update toolbox')
	workspace.updateToolbox(toolboxConfig[currentTab.id]);
}

// initialize everything
(function() {

// set current tab
currentTab = document.querySelector('#myFirstMethodTab');

// inject toolbox
Blockly.inject('blocklyDiv',
      {
        toolbox: customToolbox,
      });

// Extensions
Blockly.Extensions.register(
	'set_root',
	function() {
		console.log('set root')
		this.setMovable(false);
		this.setDeletable(false);
		this.setEditable(false);
	}
);

// setup workspace
let workspace = Blockly.getMainWorkspace();
setupWorkspace(workspace);

// Register button callbacks
workspace.registerButtonCallback("CREATE_PARAMETER", createParameter);

// Set up DOM button callbacks
document.querySelector('#runBtn').addEventListener('click', runCode);
document.querySelector('#newTabBtn').addEventListener('click', createNewTab);
document.querySelector('#saveBtn').addEventListener('click', updateCurrentTabBlock);
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', switchTab);
});
// debug
document.querySelector('#debugBtn').addEventListener('click', x => {
	// console.log(workspace.getAllVariables());		
});

// Associates the function with the string 'PARAMETERS'
workspace.registerToolboxCategoryCallback(
    'PARAMETERS', parametersFlyoutCallback);
})();
