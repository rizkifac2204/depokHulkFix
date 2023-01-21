function formatMenuTitle(text) {
  const capSpace = (str) => str.replace(/([A-Z])/g, (match) => ` ${match}`);
  const myText = capSpace(text);
  const words = myText.split(" ");
  return words
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(" ");
}

export default formatMenuTitle;
