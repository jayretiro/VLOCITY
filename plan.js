var objPlan = {};
var arrDB = [];

var vlocity = {
    $: jQuery,
    init: function() {
		$('#btnsave').click(function() {
			vlocity.savePlan();
        });
		
		$('.datePicker').datepicker({ dateFormat: 'm/dd/yy'});
		
		
		var stPlanName = $('#planname').val('Test Plan');
		var stTaskName = $('#taskname').val('Test Task');
		var stSDate = $('#startdate').val(new Date().toLocaleDateString());
		var stEDate = $('#enddate').val(new Date().toLocaleDateString());
		
		
	},
	getUrlVars: function() {
		var vars = {};
		var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
			vars[key] = value;
		});
		return vars;
	},
	savePlan: function(){
		var stPlanName = $('#planname').val();
		var stTaskName = $('#taskname').val();
		var stSDate = $('#startdate').val();
		var stEDate = $('#enddate').val();
		var bIsSave = true;
		
		if(stPlanName !== undefined && stPlanName !== '')
		{
			
			for(var i in arrDB)
			{
				var obj = arrDB[i];
				var stOPlan = obj.plan;
				var stOTask = obj.task;
				var dtOSDate = new Date(obj.sdate);
				var dtOEDate = new Date(obj.edate);
				console.log(stOPlan + ' | ' + stOTask + ' | ' + dtOSDate + ' | ' + dtOEDate);
				
				if(stOPlan === stPlanName)
				{
					if(stOTask === stTaskName)
					{
						//check if we have existing task name
						alert(stTaskName + ' is already existing. Please choose another name for this task');
						bIsSave = false;
						break;
					}
					else
					{
						//check dates
						var dates = this.getDates(new Date(stSDate), new Date(stEDate));                                                                                                           
						
						dates.forEach(function(date) {
							if(dtOSDate.getTime() === new Date(date).getTime())
							{
								
								
								alert('This schedule have a conflict with Plan[' + stOPlan + '], Task[' + stOTask + '] which starts on ' + 
									(dtOSDate.getMonth() + 1) + '/' + dtOSDate.getDate() + '/' + dtOSDate.getFullYear() + ' and ends on ' + (dtOEDate.getMonth() + 1) + '/' + dtOEDate.getDate() + '/' + dtOEDate.getFullYear());
								bIsSave = false;
								return false;
							}
							if(dtOEDate.getTime() === new Date(date).getTime())
							{
								alert('This schedule have a conflict with Plan[' + stOPlan + '], Task[' + stOTask + '] which starts on ' + 
									(dtOSDate.getMonth() + 1) + '/' + dtOSDate.getDate() + '/' + dtOSDate.getFullYear() + ' and ends on ' + (dtOEDate.getMonth() + 1) + '/' + dtOEDate.getDate() + '/' + dtOEDate.getFullYear());
								bIsSave = false;
								return false;
							}
						});
						
					}
				}
				
			}
			
			
			if(bIsSave)
			{
				objPlan = {
				'plan' :	stPlanName,
				'task' : 	stTaskName,
				'sdate':	stSDate,
				'edate':	stEDate
				};
				
			
				arrDB.push(objPlan);
				
				$('#stDB').text(JSON.stringify(arrDB));
				
				this.drawTable(arrDB);
			};
			
			
			
		}
	},
	getDates: function(dtStartDate, dtEndDate) {
		var dates = [];
		var currentDate = dtStartDate;
		
		var addDays = function(days) {
			var date = new Date(this.valueOf());
			date.setDate(date.getDate() + days);
			return date;
		};
		
		while (currentDate <= dtEndDate) {
			dates.push(currentDate);
			currentDate = addDays.call(currentDate, 1);
		}
		
		return dates;
	},
	drawTable: function(data){
		$('#example').dataTable( {
			destroy: true,
			data: data,
			"columns": [
				{ "data": "plan" },
				{ "data": "task" },
				{ "data": "sdate" },
				{ "data": "edate" }
			]
		});
	}

};