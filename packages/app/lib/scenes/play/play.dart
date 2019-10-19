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
    return Column(mainAxisSize: MainAxisSize.min, children: [
      Card(
          margin: EdgeInsets.all(20),
          child: Column(mainAxisSize: MainAxisSize.min, children: [
            const ListTile(
              leading: Icon(Icons.person),
              title: Text('Single Player'),
              subtitle: Text('Play against the time'),
            ),
            RaisedButton(
                textColor: Colors.white,
                color: Colors.red,
                onPressed: () => {},
                child: Text("Play"))
          ])),
      Card(
          margin: EdgeInsets.all(20),
          child: Column(mainAxisSize: MainAxisSize.min, children: [
            const ListTile(
              leading: Icon(Icons.cloud),
              title: Text('Online Multiplayer'),
              subtitle: Text('Play against the world'),
            ),
            RaisedButton(
                textColor: Colors.white,
                color: Colors.red,
                onPressed: () => {},
                child: Text("Play"))
          ])),
      Card(
          margin: EdgeInsets.all(20),
          child: Column(mainAxisSize: MainAxisSize.min, children: [
            const ListTile(
              leading: Icon(Icons.people),
              title: Text('Play with Friends'),
              subtitle: Text('Invite your friends to play'),
            ),
            RaisedButton(
                textColor: Colors.white,
                color: Colors.red,
                onPressed: () => {},
                child: Text("Play"))
          ]))
    ]);
  }
}
