class Control {
  private state: any
}

interface SelectableControl extends Control {
  select()
}

class Button extends Control implements SelectableControl {
  select() {
  }
}

class TextBox extends Control {
  select() {
  }
}

class ImageC implements SelectableControl{
  select() {}
}