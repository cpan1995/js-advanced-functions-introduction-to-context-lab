// Your code here
function createEmployeeRecord(employeeFirstName){
    let object = {
        firstName: employeeFirstName[0],
        familyName: employeeFirstName[1],
        title: employeeFirstName[2],
        payPerHour: employeeFirstName[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return object;
}

function createEmployeeRecords(nestedArray){
    let arrayOfObjects = []
    nestedArray.forEach(element => {
        arrayOfObjects.push(createEmployeeRecord(element))
    })
    return arrayOfObjects;
}

function createTimeInEvent(employeeRecord, timeStamp){
    let newTimeStamp = timeStamp.split(' ');
    let newTimeInEventObject = {
        type: "TimeIn",
        hour: parseInt(newTimeStamp[1]),
        date: newTimeStamp[0]
    }
    employeeRecord.timeInEvents.push(newTimeInEventObject)
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, timeStamp){
    let newTimeStamp = timeStamp.split(' ')
    let newTimeOutEventObject  = {
        type: "TimeOut",
        hour: parseInt(newTimeStamp[1]),
        date: newTimeStamp[0]
    }
    employeeRecord.timeOutEvents.push(newTimeOutEventObject);
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date){
    let timeWorked
    employeeRecord.timeOutEvents.find((element,index) => {
        if (element.date === date){
            timeWorked = (element.hour - employeeRecord.timeInEvents[index].hour)/100
        }
    })
    return timeWorked
}

function wagesEarnedOnDate(employeeRecord, date){
    let newPay = hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour
    return newPay;
}

function allWagesFor(employeeRecord){
    let allDays = [];
    let totalWage = 0;
    employeeRecord.timeOutEvents.forEach(element => {
        allDays.push(element.date)
    })
    allDays.forEach(element => {
        totalWage += wagesEarnedOnDate(employeeRecord, element);
    })
    return totalWage;
}

function calculatePayroll(employeeRecord){
    let allWages = 0;
    employeeRecord.forEach(element => {
        allWages += allWagesFor(element)
    })
    return allWages;
}

function findEmployeeByFirstName(employeeArray, firstName){
    console.log(employeeArray)
    let foundEmployee
    employeeArray.forEach(element => {
        if(element.firstName === firstName){
            foundEmployee = element
        }
    })
    return foundEmployee
}

function test(){
    let src = [
    ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
    ["Natalia", "Romanov", "CEO", 150]
    ]
    let emps = createEmployeeRecords(src)
    let loki = findEmployeeByFirstName(emps, "Loki")
    console.log(loki.familyName)
}

test();