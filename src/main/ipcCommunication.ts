import Patient from "renderer/pages/patients/Patients";

const fs = require("fs");
const moment = require("moment");

// for single object
interface SessionDetails {
    id: string;
    name:string;
    date:string;
    patientId:string;
    startTime:string;
    endTime:string;
    duration:Number;
    status:string;
    description:string;
}

interface PatientDetails {
    id:string;
    name:string;
    dob:Date;
    email:string;
    mobile:string;
    age:Number;
    gender:string;
    marital_status:string;
    address:string;
    description:string;
    bci_calib_status:string;
    status:string;
}

interface ParadigmDetails {
    id:string;
    name:string;
    Randomize:string;
    trials:object;
    description:string
}

interface SessionResult {
    sessionId:string;
    patientId:string;
    paradigms:[{}];
    MIA: Number;
}

interface AssesmentDetails{
    id:string;
    patientId:string;
    lastSessionId:string;
    date:string;
    time:string;
    GS:string;
    ARAT:string;
    FuglMeyer:string;
    NineHolePeg:string;
    MAS:string;
    VAS:string;
    MIA:Number;
}

// for ist of objects
interface SessionData {
    items: SessionDetails[];
}

interface PatientData {
    items: PatientDetails[];
}

interface ParadigmData {
    items : ParadigmDetails[];
}

interface SessionResultData {
    items: SessionResult[]
}

interface AssesmentData {
    items:AssesmentDetails[]
}

// Session

export function getSessionData(sessionFileName: string): SessionData {
  const rawData = fs.readFileSync(sessionFileName);
  return JSON.parse(rawData.toString());
}

export function postSessionData(data: SessionData, sessionFileName: string): void {
  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFileSync(sessionFileName, jsonData);
}

export function getSessionDetailsById(id: string,sessionFileName: string): SessionDetails | undefined {
  const data = getSessionData(sessionFileName);
  
  return data.items.find(item => item.id === id);
}

export function getSessionByPatientId(id: string,sessionFileName: string): SessionData | undefined {
    const patientSessions = getSessionData(sessionFileName).items.filter((session) => session.patientId === id);
    
    return {items : patientSessions};;
}

export function addSession(session: SessionDetails,sessionFileName: string): void {
    const data = getSessionData(sessionFileName);
    const updatedSessionData: SessionDetails = {
     // id: `SES${data.items.length + 1}`,
      ...session
    };
    data.items.push(updatedSessionData);
    postSessionData(data,sessionFileName);
}


function formatAMPM(date:Date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    var shours = hours % 12;
    shours = shours ? shours : 12; // the hour '0' should be '12'
    var sminutes = minutes < 10 ? '0'+ minutes : minutes;
    var strTime = shours + ':' + sminutes + ' ' + ampm;
    return strTime;
}

// to get curr date on yyy-mm-dd format
function getCurDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
    
    let sdd = "";
    let smm = "";
    sdd = (dd < 10) ? '0' + dd : dd.toString();
    smm = (mm < 10) ? '0' + mm : mm.toString();

    return (yyyy + '-' + smm + '-' + sdd);
}

//to convert time in format hh:mm am/pm to hh:mm (24 hr format) input "02:05 PM"
function convertTime(time: string): string {
    let hours = Number(time.match(/^(\d+)/)![1]);
    let minutes = Number(time.match(/:(\d+)/)![1]);
    const AMPM = time.match(/\s(.*)$/)?.[1];
    if (AMPM === "PM" && hours < 12) hours += 12;
    if (AMPM === "AM" && hours === 12) hours -= 12;
    let sHours = hours.toString();
    let sMinutes = minutes.toString();
    if (hours < 10) sHours = "0" + sHours;
    if (minutes < 10) sMinutes = "0" + sMinutes;
    return `${sHours}:${sMinutes}`;
}

export function getUpcomingSessions(sessionFileName: string): SessionData {
    const sessionData: SessionData = getSessionData(sessionFileName);

    const today = getCurDate();
    
    const upcomingSessions = sessionData.items.filter((session) => {
        if(session.status === 'FINISHED') return false;
        if (session.date < today) return false;
        const aDateTime = new Date(`${session.date} ${session.endTime}`);
        const bDateTime = new Date();
          
          if (aDateTime > bDateTime) {
              return 1;
          } else if (aDateTime < bDateTime) {
              return 0;
          } else {
              return 1;
          }
      });
    
      upcomingSessions.sort((a, b) => {
        const aDate = new Date(`${a.date} ${a.startTime}`);
        const bDate = new Date(`${b.date} ${b.startTime}`);
        return aDate.getTime() - bDate.getTime();
      });

    return {items : upcomingSessions};
}

