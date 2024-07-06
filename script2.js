    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const resultElement = document.getElementById('result');
    const playAgain = document.querySelector(".download-content");
    const scanAnimation = document.querySelector(".scan-animation");

    let scanning = true;

    function playScan() {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
        .then((stream) => {
          video.srcObject = stream;
          video.setAttribute("playsinline", true);
          video.play();
          scanning = true;
          requestAnimationFrame(tick);
          playAgain.classList.remove("aktif");
          scanAnimation.style.display = "block";
        });
    }


    function isURL(text) {
      return text.startsWith('http://') || text.startsWith('https://');
    }

    function startVideo() {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
        .then((stream) => {
          video.srcObject = stream;
          video.setAttribute("playsinline", true); 
          video.play();
          requestAnimationFrame(tick);
        });
    }

    function tick() {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          scanning = false;
          setTimeout(function() {
            video.pause();
            scanAnimation.style.display = "none";
            video.srcObject.getTracks().forEach(track => track.stop());
            playAgain.classList.add("aktif");
            if (isURL(code.data)) {
              resultElement.innerHTML = 'QR Code detected as URL: <br> <a href="' + code.data + '" target="_blank">Go To URL <i class="fa-solid fa-arrow-up-right-from-square"></i></a>';
            } else {
              resultElement.innerHTML = 'QR Code detected as TEXT: <p class="text">' + code.data + '</p>';
            }
          }, 2000);
        } else {
          setTimeout(function() {
          resultElement.innerHTML = 'No QR Code detected.';
          if (scanning) {
            requestAnimationFrame(tick);
          }
          }, 1500);
        }
      } else {
        requestAnimationFrame(tick);
      }
    }

    startVideo();