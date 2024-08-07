import * as XLSX from "xlsx";
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
      resolve({ type: "error", message: "No file provided" });
      return;
    }

    if (!file.name.endsWith(".xlsx") && !file.name.endsWith(".xls") && !file.name.endsWith(".csv")) {
      resolve({ type: "error", message: "Please upload a valid spreadsheet file (.xlsx, .xls, .csv)" });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      try {
        const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        const headers = sheetData[0];
        const jsonData = sheetData.slice(1).map(row => {
          return {
            serialNumber: row[headers.indexOf(columnNames.serialNumber)],
            devEui: row[headers.indexOf(columnNames.devEui)],
            appEui: row[headers.indexOf(columnNames.appEui)],
            appKey: row[headers.indexOf(columnNames.appKey)],
          };
        });

        // Ensure all specified columns are found
        if (Object.values(columnNames).some(name => !headers.includes(name))) {
          resolve({
            type: "error",
            message: "One or more specified columns were not found in the file.",
          });
          return;
        }

        console.log(jsonData);
        //TODO: Delete empty jsons and  store it in DB
        // Process jsonData as needed 
        resolve({
          type: "success",
          message: `File "${file.name}" uploaded successfully.`,
        });
      } catch (error) {
        resolve({
          type: "error",
          message: "Error processing the spreadsheet file. Please try again.",
        });
      }
    };

    reader.readAsArrayBuffer(file);
  });
};
