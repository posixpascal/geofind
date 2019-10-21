library colyseus.connection;

import 'package:web_socket_channel/io.dart';
import 'package:web_socket_channel/web_socket_channel.dart';



class Connection {
  WebSocketChannel _channel;

  Connection.connect(String endpointUrl) {
    this._channel = IOWebSocketChannel.connect(endpointUrl);
    this._channel.stream.listen(onMessage);
  }

  onMessage(data){
    print(data);
  }

  send(data){
    this._channel.sink.add(data);
  }


}
