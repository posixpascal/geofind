import 'dart:core';

const TOKEN_STORAGE = "colyseus-auth-token";

class Platform {
  static String ios = "ios";
  static String android = "android";
}

class Auth {
  String _id;
  String username;
  String displayName;
  String avatarUrl;

  bool isAnonymous;
  String email;

  String lang;
  String location;
  String timezone;
  Object metadata = {};
  Object devices;

  String facebookId;
  String twitterId;
  String googleId;
  String gameCenterId;
  String steamId;

  String[] friendIds;
  String[] blockedUserIds;

  DateTime createdAt;
  DateTime updatedAt;

  // auth token
  String token;

  String endpoint: string;
  // TODO:
  Object keepOnlineInterval:;

  Auth(String endpoint) {
    this.endpoint = endpoint.replace("ws", "http");
    getItem(TOKEN_STORAGE, (token) => this.token = token);
  }

  get hasToken() {
    return !!this.token;
  }

   login (Object options = {}) async {
    const queryParams = Object.assign({}, options);

  if (this.hasToken) {
  queryParams.token = this.token;
  }

  var data = await this.request('post', '/auth', queryParams);

  // set & cache token
  this.token = data.token;
  setItem(TOKEN_STORAGE, this.token);

  for (var attr in data) {
  if (this.hasOwnProperty(attr)) { this[attr] = data[attr]; }
  }

  this.registerPingService();

  return this;
  }

  save() async {
    await this.request('put', '/auth', {}, {
      username: this.username,
      displayName: this.displayName,
      avatarUrl: this.avatarUrl,
      lang: this.lang,
      location: this.location,
      timezone: this.timezone,
    });

    return this;
  }

  getFriends() async  {
    return (await this.request('get', '/friends/all')) as IUser[];
  }

  getOnlineFriends() async {
    return (await this.request('get', '/friends/online')) as IUser[];
  }

  getFriendRequests() async {
    return (await this.request('get', '/friends/requests')) as IUser[];
  }

  sendFriendRequest(friendId: string) async {
  return (await this.request('post', '/friends/requests', { userId: friendId })) as IStatus;
  }

  acceptFriendRequest(friendId: string) async {
  return (await this.request('put', '/friends/requests', { userId: friendId })) as IStatus;
  }

  declineFriendRequest(friendId: string) async {
  return (await this.request('del', '/friends/requests', { userId: friendId })) as IStatus;
  }

  blockUser(friendId: string) async {
  return (await this.request('post', '/friends/block', { userId: friendId })) as IStatus;
  }

  unblockUser(friendId: string) async {
  return (await this.request('put', '/friends/block', { userId: friendId })) as IStatus;
  }

  request(
  method: 'get' | 'post' | 'put' | 'del',
  segments: string,
  query: {[key: string]: number | string} = {},
  body: any,
  headers: {[key: string]: string} = {}
  ) async {
  headers['Accept'] = 'application/json';
  if (this.hasToken) { headers['Authorization'] = 'Bearer ' + this.token; }

  const queryParams: string[] = [];
  for (const name in query) {
  queryParams.push(`${name}=${query[name]}`);
  }

  const queryString = (queryParams.length > 0)
  ? `?${queryParams.join("&")}`
      : '';

  const opts: Partial<http.HttpieOptions> = { headers };
  if (body) { opts.body = body; }

  return (await http[method](`${this.endpoint}${segments}${queryString}`, opts)).data;
  }

  logout() {
    this.token = null;
    removeItem(TOKEN_STORAGE);
    this.unregisterPingService();
  }

  registerPingService(15000) {
  this.unregisterPingService();

  this.keepOnlineInterval = setInterval(() => this.request('get', '/auth'), timeout);
  }

  unregisterPingService() {
    clearInterval(this.keepOnlineInterval);
  }
}
