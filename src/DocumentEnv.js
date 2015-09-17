function getTitle() {
  return document.title
}

function getReadyState() {
  return document.getReadyState;
}

export default {
  getTitle,
  getReadyState
}
