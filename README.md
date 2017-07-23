# Santed: Sasol United System

Santed (Sasol United) is an integrated scheduling and resource and management system. It addresses the following problems:

- Project and resource management of the miners and the licenses
- Automatic allocation of each project
- Automatic re-allocation whenever the assigned miners/workers are unable to fulfill the request
- Field monitoring and alerts whenever unfortunate events occur

Santed consists of three applications in three different platforms:

1. Dashboard app (web).
This app is the one stop solution used by managers to manage projects, resources and schedules; perform automatic allocations; and monitor fields. We use min-cost max-flow algorithm to allocate resources efficiently. More on this on the subsequent chapter.

2. Mobile App.
This app is used by workers to check assigned task and update their check logs. They could ask for approval to their managers if they could not perform certain tasks directly from the app. Other information from managers could be broadcasted over this app as well.
In addition, the app also functions as a location tracker by using indoor positioning system powered by bluetooth low energy. The app could communicate with each other by using peer-to-peer network established between them. Therefore, the lack of public network communication is no longer a problem here.

3. Smart Sense.
These are tiny devices equipped with bluetooth low energy beacons to enable Santed indoor positioning system for workers and providing environment conditions at the fields. Earthquake and drastic temperature/pressure changes detectors are embedded inside these smart devices as well, as a result alerts could be sent to workers as soon as possible.

## Instruction

### Backend

Requirements:

- Node (We use v8.1.0)
- MongoDB
- Papertrail for remote logging

```
cd server
npm install
npm start
```

### Dashboard App

Requirements:
- Node
- react-scripts (`npm install -g react-scripts`)

Running Edge Server:
```
cd edge
npm install
npm start
```

```
cd dashboard
npm install
npm start
```

### Worker Mobile App

Requirements:

- Ionic 3

```
cd worker-app
npm install
ionic cordova run android
```
