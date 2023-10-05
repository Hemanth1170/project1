sap.ui.define([
    "project1.controller.BaseController",
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent"
], function (BaseController, Controller, History, UIComponent) {
    "use strict";

    return Controller.extend("project1.controller.NotFound", {
        getRouter: function () {
            return UIComponent.getRouterFor(this);
        },

        onNavBack: function () {
            var oHistory, sPreviousHash;

            oHistory = History.getInstance();
            sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                // this.getRouter().navTo("RouteToView2");  //Either navigate back to the previous view
                this.getRouter().navTo("RouteToProducts");     //Or navigate back to the main/home view
            }
        }
    });
});