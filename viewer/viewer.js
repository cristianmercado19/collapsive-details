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

  } catch (error) {
    console.error('DencryptHtml Error: ', error)
    alert("Decryption failed or wrong key used.");
  }
  
}