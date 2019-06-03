sap.ui.define([
		'sap/ui/core/mvc/Controller',
		'sap/ui/model/json/JSONModel',
		'sap/m/MessageToast'
	],
	function(Controller, JSONModel, MessageToast) {
		"use strict";

		return Controller.extend("com.hcc.bk5.ap2.controller.Calendar", {
			onInit: function() {
				// create model
				var oModel = new JSONModel();
				oModel.setData({
					startDate: new Date("2019", "07", "01", "0", "0"),
					minDate: new Date("2019", "07", "01", "0", "0"),
					maxDate: new Date("2020", "00", "31", "23", "59"),
					trainings: [{
						pic: "sap-icon://complete",
						name: "Mathematik (G) A",
						role: "Training 1 - 21.08.2018 - 15.01.2019",
						appointments: [{
							start: new Date("2019", "07", "21", "08", "30"),
							end: new Date("2019", "07", "21", "13", "30"),
							type: "Type08",
							pic: "sap-icon://complete"
						}, {
							start: new Date("2019", "08", "18", "08", "30"),
							end: new Date("2019", "08", "18", "13", "30"),
							type: "Type08",
							pic: "sap-icon://complete"
						}, {
							start: new Date("2019", "09", "30", "08", "30"),
							end: new Date("2019", "09", "30", "13", "30"),
							type: "Type08",
							pic: "sap-icon://complete"
						}, {
							start: new Date("2020", "00", "15", "08", "30"),
							end: new Date("2020", "00", "15", "13", "30"),
							type: "Type08",
							pic: "sap-icon://complete"
						}]
					}, {
						pic: "sap-icon://negative",
						name: "Mathematik (G) A",
						role: "Training 2 - 21.08.2018 - 15.01.2019",
						appointments: [{
							start: new Date("2019", "07", "21", "08", "30"),
							end: new Date("2019", "07", "21", "13", "30"),
							type: "Type03",
							pic: "sap-icon://negative"
						}, {
							start: new Date("2019", "08", "18", "08", "30"),
							end: new Date("2019", "08", "18", "13", "30"),
							type: "Type03",
							pic: "sap-icon://negative"
						}, {
							start: new Date("2019", "09", "30", "08", "30"),
							end: new Date("2019", "09", "30", "13", "30"),
							type: "Type03",
							pic: "sap-icon://negative"
						}, {
							start: new Date("2020", "00", "15", "08", "30"),
							end: new Date("2020", "00", "15", "13", "30"),
							type: "Type03",
							pic: "sap-icon://negative"
						}]
					}, {
						pic: "sap-icon://complete",
						name: "Mathematik (G) B",
						role: "Training 1 - 21.08.2018 - 15.01.2019",
						appointments: [{
							start: new Date("2019", "07", "21", "08", "30"),
							end: new Date("2019", "07", "21", "13", "30"),
							type: "Type08",
							pic: "sap-icon://complete"
						}, {
							start: new Date("2019", "08", "18", "08", "30"),
							end: new Date("2019", "08", "18", "13", "30"),
							type: "Type08",
							pic: "sap-icon://complete"
						}, {
							start: new Date("2019", "09", "30", "08", "30"),
							end: new Date("2019", "09", "30", "13", "30"),
							type: "Type08",
							pic: "sap-icon://complete"
						}, {
							start: new Date("2020", "00", "15", "08", "30"),
							end: new Date("2020", "00", "15", "13", "30"),
							type: "Type08",
							pic: "sap-icon://complete"
						}]
					}, {
						pic: "sap-icon://complete",
						name: "Diversität in Lehr- und Lernprozessen",
						role: "Training 1 - 28.08.2018 - 22.01.2019",
						appointments: [{
							start: new Date("2019", "07", "28", "08", "30"),
							end: new Date("2019", "07", "28", "13", "30"),
							type: "Type08",
							pic: "sap-icon://complete"
						}, {
							start: new Date("2019", "08", "25", "08", "30"),
							end: new Date("2019", "08", "25", "13", "30"),
							type: "Type08",
							pic: "sap-icon://complete"
						}, {
							start: new Date("2019", "11", "04", "08", "30"),
							end: new Date("2019", "11", "04", "13", "30"),
							type: "Type08",
							pic: "sap-icon://complete"
						}, {
							start: new Date("2020", "00", "22", "08", "30"),
							end: new Date("2020", "00", "22", "13", "30"),
							type: "Type08",
							pic: "sap-icon://complete"
						}]
					}, {
						pic: "sap-icon://complete",
						name: "...",
						role: "Training 1 - ..",
						appointments: []
					}, {
						pic: "sap-icon://negative",
						name: "...",
						role: "Training 1 - ..",
						appointments: []
					}, {
						pic: "sap-icon://negative",
						name: "...",
						role: "Training 1 - ..",
						appointments: []
					}, {
						pic: "sap-icon://complete",
						name: "...",
						role: "Training 1 - ..",
						appointments: []
					}, {
						pic: "sap-icon://complete",
						name: "...",
						role: "Training 1 - ..",
						appointments: []
					}, {
						pic: "sap-icon://complete",
						name: "...",
						role: "Training 1 - ..",
						appointments: []
					}]
				});
				this.getView().setModel(oModel);
			},

			roles: {
				donna: "Donna Moore",
				manager: "manager",
				admin: "admin"
			},

			handleStSemChange: function() {
				this.getView().getModel().refresh(true);
			},

			getUserRole: function() {
				return this.roles.admin;
			},

			canModifyAppointments: function(sRole) {
				var sUserRole = this.getUserRole();

				if (sUserRole === this.roles.manager || sUserRole === this.roles.admin || sUserRole === sRole) {
					return true;
				}
			},

			handleAppointmentDragEnter: function(oEvent) {
				if (this.isAppointmentOverlap(oEvent, oEvent.getParameter("calendarRow"))) {
					oEvent.preventDefault();
				}
			},

			handleAppointmentDrop: function(oEvent) {
				var oAppointment = oEvent.getParameter("appointment"),
					oStartDate = oEvent.getParameter("startDate"),
					oEndDate = oEvent.getParameter("endDate"),
					oCalendarRow = oEvent.getParameter("calendarRow"),
					bCopy = oEvent.getParameter("copy"),
					oModel = this.getView().getModel(),
					oAppBindingContext = oAppointment.getBindingContext(),
					oRowBindingContext = oCalendarRow.getBindingContext(),
					handleAppointmentDropBetweenRows = function() {
						var aPath = oAppBindingContext.getPath().split("/"),
							iIndex = aPath.pop(),
							sRowAppointmentsPath = aPath.join("/");

						oRowBindingContext.getObject().appointments.push(
							oModel.getProperty(oAppBindingContext.getPath())
						);

						oModel.getProperty(sRowAppointmentsPath).splice(iIndex, 1);
					};

				if (bCopy) { // "copy" appointment
					var oProps = jQuery.extend({}, oModel.getProperty(oAppointment.getBindingContext().getPath()));
					oProps.start = oStartDate;
					oProps.end = oEndDate;

					oRowBindingContext.getObject().appointments.push(oProps);
				} else { // "move" appointment
					oModel.setProperty("start", oStartDate, oAppBindingContext);
					oModel.setProperty("end", oEndDate, oAppBindingContext);

					if (oAppointment.getParent() !== oCalendarRow) {
						handleAppointmentDropBetweenRows();
					}
				}

				oModel.refresh(true);

				MessageToast.show(oCalendarRow.getTitle() + "'s '" + "Appointment '" + oAppointment.getTitle() + "' now starts at \n" + oStartDate +
					"\n and end at \n" + oEndDate + ".");
			},

			handleAppointmentResize: function(oEvent) {
				var oAppointment = oEvent.getParameter("appointment"),
					oStartDate = oEvent.getParameter("startDate"),
					oEndDate = oEvent.getParameter("endDate");

				if (!this.isAppointmentOverlap(oEvent, oAppointment.getParent())) {
					MessageToast.show("Appointment '" + oAppointment.getTitle() + "' now starts at \n" + oStartDate + "\n and end at \n" + oEndDate +
						".");

					oAppointment
						.setStartDate(oStartDate)
						.setEndDate(oEndDate);
				} else {
					MessageToast.show("As a manager you can not resize events if they overlap with another events");
				}
			},

			handleAppointmentCreate: function(oEvent) {
				var oStartDate = oEvent.getParameter("startDate"),
					oEndDate = oEvent.getParameter("endDate"),
					oPlanningCalendarRow = oEvent.getParameter("calendarRow"),
					oModel = this.getView().getModel(),
					sPath = oPlanningCalendarRow.getBindingContext().getPath();

				oModel.getProperty(sPath).appointments.push({
					title: "New Appointment",
					start: oStartDate,
					end: oEndDate
				});

				MessageToast.show("New Appointment is created at \n" + oStartDate + "\n and end at \n" + oEndDate + ".");

				oModel.refresh(true);
			},

			isAppointmentOverlap: function(oEvent, oCalendarRow) {
				var oAppointment = oEvent.getParameter("appointment"),
					oStartDate = oEvent.getParameter("startDate"),
					oEndDate = oEvent.getParameter("endDate"),
					bAppointmentOverlapped;

				if (this.getUserRole() === this.roles.manager) {
					bAppointmentOverlapped = oCalendarRow.getAppointments().some(function(oCurrentAppointment) {
						if (oCurrentAppointment === oAppointment) {
							return;
						}

						var oAppStartTime = oCurrentAppointment.getStartDate().getTime(),
							oAppEndTime = oCurrentAppointment.getEndDate().getTime();

						if (oAppStartTime <= oStartDate.getTime() && oStartDate.getTime() < oAppEndTime) {
							return true;
						}

						if (oAppStartTime < oEndDate.getTime() && oEndDate.getTime() <= oAppEndTime) {
							return true;
						}

						if (oStartDate.getTime() <= oAppStartTime && oAppStartTime < oEndDate.getTime()) {
							return true;
						}
					});
				}

				return bAppointmentOverlapped;
			}
		});
	});