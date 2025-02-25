### Install instructions
> [!NOTE]
> The install is intended for Jellyfin on an lxc or Linux system, however, it should be fine with Windows/macOS if you know what you are doing.

1. Please, remove the .example file extension from the env.example file.
2. Then enter the IPV4 address for the HD-Homerun Tuner into the .env file.<br/>(You will need the tv guide subscription.)
3. Install [NodeJS](https://nodejs.org/en), then execute "run.sh" to ensure that node.js is working and, to make sure the script works.<br/>(It should produce an "xmltv.tv" file in the root directory.)
5. Create an automatic service/cron entry to automatically start the run.sh script on a schedule.<br/>(You may need to modify the "run.sh" script to fit your needs.)
> [!WARNING]
> If you did not run the script the "xmltv.xml" file will not be in this directory.
5. Set the live TV channel guide to this directory and the xmltv.xml file.
6. Set a Scheduled task in Jellyfin to update the channel guide after this.

## This script is in an attempt to solve a small problem I've been facing.
I purchased the live TV guide for my HD-Homerun, and I expected Jellyfin to allow me to use this data. I found out it did not, I had already paid for a year 😤.

I did some googling and found [this post](https://forum.silicondust.com/forum/viewtopic.php?t=72813). The API supports xmltv data and Jellyfin uses xmltv data.

So I *obviosly* started manually checking the discover.json to get the device auth code, and then manually creating a URL updating the guide when it ran out. Oh, and, I had completely turned off automatic guide data retrieval in Jellyfin. (FUN, GREAT, and, AWESOME)

On a real note, this slowly created a problem, I didn't wish to maintain this manually. So in response, I decided to make this script.

## Authors

- [Ethmangameon](https://github.com/Ethmangameon)

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/Ethmangameon/jellyfin-hdhomerun-xmltv?tab=MIT-1-ov-file) file for details

## Acknowledgments

I would like to thank the [Jellyfin Developers](https://github.com/jellyfin/jellyfin/graphs/contributors), for their work on [Jellyfin](https://jellyfin.org/).</br>
I would also like to thank SiliconDust and the people behind the [HD-HomeRun](https://www.silicondust.com/hdhomerun/) for making a great product.
