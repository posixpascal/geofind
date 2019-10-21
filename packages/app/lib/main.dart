import 'package:app/scenes/friends/friends.dart';
import 'package:app/scenes/leaderboard/leaderboard.dart';
import 'package:app/scenes/play/play.dart';
import 'package:app/scenes/profile/profile.dart';
import 'package:app/scenes/settings/settings.dart';
import 'package:bubble_bottom_bar/bubble_bottom_bar.dart';
import 'package:flutter/material.dart';
import 'colyseus/client.dart';
import 'tabs.dart';

void main() async {
      ColyseusClient colyseusClient = ColyseusClient();
      colyseusClient.connect("wss://geofind.io");
      runApp(MyApp(colyseusClient: colyseusClient));
    }

class MyApp extends StatelessWidget {
  MyApp({Key key, this.colyseusClient}) : super(key: key);
  ColyseusClient colyseusClient;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'GEOFIND',
      theme: ThemeData(
        primarySwatch: Colors.deepPurple,
      ),
      home: HomePage(title: 'geofind', colyseusClient: colyseusClient),
      initialRoute: "/",
      routes: {},
    );
  }
}

class HomePage extends StatefulWidget {
  HomePage({Key key, this.title, this.colyseusClient}) : super(key: key);
  final String title;
  ColyseusClient colyseusClient;

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int currentIndex = 0;

  void setCurrentIndex(int index) {
    setState(() {
      currentIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    BubbleBottomBarItem activeTab = tabItems[currentIndex];
    Widget activeWidget;
    switch (currentIndex){
      case 0:
        activeWidget = PlayPage();
        break;
      case 1:
        activeWidget = FriendsPage();
        break;
      case 2:
        activeWidget = ProfilePage();
        break;
      case 3:
        activeWidget = LeaderboardPage();
        break;
      case 4:
        activeWidget = SettingsPage();
        break;
    }

    return DefaultTabController(
        length: 5,
        child: Scaffold(
          appBar: AppBar(
            title: activeTab.title,
            brightness: Brightness.light,
            backgroundColor: activeTab.backgroundColor,
          ),
          bottomNavigationBar: Tabs(currentIndex: currentIndex, onChange:setCurrentIndex),
          body: activeWidget
        ));
  }
}
