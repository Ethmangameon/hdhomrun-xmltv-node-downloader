### This script is in an attempt to solve a small problem ive been facing.
I purchased the live-tv guide for my HD-Homerun, I expected jellyfin to allow me to easily use this data. I then later found out it does not, I had already paid for a year 😤.

I did some googling and had found [this post](https://forum.silicondust.com/forum/viewtopic.php?t=72813). Apparently the api supports xmltv data and jellyfin uses xmltv data.

So I *obviosly* started manually checking the discover.json to get the device auth code, and then manually creating a url, then updating the guide when it ran out. Oh, and on top of all that, I had also completly turned off automatic guide data retreval in jellyfin.

This slowly created a problem since I didn't maintain this like I thought I would. So in response I decided to make this script.

### Install instructions
> [!NOTE]
> The install is intended for jellyfin on an lxc or linux system, however it should be fine with modication, to use on windows/macos if you know what you are doing.

1. Please, remove the .example file extension from the .env.example file.
2. Then enter the IPV4 address for the HD-Homerun Tuner into the .env file. (You will need the tv guide subscription.)
3. Install NodeJS, then execute "run.sh" to ensure that node.js is working and, to make sure the script works.<br/>(It should produce a "xmltv.tv" file in the roort) diretory.
5. Create a automatic service/cron entry to automatically start the run.sh script on a schedule.<br/>(You may need to modify the "run.sh" script to fit your needs.)
> [!WARNING]
> If you did not run the script the "xmltv.xml" file will not be in this directory.
5. Set the live-tv channel guide to this directory and the xmltv.xml file.
6. Set a Scheduled task in Jellyfin to update channel guide for after this has been updated.
