import 'package:bubble_bottom_bar/bubble_bottom_bar.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

const tabItems = <BubbleBottomBarItem>[
  BubbleBottomBarItem(
      backgroundColor: Colors.red,
      icon: Icon(
        Icons.gamepad,
        color: Colors.red,
      ),
      activeIcon: Icon(
        Icons.gamepad,
        color: Colors.red,
      ),
      title: Text("Play")),
  BubbleBottomBarItem(
      backgroundColor: Colors.deepPurple,
      icon: Icon(
        Icons.people,
        color: Colors.deepPurple,
      ),
      activeIcon: Icon(
        Icons.people,
        color: Colors.deepPurple,
      ),
      title: Text("Friends")),
  BubbleBottomBarItem(
      backgroundColor: Colors.deepOrange,
      icon: Icon(
        Icons.person,
        color: Colors.deepOrange,
      ),
      activeIcon: Icon(
        Icons.person,
        color: Colors.deepOrange,
      ),
      title: Text("Profile")),
  BubbleBottomBarItem(
      backgroundColor: Colors.green,
      icon: Icon(
        Icons.format_list_numbered,
        color: Colors.green,
      ),
      activeIcon: Icon(
        Icons.format_list_numbered,
        color: Colors.green,
      ),
      title: Text("Highscore")),
  BubbleBottomBarItem(
      backgroundColor: Colors.blue,
      icon: Icon(
        Icons.settings,
        color: Colors.blue,
      ),
      activeIcon: Icon(
        Icons.settings,
        color: Colors.blue,
      ),
      title: Text("Settings"))
];

class Tabs extends StatefulWidget{
  Tabs({Key key, this.currentIndex, this.onChange}) : super(key: key);
  final int currentIndex;
  final Function onChange;

  @override
  State<StatefulWidget> createState() {
    return TabsState();
  }
}


class TabsState extends State<Tabs> {

  @override
  Widget build(BuildContext context) {
    return (BubbleBottomBar(
        opacity: .2,
        currentIndex: widget.currentIndex,
        onTap: widget.onChange,
        borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
        elevation: 2,
        //new
        hasNotch: false,
        iconSize: 32,
        //new
        hasInk: true,
        //new, gives a cute ink effect
        items: tabItems));
  }
}
