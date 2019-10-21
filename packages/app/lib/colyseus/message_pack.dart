import "package:msgpack2/msgpack2.dart";

encode(i) {
 return serialize(i);
}

decode(i) {
 return deserialize(i);
}
