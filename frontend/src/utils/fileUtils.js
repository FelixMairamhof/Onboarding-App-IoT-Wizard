import * as XLSX from 'xlsx';
import axios from 'axios';

/**
 * Processes the file, reads it, and converts it to JSON.
 * 
 * @param {File} file - The file to process.
 * @param {object} columnNames - The names of the columns to read.
 * @returns {Promise<object>} - A promise that resolves to an object containing the status and message.
 */
export const processFileData = async (file, columnNames) => {
  return new Promise((resolve) => {
    if (!file) {
      resolve({ type: 'error', message: 'No file provided' });
      return;
    }

    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls') && !file.name.endsWith('.csv')) {
      resolve({ type: 'error', message: 'Please upload a valid spreadsheet file (.xlsx, .xls, .csv)' });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      try {
        const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        const headers = sheetData[0];

        const jsonData = sheetData.slice(1).map(row => ({
          serialNumber: row[headers.indexOf(columnNames.serialNumber)],
          devEui: row[headers.indexOf(columnNames.devEui)],
          appEui: row[headers.indexOf(columnNames.appEui)],
          appKey: row[headers.indexOf(columnNames.appKey)],
        })).filter(row => 
          row.serialNumber !== undefined &&
          row.devEui !== undefined &&
          row.appEui !== undefined &&
          row.appKey !== undefined
        );

        if (Object.values(columnNames).some(name => !headers.includes(name))) {
          resolve({
            type: 'error',
            message: 'One or more specified columns were not found in the file.',
          });
          return;
        }

        axios.post('http://localhost:3000/api/sensor-data', jsonData)
          .then(response => {
            resolve({
              type: 'success',
              message: `File "${file.name}" uploaded successfully.`,
            });
          })
          .catch(error => {
            console.error('Error posting data:', error);
            resolve({
              type: 'error',
              message: 'Error posting sensor data to the server.',
            });
          });

      } catch (error) {
        resolve({
          type: 'error',
          message: 'Error processing the spreadsheet file. Please try again.',
        });
      }
    };

    reader.readAsArrayBuffer(file);
  });
};export const processJsonData = async (file, keys) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject({ type: 'error', message: 'No file provided' });
      return;
    }

    // Check if the file is a JSON file
    if (!file.name.endsWith('.json')) {
      reject({ type: 'error', message: 'Please upload a valid JSON file (.json)' });
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const jsonData = JSON.parse(e.target.result);

        // Ensure jsonData is an array of objects
        if (!Array.isArray(jsonData)) {
          throw new Error('JSON data should be an array of objects.');
        }

        // Validate that each object contains required keys and is not empty
        const mappedData = jsonData.map(item => ({
          serialNumber: item[keys.serialNumber] || '',
          devEui: item[keys.devEui] || '',
          appEui: item[keys.appEui] || '',
          appKey: item[keys.appKey] || '',
        })).filter(row =>
          row.serialNumber.trim() !== '' && // Ensure serialNumber is not empty
          row.devEui.trim() !== '' && 
          row.appEui.trim() !== '' && 
          row.appKey.trim() !== ''
        );

        // Check if any data remains after filtering
        if (mappedData.length === 0) {
          reject({ type: 'error', message: 'No valid data found in the JSON file.' });
          return;
        }

        // Send data to the backend
        const response = await fetch('http://localhost:3000/api/sensor-data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(mappedData)
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        resolve({ message: 'Data successfully uploaded.' });
      } catch (error) {
        reject({ type: 'error', message: error.message || 'Error processing JSON data.' });
      }
    };

    reader.readAsText(file);
  });
};
