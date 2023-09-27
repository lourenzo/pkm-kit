import { readFile, writeFile } from 'node:fs/promises';
import Big from 'big.js';

const dateField = '(\\d{2}/\\d{2}/\\d{4})';
const moneyField = '"(-?R\\$ [^"]+)"';
const percentileField = '"([^%]+%)"';

//let fieldParser = /(\d{2}\/\d{2}\/\d{4}),\"R\$ ([^\"]+)\",\"R\$ ([^\"]+)\",\"R\$ ([^\"]+)\",\"([^\"]+)\%\"/;
const fieldParser = new RegExp(
	[
		dateField,
		moneyField,
		moneyField,
		moneyField,
		percentileField,
		moneyField,
		moneyField,
		percentileField,
		moneyField,
		percentileField,
		percentileField,
		moneyField,
		percentileField,
		moneyField,
		percentileField,
		moneyField,
		percentileField,
	].join(),
);

const parseHeader = (header) => header.split(',').slice(0, 17);

const parserNumber = (numericString) => {
	if (numericString.match(/R\$/)) {
		return Big(numericString.replace(/(R\$)| |\./g, '').replace(',', '.'));
	}
	if (numericString.match(/%$/)) {
		return Big(numericString.replace(/\%|\.| /g, '').replace(',', '.')).div(100);
	}
	return numericString;
};

(async () => {
	console.log('Oi!');
	console.log({ fieldParser });
	const csvText = (await readFile('./Planejamento2023-Aplic.csv')).toString();
	const csvLines = csvText.split(/\r?\n/);
	let lineNumber = 0;
	let header = {};
	let result;
	const dataItems = [];

	for (const line of csvLines) {
		lineNumber++;
		let result;
		if (lineNumber === 2) {
			header = parseHeader(line);
			result = header;
		}
		if (lineNumber > 2) {
			const match = line?.match(fieldParser)?.slice(1);
			if (match) {
				result = Object.fromEntries(header.map((key, idx) => [key, parserNumber(match[idx])]));
				dataItems.push(result);
			}
		}
		//console.log(line);
		//console.log(dataItems);
	}
	const output = fields;
	console.log(JSON.stringify(dataItems));
	await writeFile('cdb-data-001.json', JSON.stringify(dataItems));
	console.log('Done!');
	//console.log({ csvText, cdbItems });
})();
//csvText = readFile("./Planejamento 2023 - Aplicações.csv")
