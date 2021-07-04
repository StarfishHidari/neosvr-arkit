# neosvr-arkit
NeosVR ARKit Face Tracking

This ties into Waidayo running on an ARKit compatible iOS device, and uses VMC (Virtual Motion Capture) which is based on top of Open Sound Control. A majority of this code is converting the OSC messages into data that's easier to parse in neos and also filtering out junk messages we don't want to send over (such as avatar pose) from waidayo.
