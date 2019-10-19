import 'package:app/scenes/friends/friends.dart';
import 'package:app/scenes/play/play.dart';
import 'package:app/scenes/profile/profile.dart';
import 'package:app/scenes/settings/settings.dart';
import 'package:bubble_bottom_bar/bubble_bottom_bar.dart';
import 'package:flutter/material.dart';
import 'tabs.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'GEOFIND',
      theme: ThemeData(
        primarySwatch: Colors.deepPurple,
      ),
      home: HomePage(title: 'geofind'),
      initialRoute: "/",
      routes: {},
    );
  }
}

class HomePage extends StatefulWidget {
  HomePage({Key key, this.title}) : super(key: key);
  final String title;

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
          floatingActionButton: FloatingActionButton(
            onPressed: (){},
            child: Icon(Icons.add),
            backgroundColor: Colors.red,
          ),
          floatingActionButtonLocation: FloatingActionButtonLocation.endDocked,
          bottomNavigationBar: Tabs(currentIndex: currentIndex, onChange:setCurrentIndex),
          body: activeWidget
        ));
  }
}
