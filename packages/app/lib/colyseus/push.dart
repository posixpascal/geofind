class Push {
  String endpoint;
  Push(String endpoint) {
  this.endpoint = endpoint.replaceAll("ws", "http");
  }

  register() async {
    this.check();
    await this.registerServiceWorker();
    await this.requestNotificationPermission();
  }

  registerServiceWorker() async {
    return 0;// TODO: if possible at all or even needed.
  }

  requestNotificationPermission() async {
    //const permission = await window["Notification"].requestPermission();
    // value of permission can be 'granted', 'default', 'denied'
    // granted: user has accepted the request
    // default: user has dismissed the notification permission popup by clicking on x
    // denied: user has denied the request.
    //if (permission !== "granted") {
    //  throw new Error("Permission not granted for Notification");
    //}
  }

  check() async {
    //if (!("serviceWorker" in navigator)) { throw new Error("No Service Worker support!"); }
    //if (!("PushManager" in window)) { throw new Error("No Push API Support!"); }
  }
}
