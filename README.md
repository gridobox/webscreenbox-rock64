# WebScreenBox

This project based on [Ayufan's image](https://github.com/ayufan-rock64/linux-build/releases) for [Rock64 single board computer](https://www.pine64.org/?page_id=7147).

This is designed for ad-hoc screens in your office (reception, hall, etc.) as well as for a wall of screens organised as a Operation Control Center.

This repo is a set of Ansible scripts, when executed against pure original image you will get reliable solution for unattended screens.

Based on Ubuntu Bionic and equipped with Chomium and Firefox browsers. By default does fullscreen on a specific URL. Possible to extend for split screen modes and browser automation to get through login prompts and perform regular tasks like refresh.

Key advantage of Rock64 board is 4K resolution video output. Also up to 4GM RAM gives enough space for greedy browsers running heavy JS applications in multiple instances.


# Requirements

Hardware
- Rock64 single board computer + memory (SD or EMMC) + power cable/adapter
- HDMI screen and cable
- network cable or separate USB wireless adapter


# Installation

Start with downloading original image, install it to the device and then apply all ansible scripts from `provisioning` folder. [Detailed instructions](provisioning).

If you have more devices follow instructions on the end to create your matrix image. Then copy it to the new memory, insert into device and change config for this particular instance (e.g. hostname). [Detailed instructions](PRODUCTION.md)


Pro hint: If not on public internet, set your NTP servers manually to keep the time synced.



# Management commands

'''
# managing sd card freeze
ansible-playbook -i hosts 96_overlayroot_on.yml
ansible-playbook -i hosts 97_overlayroot_off.yml



# operational commands
ansible-playbook -i hosts 90_install_url_configs.yml
ansible-playbook -i hosts 98_reset_browser.yml
ansible-playbook -i hosts 99_reboot.yml
'''


# Ideas


prevent dmesg swamped by systemd errors - disable cow

Errors are like `[ 4925.384121] systemd-journald[367]: Failed to open system journal: Operation not supported`

```
ln -s /dev/null /etc/tmpfiles.d/journal-nocow.conf
```

# disable predictable network names (to allow different wifi dongles always under wlan0)
sudo ln -s /dev/null /media/myuser/linux-root/etc/udev/rules.d/80-net-setup-link.rules
