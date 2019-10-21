import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class PlayPage extends StatefulWidget {
  @override
  PlayPageState createState() => PlayPageState();
}

class PlayPageState extends State<PlayPage> {
  int currentIndex = 0;

  void setCurrentIndex(int index) {
    setState(() {
      currentIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return ListView(children: [
      Column(mainAxisSize: MainAxisSize.min, children: [
        Padding(
          padding: const EdgeInsets.all(0),
          child: Image(
            image: AssetImage("lib/assets/singleplayerButton.png"),
            fit: BoxFit.cover,
          ),
        ),
        Padding(
          padding: const EdgeInsets.all(0),
          child: Image(
            image: AssetImage("lib/assets/multiplayerButton.png"),
            fit: BoxFit.cover,
          ),
        ),
        Padding(
          padding: const EdgeInsets.all(0),
          child: Image(
            image: AssetImage("lib/assets/inviteFriendsButton.png"),
            fit: BoxFit.cover,
          ),
        ),
        Padding(
          padding: const EdgeInsets.all(0),
          child: Image(
            image: AssetImage("lib/assets/quickmatchButton.png"),
            fit: BoxFit.cover,
          ),
        ),
      ])
    ]);
  }
}
