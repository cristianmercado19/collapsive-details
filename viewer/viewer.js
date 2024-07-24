document.getElementById('keyInput').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {

      event.preventDefault();
      
      document.getElementById('dencrypt').click();
  }
});

function toggleDetail(detailId, elem) {
  const detailElement = document.getElementById(detailId);
  const showDetails = detailElement.style.display === "none";

  detailElement.style.display = showDetails ? "block" : "none";

  elem.classList.toggle('clicked');
}

function hideDecryptionSection() {
  document.getElementById('dencryption').style.display = 'none';
}

async function DencryptHtml() {

  DecryptAndShowContent(window.encryptedHtml); 
}

function DecryptAndShowContent(encryptedHtml) {
  try {
    document.getElementById('content').innerHTML = "";

    const key = document.getElementById('keyInput').value;

    const decryptedBytes = CryptoJS.AES.decrypt(encryptedHtml, key);
    const htmlContent = decryptedBytes.toString(CryptoJS.enc.Utf8);

    if (!htmlContent) {
      throw new Error("Failed to decrypt or wrong key.");
    }

    document.getElementById('content').innerHTML = htmlContent;

    hideDecryptionSection();

    addToggleDetailsButton()

  } catch (error) {
    console.error('DencryptHtml Error: ', error)
    alert("Decryption failed or wrong key used.");
  }
  
}

function addToggleDetailsButton() {
  const toggleButton = document.createElement("button");

  toggleButton.id = "toggleDetailsButton";
  toggleButton.className = "toggleButtonStyle shouldOpen";
  toggleButton.textContent = "Open Details";

  document.body.appendChild(toggleButton);
  
  toggleButton.addEventListener("click", toggleDetails);
}

function toggleDetails() {
  const toggleButton = document.getElementById('toggleDetailsButton');
  const shouldOpenDetails = toggleButton.classList.contains('shouldOpen')

  if (shouldOpenDetails) {
    openAllDetails();
    toggleButton.textContent = "Close Details";
    toggleButton.classList.remove("shouldOpen");
    toggleButton.classList.add("shouldClose");
  } else {
    closeAllDetails();
    toggleButton.textContent = "Open Details";
    toggleButton.classList.add("shouldOpen");
    toggleButton.classList.remove("shouldClose");
  }
}


function openAllDetails() {
  const clickableSpans = document.querySelectorAll('span.clickable:not(.clicked)');
  callOnClickinAllElements(clickableSpans);
}

function closeAllDetails() {
  const clickableSpans = document.querySelectorAll('span.clickable.clicked');
  callOnClickinAllElements(clickableSpans);
}

function callOnClickinAllElements(clickableSpans) {
  clickableSpans.forEach(span => {
    if (typeof span.onclick === "function") {
      span.onclick();
    }
  });
}

