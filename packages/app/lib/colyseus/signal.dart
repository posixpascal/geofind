class Signal {
  var listeners = [];
  invoke({code}){
    for (var listener in listeners){
      listener(code);
    }
  }

  clear(){
    this.listeners = [];
  }

  add(listener){
    listeners.add(listener);
  }
}

Signal createSignal() {
  return new Signal();
}
