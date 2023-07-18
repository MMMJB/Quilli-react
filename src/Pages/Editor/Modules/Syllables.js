import { syllable } from "syllable";

export default function onWordHover(e) {
  const target = e.target;

  if (
    target.classList.contains("word") &&
    (!target.dataset.syllables || target.dataset.value !== target.innerText)
  ) {
    const word = target.innerText;

    target.dataset.syllables = syllable(word);
    target.dataset.value = word;
  }
}
