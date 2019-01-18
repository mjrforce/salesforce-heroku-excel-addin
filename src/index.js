/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */
import * as OfficeHelpers from '@microsoft/office-js-helpers';
var jsforce = require('jsforce');
var settings = {
    loginUrl: process.env.LOGIN_URL,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI
};
var dlg;
var connection = null;

$(document).ready(function() {
    $('#run').click(run);
    $('#create-table').click(createTable);
	$('#open-dialog').click(openDialog);
});

Office.initialize = (reason) => {
    $('#sideload-msg').hide();
    $('#app-body').show();
};

function openDialog() {
    var signInUrl = $('#loginUrl').val();
    console.log('signInUrl: ' + signInUrl);
    Office.context.ui.displayDialogAsync(signInUrl, {
            height: 70,
            width: 40
        },
        function(result) {
			console.log('result: ' + JSON.stringify(result));
            dlg = result.value;
            dlg.addEventHandler("dialogMessageReceived", processMessage);
        });
}

function processMessage(arg) {
    console.log(arg.message);
	var oauthresult = JSON.parse(arg.message);
	connection = {
	  instanceUrl : oauthresult.instanceUrl,
	  accessToken : oauthresult.accessToken
	};
    dlg.close();
}

function createTable() {
    console.log('creating table');
	
	$.getJSON( '/data/query', {q : 'select Id, Name from Account limit 10', connection : connection}).done(function(data){
		console.log(data);	
		Excel.run(function(context) {

				var sheet = context.workbook.worksheets.getActiveWorksheet();
				// Write the data into the range first 
				
				var arraydata = [
					["Id", "Name"]
				];
				for(var i = 0; i<data.records.length; i++){
					console.log(data.records[i]);
					arraydata.push([data.records[i].Id, data.records[i].Name]);
				}
				var range = sheet.getRange("A1:B" + data.records.length);
				range.values = arraydata;
				
				// Create the table over the range
				var table = sheet.tables.add('A1:B' + data.records.length, true);
				table.name = "Example";

				return context.sync();
			})
			.catch(function(error) {
				console.log("Error: " + error);
				if (error instanceof OfficeExtension.Error) {
					console.log("Debug info: " + JSON.stringify(error.debugInfo));
				}
			});
		});
}

async function run() {
    try {
        await Excel.run(async context => {
            /**
             * Insert your Excel code here
             */
            const range = context.workbook.getSelectedRange();

            // Read the range address
            range.load('address');

            // Update the fill color
            range.format.fill.color = 'yellow';

            await context.sync();
            console.log(`The range address was ${range.address}.`);
        });
    } catch (error) {
        OfficeHelpers.UI.notify(error);
        OfficeHelpers.Utilities.log(error);
    }
}