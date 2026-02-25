// Wait for the scene to load
document.addEventListener('DOMContentLoaded', function() {
  const scene = document.querySelector('a-scene');
  
  scene.addEventListener('loaded', function() {
    const mainModel = document.querySelector('#mainModel');
    const toggleButton = document.querySelector('#toggleButton');
    const flamesAudio = document.querySelector('#flamesAudio');
    let isFlames = false;
    
    console.log('Scene loaded, button:', toggleButton, 'model:', mainModel);
    
    // Add button click handler
    if (toggleButton && mainModel) {
      toggleButton.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Button clicked, isFlames:', isFlames);
        
        if (isFlames) {
          // Switch to hair model
          mainModel.removeAttribute('gltf-model');
          mainModel.removeAttribute('animation-mixer');
          mainModel.setAttribute('gltf-model', 'url(assets/hair.glb)');
          mainModel.setAttribute('position', '0 -9.9 -0.5');
          mainModel.setAttribute('scale', '1.25 1.25 1.25');
          mainModel.setAttribute('rotation', '0 0 0');
          if (flamesAudio) {
            flamesAudio.style.display = 'none';
          }
          isFlames = false;
          console.log('Switched to hair');
        } else {
          // Switch to flames model
          mainModel.removeAttribute('gltf-model');
          mainModel.setAttribute('gltf-model', 'url(assets/flame.glb)');
          mainModel.setAttribute('animation-mixer', 'clip: *; loop: repeat');
          mainModel.setAttribute('position', '-0.325 -0.62 -0.7');
          mainModel.setAttribute('scale', '0.002 0.002 0.002');
          mainModel.setAttribute('rotation', '0 -55 0');
          if (flamesAudio) {
            flamesAudio.style.display = 'block';
          }
          isFlames = true;
          console.log('Switched to flames');
        }
      });
    }
    
    // Wait for the model to load
    const hairEntity = document.querySelector('#mainModel');
    
    hairEntity.addEventListener('model-loaded', function() {
      const model = this.getObject3D('mesh');
      
      // Only apply black color to hair model, not flames
      if (model && !isFlames) {
        // Traverse through all meshes in the model
        model.traverse(function(node) {
          if (node.isMesh) {
            // Set material color to black
            if (node.material) {
              // Handle both single materials and arrays of materials
              if (Array.isArray(node.material)) {
                node.material.forEach(mat => {
                  mat.color.setHex(0x000000); // Black color
                  mat.needsUpdate = true;
                });
              } else {
                node.material.color.setHex(0x000000); // Black color
                node.material.needsUpdate = true;
              }
            }
          }
        });
      }
    });
  });
});