export function getPastSessions(sessionFileName: string): SessionData {
    const sessionData: SessionData = getSessionData(sessionFileName);

    const today = getCurDate();

    const pastSessions = sessionData.items.filter((session) => {
        if(session.status === "FINISHED") return true;
        if (session.date > today) return false; // Select sessions that have already occurred
        const aDateTime = new Date(`${session.date} ${session.endTime}`);
        const bDateTime = new Date();

        if (aDateTime < bDateTime) {
            return 1; // Return true if the session has already ended
        } else {
            return 0;
        }
    });

    pastSessions.sort((a, b) => {
        const aDate = new Date(`${a.date} ${a.startTime}`);
        const bDate = new Date(`${b.date} ${b.startTime}`);
        return bDate.getTime() - aDate.getTime();
      });

    return {items : pastSessions};
}

// buggy
export function get3TopUpcomingSessions(sessionFileName: string): SessionData {
    const rawData = fs.readFileSync(sessionFileName);
    const sessionData: SessionData = JSON.parse(rawData.toString());

    const currentDate = getCurDate();
    
    const sortedSessions = sessionData.items.filter(item => item.date >= currentDate).filter(item => item.endTime > formatAMPM(new Date()))
    .sort((a, b) => {
        const dateA = new Date(`${a.date} ${a.endTime}`);
        const dateB = new Date(`${b.date} ${b.endTime}`);
        return dateA.getTime() - dateB.getTime();
    });

    console.log(sortedSessions);
    
    return {items : sortedSessions};
}

export function getTopUpcomingSessions(sessionFileName: string): SessionData {
    const sessions: SessionData = getSessionData(sessionFileName);
    const today = getCurDate();
    const upcomingSessions = sessions.items.filter((session) => {
      if(session.status === 'FINISHED') return false;
      if (session.date < today) return false;
      
      const aDateTime = new Date(`${session.date} ${session.endTime}`);
      const bDateTime = new Date();
        
        if (aDateTime > bDateTime) {
            return 1;
        } else if (aDateTime < bDateTime) {
            return 0;
        } else {
            return 1;
        }
    });
    upcomingSessions.sort((a, b) => {
      const aDate = new Date(`${a.date} ${a.startTime}`);
      const bDate = new Date(`${b.date} ${b.startTime}`);
      return aDate.getTime() - bDate.getTime();
    });
    return {items : upcomingSessions.slice(0, 3)};
}

function getTimeIn24HrFormat(time: string): string {
const [timeString, modifier] = time.split(' ');
let [hours, minutes] = timeString.split(':');
if (hours === '12') {
    hours = '00';
}
if (modifier === 'pm') {
    hours = String(parseInt(hours, 10) + 12);
}
return `${hours}:${minutes}`;
}

export function getNewSES(sessionFileName: string): string {
    const sessions = getSessionData(sessionFileName);
    let maxId = 0;
  
    sessions.items.forEach((session) => {
      const sessionId = Number(session.id.replace("SES", ""));
      if (sessionId > maxId) {
        maxId = sessionId;
      }
    });
  
    return `SES${maxId + 1}`;
}

export function updateSessionStatus(id: string, status:string, sessionFileName: string){
    const sessionData = getSessionData(sessionFileName);
    const session = sessionData.items.find((s) => s.id === id);
    
    if (session) {
        session.status = status;
    }
    // Write the updated session data back to the file
    fs.writeFileSync(sessionFileName, JSON.stringify(sessionData), 'utf8');
}

// Patient

export function getAllPatientData(patientFileName: string):PatientData {
    const rawData = fs.readFileSync(patientFileName);
    return JSON.parse(rawData.toString());
}

export function getNotRecoveredPatientData(patientFileName: string):PatientData {
    const rawData = fs.readFileSync(patientFileName);
    const patients = JSON.parse(rawData.toString());

    const notRecoveredPatients = patients.items.filter((patient:PatientDetails) => patient.status === "NOT RECOVERED");
    
    return {items:notRecoveredPatients};
}

export function getRecoveredPatientData(patientFileName: string):PatientData {
    const rawData = fs.readFileSync(patientFileName);
    const patients = JSON.parse(rawData.toString());

    const recoveredPatients = patients.items.filter((patient:PatientDetails) => patient.status === "RECOVERED");

    return {items:recoveredPatients};
}

export function PostPatientData(data: PatientData,patientFileName: string): void {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(patientFileName, jsonData);
}

export function getPatientDetailsById(id: string,patientFileName: string): PatientDetails | undefined {
    const rawData = fs.readFileSync(patientFileName);
    const data: PatientData = JSON.parse(rawData.toString());

    return data.items.find(item => item.id === id);
}

export function addPatient(item: PatientDetails,patientFileName: string): void {
    const rawData = fs.readFileSync(patientFileName);
    const data = JSON.parse(rawData.toString());

    const newItem: PatientDetails = {
     // id: `PID${data.items.length + 1}`,
      ...item
    };
    data.items.push(newItem);
    PostPatientData(data,patientFileName);
}

export function getNewPID(patientFileName: string): string {
    const rawData = fs.readFileSync(patientFileName);
    const patients: PatientData = JSON.parse(rawData.toString());
    let maxId = 0;
  
    patients.items.forEach((patient) => {
      const patientId = Number(patient.id.replace("PID", ""));
      if (patientId > maxId) {
        maxId = patientId;
      }
    });
  
    return `PID${maxId + 1}`;
}

