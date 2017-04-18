# LabelThem

[![Code Climate](https://codeclimate.com/github/innosoft-pro/label-them/badges/gpa.svg)](https://codeclimate.com/github/innosoft-pro/label-them)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/735a6f0a94844ce686d680a0d4474789)](https://www.codacy.com/app/LabelThem/label-them?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=innosoft-pro/label-them&amp;utm_campaign=Badge_Grade)

*LabelThem* is an online markup tool aimed at building image datasets for computer vision research, and integrated with [Yandex.Toloka crowdsourcing system](https://toloka.yandex.ru/).

#### Testing on the local machine
To test *LabelThem* on local machine [NodeJS](https://nodejs.org/en/) and [Bower](https://bower.io/) should be installed on it.
Before running the project execute `bower update` command in the project directory to download libraries used by the system.

#### Important Notice
At the moment *LabelThem* works  only with [Yandex.Toloka crowdsourcing system](https://toloka.yandex.ru/) in [Chromium Browser](http://www.chromium.org/Home).

#### Concatenated and minified 'build' file generation (through 'Grunt' process builder):

In case of modifying the 'front-end' type the following commands in terminal:

*NOTE*: If you don’t already have [NodeJS](https://nodejs.org/en/) and [Grunt](https://gruntjs.com/getting-started) 
installed on your system, install them first.

1) `npm install grunt-contrib-cssmin --save-dev` // installs css minification plugin

2) `npm update` // goes through the package.json file and installs all the pre-defined dependencies (plugins)

3) `grunt` // builds the project's minified and concatenated file

In case of working only on the 'back-end' (i.e. python),
there is an 'app.min.js' folder available on the version control,
so you don't have to do anything related to the building process.