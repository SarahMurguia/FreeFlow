// JavaScript Document
$(function () { // Wait til all DOM loaded
	/******************** GLOBAL VARIABLE ********************/
	var serv = "http://freeflow.tk/query.php",
		user_id, ip, newip, btn, svc = [4];

	/******************** HELPING FUNCTIONS ********************/
	// Get network'n' from ip
	function getArrVal(array, n) {
		switch (n) {
			case 1:
				return array[0].network1;
			case 2:
				return array[0].network2;
			case 3:
				return array[0].network3;
			default:
				return null;
		}
	}

	// Get service name by number or abbv.
	function getSvcName(n, short) {
		switch (n) {
			case 'nf':
			case 1:
				return short ? 'nf' : 'Netflix';
			case 'hl':
			case 2:
				return short ? 'hl' : 'hulu';
			case 'hb':
			case 3:
				return short ? 'hb' : 'HBO';
		}
	}
	
	// Change ip
	function changeNet(s, n, v) {
		$.post(serv, { query: "UPDATE " + getSvcName(s, false).toLowerCase() + " SET network" + n + " = " + v + " WHERE userid = " + user_id + ";"});
	} 

	// Get service status
	function getNetStat(n, ret) {
		var s = getSvcName(n, true);
		if (ret != ' []') {
			svc[n] = JSON.parse(ret);
			$.each(svc[n][0], function (key, value) {
				var net = key.split("network");
				$('#' + s + key).prop('checked', parseInt(value));
			});
			$('#no' + s).val(getSvcName(n, false) + 'account not found<br>Please add one before sharing.');
			$('#no' + s).prop('hidden', true);
			$('#con' + s).prop('hidden', false);
		} else {
			$('#no' + s).prop('hidden', false);
			$('#con' + s).prop('hidden', true);
		}
	}

	// Get current status
	function getStat() {
		// Get IPs stat
		$.post(serv, {
			query: "SELECT network1, network2, network3 FROM users WHERE userid = " + user_id + ";"
		}, function (ret) {
			ip = JSON.parse(ret);
			$('.ip1').each(function () {
				$(this).val(ip[0].network1);
			});
			$('.ip2').each(function () {
				$(this).val(ip[0].network2);
			});
			$('.ip3').each(function () {
				$(this).val(ip[0].network3);
			});
			$('.switch label input').each(function() {
				var sw = this.id.split('network');
				this.disabled = this.checked = $('#' + sw[0] + 'ip' + sw[1]).val() == '';
			})
		});
		// Netflix stat
		$.post(serv, {
			query: "SELECT network1, network2, network3 FROM netflix WHERE userid = " + user_id + ";"
		}, function (ret) {
			getNetStat(1, ret);
		});
		// hulu stat
		$.post(serv, {
			query: "SELECT network1, network2, network3 FROM hulu WHERE userid = " + user_id + ";"
		}, function (ret) {
			getNetStat(2, ret);
		});
		// HBO stat
		$.post(serv, {
			query: "SELECT network1, network2, network3 FROM hbo WHERE userid = " + user_id + ";"
		}, function (ret) {
			getNetStat(3, ret);
		});
	}

	/******************** INIT ********************/
	$('body').bootstrapMaterialDesign(); // Trigger Material Design Animation
	chrome.storage.sync.get('user_id', function (ret) { // Get user_id from local storage
		if (!chrome.runtime.error) {
			user_id = ret.user_id;
			getStat(); // Initially get current status
		}
	});

	/******************** BUTTONS HANDLER ********************/
	// Toolbar buttons
	$('#back').click(function () {
		window.location = '/accountpage/accountpage.html';
	});
	$('#refresh').click(function () {
		getStat();
	});

	// All more(...) buttons
	$('.more').click(function () {
		btn = JSON.parse($(this).val());
		$('#mtitle').text(getSvcName(btn.s, false) + ' Network ' + btn.n);
		$('#ip').val(getArrVal(ip, btn.n));
	});

	// Main modal buttons
	$('#del').click(function () {
		$('#ctitle').text('Delete IP');
		$('#yes').prop('class', 'btn btn-danger');
		if (getArrVal(svc[btn.s], btn.n) != null) {
			$('#cbody').text("Are you sure to delete " + getArrVal(ip, btn.n) + "? This can't be undo!")
			$('#cbtn').prop('hidden', false);
		} else {
			$('#cbody').text("This network is already empty!");
			$('#cbtn').prop('hidden', true);
		}
	});
	$('#get').click(function () {
		$.get('http://ipv4.icanhazip.com', function (ret) {
			$('#ip').val(ret);
		})
	});
	$('#sav').click(function () {
		$('#ctitle').text('Save New IP');
		$('#yes').prop('class', 'btn btn-primary');
		if ($('#ip').val() != '') {
			var at, exist = false;
			$.each(ip[0], function(key, value) {
				if (value == $('#ip').val()) {
					exist = true;
					at = key;
				}
			});
			if (exist) {
				$('#cbody').text("The new IP " + $('#ip').val() + " have already been exist at " + at[0].toUpperCase() + at.slice(1));
				$('#cbtn').prop('hidden', true);
			} else {
				$('#cbody').text("Are you sure to save " + $('#ip').val() + " as your new IP in " + getSvcName(btn.s, false) + " Network " + btn.n.toString() + "? This can't be undo!");
				$('#cbtn').prop('hidden', false);
			}
		} else {
			$('#cbody').text("New IP can't be empty! To delete, click DELETE button instead.");
			$('#cbtn').prop('hidden', true);
		}
	});

	// Confirm button
	$('#yes').click(function () {
		if ($('#yes').attr('class') == 'btn btn-danger') {
			$('#ip').val('');
			var i;
			for (i = 1; i < 4; i++)
				changeNet(i, btn.n, false);
		}
		$.post(serv, { query: "UPDATE users SET network" + btn.n + "='" + $('#ip').val() + "' WHERE userid = " + user_id + ";" }, function(ret) {
			getStat();
		});
	});
	
	/******************** SWITCH HANDLER ********************/
	$('.switch label input').change(function() {
		var sw = this.id.split('network');
		changeNet(sw[0], sw[1], this.checked);
	})
});
