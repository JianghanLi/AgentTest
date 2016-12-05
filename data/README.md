# Install pyhton xlsx reader
#
#### For Linux
```sh
$ sudo apt install python-pip
$ pip install xlrd xlwt
$ pip install --upgrade pip
```

#### For OSX
```sh
sudo easy_install pip
sudo pip install xlrd
```

### Then
I wrote a python script `json.py` to parse the xlsx into a json file. Then I execute the following command in the terminal to generate `data.json`.
```sh
$ pyhton json.py > data.json
```
However, you don't need to relance the command as it has already been added to project.