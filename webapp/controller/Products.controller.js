sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function (Controller, History) {
	"use strict";

	return Controller.extend("project1.controller.Products", {

		onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("RouteToNotFound");
			}
		},

		onListItemPressed: function (oEvent) {
			var oItem, oCtx, sPath;
			oItem = oEvent.getParameter("listItem");
			oCtx = oItem.getBindingContext("productModel");
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("RouteToProductDetail", {
				productid: oCtx.getProperty("ProductID")
			});
		},

		onPressEditItem: function (oEvent) {
			// get selected data from table (reference of table)
			var oRow = oEvent.getSource().getBindingContext("productModel");
			var sprodID = oRow.getProperty("ProductID");
			var sProdName = oRow.getProperty("Name");
			var sCategory = oRow.getProperty("Category");
			var sDesc = oRow.getProperty("Description");
			var sSuppName = oRow.getProperty("SupplierName");

			// get the fragment
			this._getDialog().open()

			// get the reference of input fields of fragment and set the values
			sap.ui.getCore().byId("idFragment--idProd").setValue(sprodID);
			sap.ui.getCore().byId("idFragment--idProdName").setValue(sProdName);
			sap.ui.getCore().byId("idFragment--idCategory").setValue(sCategory);
			sap.ui.getCore().byId("idFragment--idDescription").setValue(sDesc);
			sap.ui.getCore().byId("idFragment--idSupplier").setValue(sSuppName);
		},

		_getDialog : function() {
			// create a fragment with dialog, and pass the selected data
			if (!this.dialog) {
				// This fragment can be instantiated from a controller as follows:
				this.dialog = sap.ui.xmlfragment("idFragment","project1.fragments.AddProduct", this);
				//debugger;
			}
			//debugger;
			return this.dialog;
		},
		closeDialog : function() {
			this._getDialog().close()
		},

		onPressDeleteItem: function (oEvent) {

		}
	});
});