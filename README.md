### Install instructions
> [!NOTE]
> The install is intended for jellyfin on an lxc or linux system, however it should be fine with modication, to use on windows/macos if you know what you are doing.

1. Please, remove the .example file extension from the .env.example file.
2. Then enter the IPV4 address for the HD-Homerun Tuner into the .env file.<br/>(You will need the tv guide subscription.)
3. Install [NodeJS](https://nodejs.org/en), then execute "run.sh" to ensure that node.js is working and, to make sure the script works.<br/>(It should produce a "xmltv.tv" file in the root diretory.)
5. Create a automatic service/cron entry to automatically start the run.sh script on a schedule.<br/>(You may need to modify the "run.sh" script to fit your needs.)
> [!WARNING]
> If you did not run the script the "xmltv.xml" file will not be in this directory.
5. Set the live-tv channel guide to this directory and the xmltv.xml file.
6. Set a Scheduled task in Jellyfin to update channel guide for after this has been updated.

## This script is in an attempt to solve a small problem ive been facing.
I purchased the live-tv guide for my HD-Homerun, I expected jellyfin to allow me to easily use this data. I then later found out it does not, I had already paid for a year 😤.

I did some googling and had found [this post](https://forum.silicondust.com/forum/viewtopic.php?t=72813). Apparently the api supports xmltv data and jellyfin uses xmltv data.

So I *obviosly* started manually checking the discover.json to get the device auth code, and then manually creating a url updating the guide when it ran out. Oh, and, I had completly turned off automatic guide data retreval in jellyfin. (FUN, GREAT and, AWESOME)

On a real note this slowly created a problem, I didn't wish to maintain this like manually. So in response I decided to make this script.

## Authors

- [Ethmangameon](https://github.com/Ethmangameon)

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/Ethmangameon/jellyfin-hdhomerun-xmltv/LICENSE.md) file for details

## Acknowledgments

I would like to thank the [Jellyfin Developers](https://github.com/jellyfin/jellyfin/graphs/contributors), for their work on [Jellyfin](https://jellyfin.org/).
I would also like to thank SiliconDust and the people behind the [HD-HomeRun](https://www.silicondust.com/hdhomerun/) for making a great product.