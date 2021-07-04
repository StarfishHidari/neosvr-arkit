# neosvr-arkit
NeosVR ARKit Face Tracking

This ties into Waidayo running on an ARKit compatible iOS device, and uses VMC (Virtual Motion Capture) which is based on top of Open Sound Control. A majority of this code is converting the OSC messages into data that's easier to parse in neos and also filtering out junk messages we don't want to send over (such as avatar pose) from waidayo.

I kind of threw this together as a random side project and only just now pushed it to github after letting it sit for several months so I'm not really going to be providing support on getting this functioning, but it's there to reference or fork off of if you'd like.
