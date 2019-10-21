export const findTestWrapper = (wrapper, tag) => {
  return wrapper.find(`[data-test="${tag}"]`)
}
