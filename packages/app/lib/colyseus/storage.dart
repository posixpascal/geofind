var storage;

getStorage(){
if (!storage)  {
  // TODO: implement
  storage = {};
}
return storage;
}

setItem(String key, String value) {
  getStorage().setItem(key, value);
}

removeItem(String key) {
getStorage().removeItem(key);
}

getItem(String key, Function callback) {
var value = getStorage().getItem(key);
return value;
}
