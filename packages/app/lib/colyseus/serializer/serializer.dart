abstract class Serializer<State> {
  void setState(Object data);

  State getState();

  void patch(Object data);

  void teardown();

  void handshake(List<int> bytes);
}

var serializers = {};

registerSerializer(String id, Object serializer) {
  serializers[id] = serializer;
}

getSerializer(String id) {
  return serializers[id];
}
