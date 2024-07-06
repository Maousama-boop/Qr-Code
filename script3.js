function isURL(text) {
      return text.startsWith('http://') || text.startsWith('https://');
    }

function scanQRCode(input) {
    const file = input.files[0];
    const loadAnimation = document.querySelector(".loading-download.scan");
    if (file) {
      loadAnimation.classList.add("load");
        const reader = new FileReader();
        reader.onload = function(event) {
        const imageResult = document.getElementById("image-result");
            const image = new Image();
            image.onload = function() {
            setTimeout(function() {
            imageResult.src = event.target.result;
                const canvas = document.getElementById('canvas');
                const context = canvas.getContext('2d');
                canvas.width = image.width;
                canvas.height = image.height;
                context.drawImage(image, 0, 0, image.width, image.height);
                const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                const code = jsQR(imageData.data, canvas.width, canvas.height);
                if (code) {
                  if (isURL(code.data)) {
                    document.getElementById('result').innerHTML = 'QR Code detected as URL: <br> <a href="' + code.data + '">Go To URL<i class="fa-solid fa-arrow-up-right-from-square"></i></a>';
                  } else {
                    document.getElementById('result').innerHTML = 'QR Code detected as TEXT: <p class="text">' + code.data + '</p>';
                  }
                } else {
                    document.getElementById('result').innerHTML = 'no QR Code detected.';
                }
                loadAnimation.classList.remove("load");
              }, 1500);
            };
            image.src = imageResult.src;
        };
        reader.readAsDataURL(file);
    }
}