export function updatePatientStatus2(id: string,patientFileName: string) {
    const rawData = fs.readFileSync(patientFileName);
    const patients: PatientData = JSON.parse(rawData.toString());
    const statusToUpdate = "RECOVERED";
  
    patients.items.map(patient => {
      if (patient.id === id) {
        return {
          ...patient,
          status: statusToUpdate
        }
    }
    return patient;
    });
    PostPatientData(patients, patientFileName);
    return patients.items.find(patient => patient.id === id);
}

export function updatePatientStatus(id: string, patientFileName:string): PatientDetails | undefined {
    const rawData = fs.readFileSync(patientFileName);
    const patientsData: PatientData = JSON.parse(rawData.toString());
    
    const updatedPatient = patientsData.items.find(patient => patient.id === id);
    if (!updatedPatient) {
      console.log('Patient not found');
      return undefined;
    }
  
    updatedPatient.status = 'RECOVERED';
    fs.writeFileSync(patientFileName, JSON.stringify(patientsData, null, 2));
  
    return updatedPatient;
  }

// export function getPatientNameById(id:string) {
//     const patients = getPatientData(patientFileName);
//     const patient = patients.items.find((item) => item.id === id);
//     return patient ? patient.name : null;
// }

////////// To run .ts file command :- npx ts-node filename.ts

// console.log(getSessionData(sessionFileName));
// console.log(getSessionDetailsById('SES104'));
// console.log(getPatientDetailsById('PID102'));

// export function updateItemById(id: string, file: string, updates: Record<string, any>): void {
//   const data = readData(dataFileName);
//   const itemIndex = data.items.findIndex(item => item.id === id);
//   if (itemIndex === -1) {
//     throw new Error(`Item with ID ${id} not found`);
//   }
//   const updatedItem: SessionDetails = { ...data.items[itemIndex], file, ...updates };
//   data.items[itemIndex] = updatedItem;
//   writeData(dataFileName,data);
// }

// export function deleteItemById(id: string): void {
//   const data = readData(dataFileName);
//   const itemIndex = data.items.findIndex(item => item.id === id);
//   if (itemIndex === -1) {
//     throw new Error(`Item with ID ${id} not found`);
//   }
//   data.items.splice(itemIndex, 1);
//   writeData(dataFileName,data);
// }


// Paradigms

export function getParadigmsData(paradigmFileName: string): ParadigmData{
    const rawData = fs.readFileSync(paradigmFileName);
    return JSON.parse(rawData.toString());
}

export function getParadigmById(id: string,paradigmFileName: string): ParadigmDetails | undefined {
    const data = getParadigmsData(paradigmFileName);
    return data.items.find(item => item.id === id);
}


// results

export function getSessionResultData(sessionResult: string): SessionResultData{
    const rawData = fs.readFileSync(sessionResult);
    return JSON.parse(rawData.toString());
}

export function getSessionResultById(id: string,sessionResult: string): SessionResult | undefined {
    const data = getSessionResultData(sessionResult);
    return data.items.find(item => item.sessionId === id);
}

export function getSessionResultByPatientId(id: string,sessionResult: string): SessionResultData | undefined {
    const data = getSessionResultData(sessionResult);
    
    return {items:data.items.filter(item => item.patientId === id)};
}

export function saveSessionResult(data: SessionResult,sessionResult: string): void {
    // Check if the file already exists
if (fs.existsSync(sessionResult)) {
    // Read the existing data from the file
    const existingData: SessionResultData = getSessionResultData(sessionResult);
  
    // Check if a record with the given sessionId already exists
  const existingRecordIndex = existingData.items.findIndex(
    (record) => record.sessionId === data.sessionId
  );

  if (existingRecordIndex !== -1) {
    // Merge the incoming paradigms data with the existing record
    existingData.items[existingRecordIndex].paradigms.push(
      ...data.paradigms
    );
  } else {
    // Add a new record with the incoming data
    existingData.items.push(data);
  }
  
    // Write the updated data back to the file
    fs.writeFileSync(sessionResult, JSON.stringify(existingData));
  } else {
    // Create a new file with the incoming data
    fs.writeFileSync(sessionResult, JSON.stringify([data]));
  }
}

// assesment 

export function getAssesmentData(assessmentFileName: string): AssesmentData{
    const rawData = fs.readFileSync(assessmentFileName);
    return JSON.parse(rawData.toString());
}

export function getNewASSES(assessmentFileName: string): string {
    const assesments = getAssesmentData(assessmentFileName);
    let maxId = 0;
    
    assesments.items.forEach((assesment) => {
      const patientId = Number(assesment.id.replace("ASSES", ""));
      if (patientId > maxId) {
        maxId = patientId;
      }
    });
  
    return `ASSES${maxId + 1}`;
}

export function addAssesment(item: AssesmentDetails,assessmentFileName: string): void {
    const data = getAssesmentData(assessmentFileName);
    const newItem: AssesmentDetails = {
      ...item
    };
    data.items.push(newItem);
    fs.writeFileSync(assessmentFileName, JSON.stringify(data));
}