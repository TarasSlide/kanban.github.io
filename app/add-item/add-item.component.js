function AddItemController() {

}

angular.module('addItem').component('addItem', {
    templateUrl: '/add-item/add-item.template.html',
    controller: AddItemController,
    bindings: {
        addfunc: '=',
        array: '=',
        itemname: '@'
    }
});