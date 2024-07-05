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
  
            const textNoClickable = createSimpleHtml(allWordsExceptLastone,level);
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
  
  function createHtmlDetails(subDetailsHtml, level, index) {
    return `<div id="detail-${index}-${level}" class="detail" style="display:none; margin-left: ${
      20 * (level + 1)
    }px;">${subDetailsHtml}</div>`;
  }
  
  function createClickHtml(text, level, index) {
    return `<span class="clickable tooltip level-${level}" onclick="toggleDetail('detail-${index}-${level}')" title="more details">${text}</span>`;
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
  function toggleDetail(detailId) {
    const detailElement = document.getElementById(detailId);
    detailElement.style.display =
      detailElement.style.display === "none" ? "block" : "none";
  }
  
  // Example usage
  const example = [
    "success",
    ["structure", ["including"], "quite"],
    "test Tech",
    ["Addressing", ["which accuracy"], "test"],
  ];
  const htmlResult = processHtml(example);
  console.log(htmlResult);
  