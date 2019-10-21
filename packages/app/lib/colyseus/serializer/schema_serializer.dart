class RootSchema extends Schema {}

class SchemaSerializer {
  RootSchema state;

  void setState(Object rawState) {
    (this.state).decode(rawState);
  }

  getState() {
    return this.state;
  }

  patch(patches) {
    this.state.decode(patches);
  }

  teardown() {
// this.state.onRemove
  }

  handshake(List<int> bytes) {
    if (this.state) {
// validate client/server definitinos
      const reflection = new Reflection();
      reflection.decode(bytes);
    } else {
// initialize reflected state from server
      this.state = Reflection.decode(bytes);
    }
  }
}
