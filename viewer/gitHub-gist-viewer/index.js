async function DencryptHtmlFromGitHubGist() {

    const encryptedHtmlFromGitHubGist = await GetEncryptedContentFromGitHubGist();

    DecryptAndShowContent(encryptedHtmlFromGitHubGist);
}

async function GetEncryptedContentFromGitHubGist() {
    try {

        const gistUrl = document.getElementById('keyInput').value;
        const response = await fetch(gistUrl);

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const text = await response.text();

        return text;

    } catch (error) {
        alert("Check URL, no access to GitHub Gist URL");
        console.error('There has been a problem with your fetch operation: ', error)
        throw new Error('There has been a problem with your fetch operation: ' + error);
    }
}

