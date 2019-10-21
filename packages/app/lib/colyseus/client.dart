import 'dart:convert';

import 'package:app/colyseus/room.dart';
import 'package:app/colyseus/serializer/schema_serializer.dart';
import 'package:http/http.dart' as http;
import 'auth.dart';
import 'connection.dart';

class ColyseusClient {
  static const Object DEFAULT_ROOM_OPTIONS = {};
  String endpoint;
  Connection connection;
  var auth;

  connect(String endpointUrl) {
    print("Connecting to: " + endpointUrl);
    this.connection = Connection.connect(endpointUrl);
    this.endpoint = endpointUrl;
    this.auth = new Auth(endpointUrl);
  }

  joinOrCreate(String roomName, RootSchema rootSchema,
      {options = DEFAULT_ROOM_OPTIONS}) async {
    return await this.createMatchMakeRequest(
        'joinOrCreate', roomName, rootSchema,
        options: options);
  }

  create(String roomName, RootSchema rootSchema,
      {options = DEFAULT_ROOM_OPTIONS}) async {
    return await this.createMatchMakeRequest('create', roomName, rootSchema,
        options: options);
  }

  join(String roomName, RootSchema rootSchema,
      {options = DEFAULT_ROOM_OPTIONS}) async {
    return await this
        .createMatchMakeRequest('join', roomName, rootSchema, options: options);
  }

  joinById(String roomId, RootSchema rootSchema,
      {options = DEFAULT_ROOM_OPTIONS}) async {
    return await this.createMatchMakeRequest('joinById', roomId, rootSchema,
        options: options);
  }

  reconnect(String roomId, String sessionId, RootSchema rootSchema,
      {options = DEFAULT_ROOM_OPTIONS}) async {
    return await this.createMatchMakeRequest('reconnect', roomId, rootSchema,
        options: sessionId);
  }

  getAvailableRooms(String roomName) async {
    var httpEndpoint = this.endpoint.replaceAll("ws", "http");
    var url = "${httpEndpoint}matchmake/$roomName";
    return (await http.get(url, headers: {'Accept': 'application/json'})).body;
  }

  createMatchMakeRequest(String method, String roomName, RootSchema rootSchema,
      {options = DEFAULT_ROOM_OPTIONS}) async {
    var url =
        "${this.endpoint.replaceAll("ws", "http")}/matchmake/$method/$roomName";

// automatically forward auth token, if present
    if (this.auth.hasToken) {
      options.token = this.auth.token;
    }

    var response = jsonDecode((await http.post(url,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: jsonEncode(options)))
        .body);

    if (response.error) {
      throw new Error();
    }

    var room = this.createRoom(roomName, rootSchema);
    room.id = response.room.roomId;
    room.sessionId = response.sessionId;

    room.connect(this
        .buildEndpoint(response.room, options: {"sessionId": room.sessionId}));

    return new Future(() {
      var onError = (message) {
        throw message;
      };

      room.onError.once(onError);
      room.onJoin.once(() {
        room.onError.remove(onError);
        return room;
      });
    });
  }

  createRoom(String roomName, RootSchema rootSchema) {
    return new Room(roomName, rootSchema);
  }

  buildEndpoint(var room, {options = DEFAULT_ROOM_OPTIONS}) {
    var params = [];

    for (const name in options) {
      if (!options.hasOwnProperty(name)) {
        continue;
      }

      params.add("$name=${options[name]}");
    }

    return "${this.endpoint}/${room.processId}/${room.roomId}?${params.join('&')}";
  }
}
