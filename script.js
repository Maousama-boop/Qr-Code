let changeBg = document.querySelector(".change-bg");
const changeIcon = document.querySelector(".change-icon");
changeBg.onclick = () => {
  if(changeIcon.textContent === "sunny") {
    changeIcon.textContent = "clear_night";
  } else {
    changeIcon.textContent = "sunny"
  }
  document.body.classList.toggle("mode-dark");
};

$(document).ready(function() {
            $('#generateQrCode').click(function() {
              var generateQrcodeInput = document.getElementById("make-qrcode").value;
              const aktifHover = [
                document.querySelector(".download-qrcode"),
                document.querySelector(".download-content")
                ];
                const loadAnimation = [
                  document.querySelector(".qrcode-img"),
                  document.querySelector(".loading-download")
                  ];
                $.ajax({ 
                    url: 'https://api.api-ninjas.com/v1/qrcode?data=' + generateQrcodeInput + '&format=png',
                    type: 'GET',
                    headers: { 'X-Api-Key': 'XLKDHJZxlRq2f6kyoNrbnQ==HJurwRjtuE0LLeD4' },
                    contentType: 'application/json',
                    success: function(response) {
                      loadAnimation[0].classList.add("load");
                      loadAnimation[1].classList.add("load");
                    setTimeout(function() {
                        var qrcodeImg = document.getElementById("qrcode-img");
                        qrcodeImg.src = 'data:image/png;base64,' + response;
                        qrcodeImg.alt = 'your ' + generateQrcodeInput + ' Code';
                        const Toast = Swal.mixin({
                        toast: true,
                        position: "top-start",
                        showConfirmButton: false,
                        timer: 2500,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                          toast.onmouseenter = Swal.stopTimer;
                          toast.onmouseleave = Swal.resumeTimer;
                        }
                      });
                      Toast.fire({
                        icon: "success",
                        title: "Succes Create QrCode"
                      });
                    aktifHover[0].classList.add("aktif");
                    aktifHover[1].classList.add("aktif");
                    loadAnimation[0].classList.remove("load");
                    loadAnimation[1].classList.remove("load");
                    }, 2500);
                    
                let downloadQrCode = document.getElementById("download-button");
                downloadQrCode.onclick = () => {
                  Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be download you qrcode!",
                    icon: "warning",
                    showCancelButton: true,
                    cancelButtonColor: "#d33",
                    confirmButtonColor: "#28a745",
                    confirmButtonText: "Yes, Download"
                  }).then((result) => {
                    if (result.isConfirmed) {
                      Swal.fire({
                        title: "Downloaded!",
                        text: "Your file has been downloaded.",
                        icon: "success"
                      });
                      var downloadQrcodeButton = document.createElement('a');
                      downloadQrcodeButton.href =  'data:image/png;base64,' + response;
                      downloadQrcodeButton.download = 'qrcode.png';
                      downloadQrcodeButton.style.display = "none";
                      document.body.appendChild(downloadQrcodeButton);
                      downloadQrcodeButton.click();
                      document.body.removeChild(downloadQrcodeButton);
                    }
                  });
                };
                    },
                    error: function(error) {
                        const Toast = Swal.mixin({
                        toast: true,
                        position: "top-start",
                        background: "#fff",
                        showConfirmButton: false,
                        timer: 2500,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                          toast.onmouseenter = Swal.stopTimer;
                          toast.onmouseleave = Swal.resumeTimer;
                        }
                      });
                      Toast.fire({
                        icon: "error",
                        title: "Please Check Again Your Link"
                      });
                    }
                });
            });
        });
