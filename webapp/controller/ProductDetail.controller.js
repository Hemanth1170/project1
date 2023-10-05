sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/m/MessageToast",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller,
	History,
	MessageToast, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("project1.controller.ProductDetail", {
		/**
		 * @override
		 */
		onInit: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("RouteToProductDetail").attachMatched(this._onRouteMatched, this);
		},
		_onRouteMatched: function (oEvent) {
			var self = this;
			var oArgs, oView;
			oArgs = oEvent.getParameter("arguments");
			oView = this.getView();
			var aFilter = [];
			var oFilter = new Filter("ProductID", FilterOperator.EQ, oArgs.productid);
			aFilter.push(oFilter);
			var oModel = this.getOwnerComponent().getModel("productModel");
			oModel.read("/ProductSet", {
				filters: aFilter,
				success: function(oData){
					var oProdDetailModel = new sap.ui.model.json.JSONModel(oData.results);
					self.getView().setModel(oProdDetailModel, "oProdDetailModel");
					// oModelJson.setData(oData);
				},
				error: function(error) {
					MessageToast(error);
				}
			});
			// oView.bindElement({
			// 	path: "/Product(" + oArgs.productid + ")",
			// 	events: {
			// 		change: this._onBindingChange.bind(this),
			// 		dataRequested: function (oEvent) {
			// 			oView.setBusy(true);
			// 		},
			// 		dataReceived: function (oEvent) {
			// 			oView.setBusy(false);
			// 		}
			// 	}
			// });
		},
		_onBindingChange: function (oEvent) {
			var oRouter = this.getOwnerComponent().getRouter();
			// No data for the binding
			if (!this.getView().getBindingContext()) {
				oRouter.getTargets().display("notFound");
			}
		},
		onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("RouteToNotFound", {}, true /*no history*/);
			}
		},
	});
});