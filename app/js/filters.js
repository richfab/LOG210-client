angular.module('myAppFilters', []).filter('status', function() {
    return function(input) {

        //        0: En attente
        //        1: En préparation
        //        2: Prête
        //        3: En cours de livraison
        //        4: Livrée

        switch (input) {
            case 0:
                return "En attente";
            case 1:
                return "En préparation";
            case 2:
                return "Prête";
            case 3:
                return "En cours de livraison";
            case 4:
                return "Livrée";
        }
    };
});