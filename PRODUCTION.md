## Bootstrap your device

"Burn" prepared image to SD Card or EMMC Memory to actually put to your device

'''
# switch to root
sudo su -

# copy ready to use image
dd if=<your_image>.img of=/dev/mmcblk0 bs=1M

# eject card - unmount
# re-insert card - mount

# change hostname
mcedit /media/<username>/<device_uuid>/etc/hostname

# set timezone
unlink /media//<username>/<device_uuid>/etc/localtime
ln -s /usr/share/zoneinfo/Europe/London /media//<username>/<device_uuid>/etc/localtime

# eject card - unmount


# insert card into your board
# plut HDMI and network cables
# power up
'''

## Wireless connection
'''
# for wireless network, have working HW (check in `dmesg`)
nmtui

# or for more complicated WPA2/Enterprise (use TAB with nmcli command)
# example:
nmcli connection add \
 type wifi con-name "MySSID" ifname <ifname> ssid "MySSID" -- \
 wifi-sec.key-mgmt wpa-eap 802-1x.eap peap \
 802-1x.phase2-auth mschapv2 802-1x.identity "USERNAME"
nmcli connection up "MySSID" --ask

# check all is ok in nmtui

# Don't forget to read MAC address for your records (from DHCP server or ssh and `ifconfig` or so)
'''
