angular.module('myApp').run(['gettextCatalog', function (gettextCatalog) {
/* jshint -W100 */
    gettextCatalog.setStrings('en', {"Accueil":"Home","Bienvenue sur ETSFood":"Welcome to ETSFood","Une brève description de l'application.":"A brief description...","Une phrase punch!":"A punch phrase"});
/* jshint +W100 */
}]);