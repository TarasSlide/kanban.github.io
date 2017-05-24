function RemoveButtonController() {

}

angular.module('remove').component('removeButton', {
    templateUrl: '/buttons/remove-button/remove-button.template.html',
    controller: RemoveButtonController,
    bindings: {
        removeData: '=',
        removeIndex: '='
    }
});