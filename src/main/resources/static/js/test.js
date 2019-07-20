$(document).ready(function() {
	$('#myForm').submit(function(e) {
		e.preventDefault();
		var frm = $('#myForm');
		var data = {};
		var brand_span = $("#brand_span").text();
		var brand_value = $("#brand_value").val(brand_span);
		var model_span = $("#model_span").text();
		var model_value = $("#model_value").val(model_span);
		$.each(this, function(i, v) {
			var input = $(v);
			data[input.attr("name")] = input.val();
			delete data["undefined"];
		});
		saveRequestedData(frm, data, "car")
	});
	
	function saveRequestedData(frm, data, type) {
		$.ajax({
			contentType: "application/json; charset=utf-8",
			type: frm.attr("method"),
			url: frm.attr("action"),
			dataType: 'json',
			data: JSON.stringify(data),
			success: function(data) {
				alert(data.message);
				console.log(data);
			}
		});
	}
});