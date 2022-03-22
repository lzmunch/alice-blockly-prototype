'use strict';

let workspace = null;

function start() {	
  // Create main workspace.
  registerEnableOption();
  workspace = Blockly.inject('blocklyDiv',
    {
      toolbox: toolboxSimple,
    });
}

// shows up if block is in workspace
// reads "Enable" if block diabled, "Disable" if block enabled
function registerEnableOption() {
	const isEnabledItem = {
		displayText: function(scope) {
		  // hack soln - init runCode prop here
			if (!('runCode' in scope.block)) {
				scope.block.runCode = true;
			}
			return scope.block.runCode ? 'Disable' : 'Enable'
		},
		preconditionFn: function(scope) {
			let id = scope.block.id;
			let blocksInWorkspace = Blockly.getMainWorkspace().getAllBlocks();

			for (let i=0; i<blocksInWorkspace.length; i++) {
				let b = blocksInWorkspace[i];
				// if in workspace
				if (b.id == id) {
					return 'enabled';
				}
			}
			// hidden if not in workspace
			return 'hidden';		
		},
		callback: function (scope) {
			scope.block.runCode = !scope.block.runCode;
			console.log("run block with id '" + scope.block.id + "' = " + scope.block.runCode);
		},
		scopeType: Blockly.ContextMenuRegistry.ScopeType.BLOCK,
		id: 'toggle_is_enabled',
		weight: 100	
	}

	Blockly.ContextMenuRegistry.registry.register(isEnabledItem);
}