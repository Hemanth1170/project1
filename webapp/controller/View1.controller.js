sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("project1.controller.View1", {
            onInit: function () {
                var oModel = new sap.ui.model.odata.v2.ODataModel("productModel"); // for oData model
                var oJsonModel = new sap.ui.model.json.JSONModel(); // for json model
                // this.getView().setModel(oModel, "NewoModel");
            },

            onPressGoto: function (oEvent) {
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteToProducts");
            }
        });
    });
