
'use strict';

function download(name, extension, data) {
	const blob = new Blob([data], { type: 'text/plain' });
	const url = window.URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.setAttribute('hidden', '')
	a.setAttribute('href', url);
	a.setAttribute('download', `${name}.${extension}`)
	document.body.appendChild(a)
	a.click()
	document.body.removeChild(a)
}
function jsonToCSV(json) {

	const csvRows = [];
	// get the headers
	const headers = Object.keys(json[0]);
	csvRows.push(headers.join(";"));
	console.log(csvRows)
	// //Add values
	for (const row of json) {
		const values = headers.map(header => {
			return row[header];
		})
		csvRows.push(values.join(";"))
	}
	return csvRows.join('\n')
}
function convertAndDownload() {
	const file = document.getElementById("file-7").files[0];
	const check = document.getElementById("checkbox");
	file.arrayBuffer().then((res) => {
		let data = new Uint8Array(res);
		let workbook = XLSX.read(data, { type: "array" });
		let first_sheet_name = workbook.SheetNames[0];
		let worksheet = workbook.Sheets[first_sheet_name];
		let json = XLSX.utils.sheet_to_json(worksheet, { raw: true });
		let csvData = jsonToCSV(json)
		const filename = file.name.split('.').slice(0, -1).join('.')
		if(check.checked){
			download(filename, 'csv', csvData);
			return;
		}
		download(filename, 'txt', csvData)
	})
}

function load(){
	var input = document.getElementById("file-7")
	input.addEventListener('change', function (e) {
		const label = document.querySelector('label')
		var fileName = '';
		if (this.files && this.files.length > 1)
			fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
		else
			fileName = e.target.value.split('\\').pop();

		if (fileName)
			label.querySelector('span').innerHTML = fileName;
		else
			label.innerHTML = labelVal;
	});
};