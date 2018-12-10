WebScreen
=========

This is how to provision OS image for Rock64 with full web browser capabilities.

Use Rock64 with a SD Card or EMMC memory, manage to get accessible as a block device in your computer (check with `lsblk`)

Get to [Ayufan releases](https://github.com/ayufan-rock64/linux-build/releases) and pick suitable one (latest stable is reasonable choice)


Features
--------
The only basic function is to display URL in web browser in fullscreen. Extension to splitscreen and browser automation is possible

URL can be edited in `/opt/webscreenbox/simple_url.txt`

List of available browsers:
 - Chromium
 - Firefox

tested:
- bionic-lxde-rock64-0.7.11-1075-arm64.img

# Instructions

## Bootstrap

If connected to internet, unattended updates may strike in any time, may check with `htop` command and be patient.

1. bootstrap image to sd sdcard with `dd` command

2. Boot for the first time, log in - user rock64 has password rock64 by default. Change password and get current IP address `ip a l` or `ifconfig`.

3. For regular ssh connection, we set up SSH keys - we need that IP address to know where to connect - change <ip> in the commands bellow.

```
# copy ssh key into /home/admin/.ssh/authorized/keys
ssh-copy-id rock64@<ip>
ssh rock64@<ip>
```

4. Change password by running `passwd` command. Optionally disable password login completely.

5. Set sudo access for admin user `rock64` without password
```
sudo echo "rock64 ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers
```

6. Ubuntu Bionic fix missing `python` command - create symlink to `python3`

```
cd /usr/bin/
sudo ln -s python3 python
```

7. Log out
```
exit
```

## Install

We need to configure our Ansible inventory. Create your won copy of `./hosts` or edit directly - set yout IP address at minimum.

```
# run ansible commands
ansible-playbook -i hosts 01_update_os.yml
ansible-playbook -i hosts 02_install_tools.yml
ansible-playbook -i hosts 03_admin_setup.yml
ansible-playbook -i hosts 05_system_setup.yml
ansible-playbook -i hosts 06_install_software.yml
...
ansible-playbook -i hosts 80_clean_up.yml

```

# TODO

```
po nainstalovani je treba

do chromu doinstalovat rucne extension:
  - tab rotate
    - menu > More tools > Extensions
    - search on web
    - "tab rotate" - the one with velociped
    - install, confirm, right click on icon
      set config to remote URL http://localhost/tab_rotate.json

    https://chrome.google.com/webstore/detail/tab-rotate/pjgjpabbgnnoohijnillgbckikfkbjed
    https://github.com/KevinSheedy/chrome-tab-rotate.git


    ansible-playbook -i hosts 99_reboot.yaml



Create Matrix image
--------------------

5. nakopcit do .img na pocitaci
dd if=/dev/mmcblk0 of=/root/lime-dashboard-6xx.img bs=8M

6. zmensit partition na 2GB http://raspberrypi.stackexchange.com/questions/5440/copy-existing-raspbian-installation-to-smaller-sd-card
# nejdriv je treba pripojit blokove zarizeni ze souboru pomoci loop
modprobe loop
losetup /dev/loop0 lime2-dashboard-6xx.img
partprobe /dev/loop0

# stav pratition
fsck.ext4 -fy /dev/loop0p1

# A] zmenseni partition v terminalu http://geekofpassage.blogspot.co.uk/2014/01/im-running-out-of-space-gee-thats-never.html
resize2fs /dev/loop0p1 <pocet_bloku>
# kdyz hodi hlasku: resize2fs: Nová velikost je menší než minimum (665451)
# je treba podle toho upravit velikost, ale nejlepsi pridat aspon par set MB
resize2fs /dev/loop0p1 665451

# B] zmenseni partition v GUI
gparted /dev/loop0
# cca 2048MiB

# overit vylsedek v fdisku
fdisk /dev/loop0
Zařízení     Zaveditelný Start   Konec Sektory  Size Id Druh
/dev/loop0p1              8192 5332991 5324800  2,6G 83 Linux

# odpojeni blokoveho zarizeni
losetup -d /dev/loop0

# oriznuti souboru .img
# vysledna velikost v bytech se zjisti z fdisk (vyse) jako koncovy sektor (+1?) * 512 (viz. units)
v tomto prikladu je to
echo "(5332991+1) * 512" | bc

truncate --size=2730491904 lime-dashboard-6xx.img

# k otestovani image lokalne
losetup /dev/loop0 lime2-dashboard-6xx.img
mount /dev/loop0p1 /mnt/iso1/
... nautilus
umount /dev/loop0p1 /mnt/iso1/
losetup -d /dev/loop0
```
