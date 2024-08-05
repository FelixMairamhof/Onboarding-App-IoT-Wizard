import { db } from "../firebase/firebase-config";
import { setDoc, doc } from "firebase/firestore";

/**
 * Stores JSON data in Firestore.
 * 
 * @param {Array} jsonData - Array of JSON objects to store.
 */
export default async function storeDataToFirestore(jsonData) {
  for (const jsonObject of jsonData) {
    const { serialNumber, devEui, appEui, appKey } = jsonObject;

    // Ensure serialNumber is a valid document ID
    if (serialNumber) {
      try {
        // Specify the collection and document path
        const docRef = doc(db, 'SeriesNumbers', serialNumber);
        
        // Set the document data
        await setDoc(docRef, {
          devEui,
          appEui,
          appKey
        });

        console.log(`Document ${serialNumber} successfully written!`);
      } catch (error) {
        console.error(`Error writing document ${serialNumber}:`, error);
      }
    } else {
      console.error("Invalid serial number:", serialNumber);
    }
  }
}
