// class based categories
const cameraCategory = {
  'kind': 'category',
  'name': 'this.camera',
  'contents': [
    {
      'kind': 'block',
      'type': 'move_camera'
    },
  ]
};

const sceneCategory = {
  'kind': 'category',
  'name': 'this',
  'contents': [
    {
      'kind': 'block',
      'type': 'my_first_method'
    }
  ]
};

const classCategory = {
  'kind': 'category',
  'name': 'Classes',
  'contents': [
    sceneCategory,
    cameraCategory
  ]
};

// general categories

const parametersCategory = {
  'kind': 'category',
  'name': 'Parameters',
  'contents': [
    {
      "kind": "button",
      "text": "Create parameter",
      "callbackKey": "CREATE_PARAMETER"
    },
    {
      'kind': 'block',
      "type": "parameters_get",
    },
    {
      'kind': 'block',
      "type": "parameters_set",
    }
  ]
  // 'custom': 'PARAMETERS'
};

const inputsCategory = {
  'kind': 'category',
  'name': 'Inputs',
  'contents': [
    {
      'kind': 'block',
      'type': 'text'
    },
    {
      'kind': 'block',
      'type': 'math_number'
    }
  ]
};

const functionsCategory = {
  'kind': 'category',
  'name': 'Functions',
  'custom': 'PROCEDURE'
}

const variablesCategory = {
  'kind': 'category',
  'name': 'Variables',
  'custom': 'VARIABLE'
};

const basicCategory = {
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
};

const debugCategory = {
  'kind': 'category',
  'name': 'Debug',
  'contents': [
    functionsCategory,
  ]
}

// util functions
function addUserBlockToToolbox(blockType) {
  sceneCategory['contents'].push({
      'kind': 'block',
      'type': blockType
    });
}

// toolbox definitions
const emptyToolbox = {
  'kind': 'categoryToolbox',
  'contents': []
}

const customToolbox = {
  'kind': 'categoryToolbox',
  'contents': [
    classCategory,
    inputsCategory,
    variablesCategory,
    basicCategory,
    debugCategory,
  ]
};

const userMethodToolbox = {
  'kind': 'categoryToolbox',
  'contents': [
    classCategory,
    parametersCategory,
    inputsCategory,
    variablesCategory,
    basicCategory,
  ]
};

const eventListenersToolbox = {
  'kind': 'categoryToolbox',
  'contents': [
    {
      'kind': 'category',
      'name': 'Event Listeners',
      'contents': [
        {
          'kind': 'block',
          'type': 'on_key_pressed'
        }
      ]    
    },
    classCategory,
    parametersCategory,
    inputsCategory,
    variablesCategory,
    basicCategory,
    debugCategory,
  ]
};

// defines toolbox for each tab
const toolboxConfig = {
  'sceneTab': emptyToolbox,
  'eventListenersTab': eventListenersToolbox,
  'myFirstMethodTab': customToolbox
}
