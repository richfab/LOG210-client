# Installation Client

## Installation de grunt et gettext
https://angular-gettext.rocketeer.be/dev-guide/install/

- Install bower if not installed on your computer
npm install -g bower

- Install angular-gettext
bower install --save angular-gettext
Move angular-gettext folder from bower\_components to app/bower\_components

- Install grunt
npm install -g grunt-cli

- Install uglify
npm install grunt-contrib-uglify

- Install grunt-angular-gettext
npm install grunt-angular-gettext --save-dev

## Utilisatin de gettext

- Extract strings
grunt nggettext_extract

- In poedit, open en.po file (in LOG210-client/po)
- Catalogue > Mettre à jour depuis un fichier POT, selectionnez template.pot (in LOG210-client/po)
- Translate your text then save

- Compile strings (after translating in Poedit)
grunt nggettext_compile

