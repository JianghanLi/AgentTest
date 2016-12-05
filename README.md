# AgentTest

  - Dowload the project and open index.html in browser
  - Enter your Breed Factor.
  - Run for the result.
  - Dowload the result charts if you want.

### Tech used

I have used a number of open source projects to work properly:

* JavaScript - A lightweight and interpreted web programming language.
* [JQuery] - A fast, small, and feature-rich JavaScript library.
* [Lodash] - A JavaScript utility library delivering consistency, modularity, performance.
* [Highcharts] - Interactive JavaScript charts.

### Prepare
I wrote a python script `json.py` to parse the xlsx into a json file. Then I execute the following command in the terminal to generate `data.json`.
```sh
$ pyhton json.py > data.json
```
However, you don't need to relance the command as it has already been added to project.

### File Directory
3 directories, 11 files
    
    .
    ├── README.md
    ├── data
        ├── AgentTest.xlsx
        ├── data.json
        └── json.py
    ├── index.html
    ├── lib
        ├── exporting.js
        ├── highcharts.js
        ├── jquery.min.js
        └── lodash.core.js
    └── src
        ├── draw.js
        └── run.js





**Thanks for your attention.**

   [jQuery]: <http://jquery.com>
   [Lodash]: <https://lodash.com/>
   [Highcharts]: <http://www.highcharts.com>
   
#
#
### [Jianghan LI](https://www.linkedin.com/in/MisterLi)

-- University of Technology of Compiègne
-- Computer Engineering and Master in Data Mining
-- Email: jianghan.li@etu.utc.fr

   [![N|Solid](https://www.utc.fr/cru-1480691738/typo3conf/ext/site/Resources/Public/Frontend/vendor/html/images/utc-site-logo.png)](https://www.utc.fr/)
