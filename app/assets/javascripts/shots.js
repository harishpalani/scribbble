document.addEventListener("turbolinks:load", function() {

  var Shots = {
    previewShot() {
      if (window.File && window.FileList && window.FileReader) {
        function handleFileSelect(e) {
          e.stopPropagation();
          e.preventDefault();

          let files = e.target.files || e.dataTransfer.files
          for (var i = 0, f; f = files[i]; i++) {
            // Isolate image files
            if (!f.type.match('image.*')) {
              continue;
            }
            const reader = new FileReader();

            // Capture file information
            reader.onload = (function(f) {
              return function(e) {
                // Render thumbnail
                let span = document.createElement('span');
                span.innerHTML = ['<img class="thumb" src="', e.target.result, '" title="', escape(f.name), '"/>'].join('');
                document.getElementById('list').insertBefore(span, null);
              };
            })(f);
            reader.readAsDataURL(f);
          }
        }

        function handleDragOver(e) {
          e.stopPropagation();
          e.preventDefault();
          e.dataTransfer.dropEffect = 'copy';
        }

        // Capture form elements
        const dropZone = document.getElementById('drop_zone');
        const target = document.documentElement;
        const fileInput = document.getElementById('shot_user_shot');
        const previewImage = document.getElementById('previewImage');
        const newShotForm = document.getElementById('new_shot');

        // Add event listeners created above & apply styles
        if (dropZone) {
          dropZone.addEventListener('dragover', handleDragOver, false);
          dropZone.addEventListener('drop', handleFileSelect, false);

          dropZone.addEventListener('dragover', (e) => {
            dropZone.classList.add('fire');
          }, false);

          dropZone.addEventListener('dragleave', (e) => {
            dropZone.classList.remove('fire');
          }, false);

          dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('fire');
            fileInput.files = e.dataTransfer.files;

            // Hide elements once replaced
            if (previewImage) {
              previewImage.style.display = 'none';
            }
            if (newShotForm) {
              dropZone.style.display = 'none';
            }
          }, false);

          target.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('dragging');
          }, false);

          target.addEventListener('dragleave', (e) => {
            dropZone.classList.remove('dragging');
            dropZone.classList.remove('fire');
          }, false);
        }
      }
    }
  };
  Shots.previewShot();
});
