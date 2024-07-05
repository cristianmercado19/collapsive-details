function encryptHtml() {
    const key = document.getElementById('keyInput').value;
    const htmlToEncrypt = document.getElementById('content').innerHTML;

    var encryptedHtml = CryptoJS.AES.encrypt(htmlToEncrypt, key).toString();

    document.getElementById('encryptedContent').value = encryptedHtml;
}

function generateEmail() {    
    const textArea = document.getElementById('emailContent')
    const emailContent = textArea.value;
    var inputText = emailContent.replace(/\n/g, '<br>\n');

    const parsedText = parseDetails(inputText);

    console.log(parsedText);

    const htmlContent = processHtml(parsedText);

    document.getElementById('content').innerHTML = htmlContent;
    document.getElementById('content').style.display = 'block';

    document.getElementById('encryptedContent').value = "";
}

function parseDetails(text) {
    const stack = [];
    let currentText = '';
    let depth = 0;

    for (let i = 0; i < text.length; i++) {
        if (text[i] === '{') {
            if (depth === 0) {
                stack.push(currentText.trim());
                currentText = '';
            } else {
                currentText += '{';
            }
            depth++;
        } else if (text[i] === '}') {
            depth--;
            if (depth === 0) {
                stack.push(parseDetails(currentText));
                currentText = '';
            } else {
                currentText += '}';
            }
        } else {
            currentText += text[i];
        }
    }
    if (currentText) stack.push(currentText.trim());

    return stack;
}

function processHtml(arrayText, level = 0, indexZ = "0") {
    const result = [];

    for (let i = 0; i < arrayText.length; i++) {
        const toAnalyze = arrayText[i];

        if (Array.isArray(toAnalyze)) {
            // Skip processing here, it will be handled as details for the previous item
        } else {
            const nextToAnalyze = arrayText[i + 1];
            const hasDetails = Array.isArray(nextToAnalyze);

            if (hasDetails) {
                const isOneWord = toAnalyze.split(" ").length === 1;

                if (isOneWord) {
                    const lastWord = toAnalyze;

                    const clickableWord = createClickHtml(lastWord, level, (indexZ + "-" + i));
                    result.push(clickableWord);
                } else {
                    const splitWords = splitLastWord(toAnalyze);
                    const allWordsExceptLastone = splitWords[0];
                    const lastWord = splitWords[1];

                    const textNoClickable = createSimpleHtml(allWordsExceptLastone, level);
                    result.push(textNoClickable);

                    const clickableWord = createClickHtml(lastWord, level, (indexZ + "-" + i));
                    result.push(clickableWord);
                }

                // Process the next level and add the details container
                const subDetailsHtml = processHtml(nextToAnalyze, level + 1, (indexZ + "-" + i));
                const detailsHtml = createHtmlDetails(subDetailsHtml, level, (indexZ + "-" + i));

                result.push(detailsHtml);
                i++; // Increment to skip the next as it's already processed
            } else {
                const text = createSimpleHtml(toAnalyze, level);
                result.push(text);
            }
        }
    }

    return result.join(" ");
}

function createHtmlDetails(subDetailsHtml, level, i) {
    return `<div id="detail-${level}-${i}" class="detail" style="display:none; margin-left: ${20 * (level + 1)
        }px;">${subDetailsHtml}</div>`;
}

function createClickHtml(text, level, index) {
    const classStyle = `level-${level + 1}`
    return `<span class="clickable tooltip ${classStyle}" onclick="toggleDetail('detail-${level}-${index}', this)" title="more details">${text}</span>`;
}

function splitLastWord(anyString) {
    let words = anyString.split(" ");
    let lastWord = words.pop();
    let remainingWords = words.join(" ");
    return [remainingWords, lastWord];
}

function createSimpleHtml(text, level) {
    return `<span class="level-${level}">${text}</span>`;
}

// Toggle visibility of details
function toggleDetail(detailId, elem) {
    const detailElement = document.getElementById(detailId);
    const showDetails = detailElement.style.display === "none";

    detailElement.style.display = showDetails ? "block" : "none";

    elem.classList.toggle('clicked');
}
