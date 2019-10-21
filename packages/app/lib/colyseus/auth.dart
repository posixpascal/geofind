import 'dart:async';
import 'dart:core';

import 'package:app/colyseus/storage.dart';
import 'package:http/http.dart' as http;

const TOKEN_STORAGE = "colyseus-auth-token";

class Platform {
  static String ios = "ios";
  static String android = "android";
}

class Auth {
  var _id;
  var username;
  var displayName;
  var avatarUrl;
  Map attributes;
  bool isAnonymous;
  var email;

  var lang;
  var location;
  var timezone;
  Object metadata = {};
  Object devices;

  var facebookId;
  var twitterId;
  var googleId;
  var gameCenterId;
  var steamId;

  var friendIds;
  var blockedUserIds;

  DateTime createdAt;
  DateTime updatedAt;

  // auth token
  String token;

  String endpoint;

  Timer keepOnlineInterval;
  var timer;

  Auth(String endpoint) {
    this.endpoint = endpoint.replaceAll("ws", "http");
    getItem(TOKEN_STORAGE, (token) => this.token = token);
  }

  get hasToken {
    return this.token;
  }

  login(var options) async {
    var queryParams = options;

    if (this.hasToken) {
      queryParams.token = this.token;
    }

    var data = await this.request('post', '/auth', body: {queryParams: queryParams});

    // set & cache token
    this.token = data.token;
    setItem(TOKEN_STORAGE, this.token);

    for (var attr in data) {
      this.attributes[attr] = data[attr];
    }

    this.registerPingService(15000);

    return this;
  }

  save() async {
    await this.request('put', '/auth', body: {
      "username": this.username,
      "displayName": this.displayName,
      "avatarUrl": this.avatarUrl,
      "lang": this.lang,
      "location": this.location,
      "timezone": this.timezone,
    });

    return this;
  }

  getFriends() async {
    return (await this.request('get', '/friends/all'));
  }

  getOnlineFriends() async {
    return (await this.request('get', '/friends/online'));
  }

  getFriendRequests() async {
    return (await this.request('get', '/friends/requests'));
  }

  sendFriendRequest(String friendId) async {
    return (await this
        .request('post', '/friends/requests', body: {"userId": friendId}));
  }

  acceptFriendRequest(String friendId) async {
    return (await this
        .request('put', '/friends/requests', body: {"userId": friendId}));
  }

  declineFriendRequest(String friendId) async {
    return (await this
        .request('del', '/friends/requests', body: {"userId": friendId}));
  }

  blockUser(String friendId) async {
    return (await this
        .request('post', '/friends/block', body: {"userId": friendId}));
  }

  unblockUser(String friendId) async {
    return (await this
        .request('put', '/friends/block', body: {"userId": friendId}));
  }

  request(String method, String segments, {query, body, headers}) async {
    headers['Accept'] = 'application/json';
    if (this.hasToken) {
      headers['Authorization'] = 'Bearer ' + this.token;
    }

    var queryParams = [];
    for (const name in query) {
      queryParams.add("$name=${query[name]}");
    }

    var queryString =
    (queryParams.length > 0) ? "?${queryParams.join("&")}" : '';

    var opts = {headers: headers};
    if (body) {
      opts["body"] = body;
    }

    var url = "${this.endpoint}$segments$queryString";
    var request;
    switch (method) {
      case "post":
        request =
        await http.post(url, headers: opts["headers"], body: opts["body"]);
        break;
      case "put":
        request =
        await http.put(url, headers: opts["headers"], body: opts["body"]);
        break;
      case "get":
        request = await http.get(url, headers: opts["body"]);
        break;
      case "del":
        request = await http.delete(url, headers: opts["headers"]);
        break;
    }

    return request.body;
  }

  logout() {
    this.token = null;
    removeItem(TOKEN_STORAGE);
    this.unregisterPingService();
  }

  registerPingService(int timeout) {
    this.unregisterPingService();

    this.keepOnlineInterval =
        Timer.periodic(new Duration(milliseconds: 300), (timer) {
      this.request('get', '/auth');
    });
  }

  unregisterPingService() {
    this.keepOnlineInterval.cancel();
  }
}
