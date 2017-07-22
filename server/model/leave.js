const mongoose = require('mongoose');
const moment = require('moment');

const Leave = mongoose.Schema({
    persNo: String,
    firstName: String,
    lastName: String,
    employeeGroup: String,
    employeeSubgroup: String,
    positionId: String, // original: Position
    position: String, // original: Position2
    orgUnitId: String,
    orgUnit: String,
    aaType: String,
    type: String, // original: Attendance or Absence Type
    startDate: Date,
    endDate: Date,
    changedBy: String,
    changedOn: Date, // Chngd on
    superior: String, // Name of superior (OM)
    days: Number,
    totalPayrollHours: Number,
    calDays: Number,
    totalCalDays: Number,
    days3: Number,
    totalAbsHours: Number,
    totalAbsenceDays: Number,
    totalPayrollDays: Number,
}, {
    timestamps: {
        createdAt: 'created',
        updatedAt: 'updated',
    },
    collection: 'leaves',
});

const columnParser = {
    "Pers.no.": (item, head, res) => {
        res.persNo = item;
    },
    "Last name": (item, head, res) => {
        res.lastName = item;
    },
    "First name": (item, head, res) => {
        res.firstName = item;
    },
    "Employee Group": (item, head, res) => {
        res.employeeGroup = item;
    },
    "Employee Subgroup": (item, head, res) => {
        res.employeeSubgroup = item;
    },
    "Position": (item, head, res) => {
        res.positionId = item;
    },
    "Position2": (item, head, res) => {
        res.position = item;
    },
    "Org.unit": (item, head, res) => {
        res.orgUnitId = item;
    },
    "Organizational Unit": (item, head, res) => {
        res.orgUnit = item;
    },
    "A/AType": (item, head, res) => {
        res.aaType = item;
    },
    "Attendance or Absence Type": (item, head, res) => {
        res.type = item;
    },
    "Start date": (item, head, res) => {
        res.startDate = moment(item, "MM/DD/YYYY").toDate();
    },
    "End date": (item, head, res) => {
        res.endDate = moment(item, "MM/DD/YYYY").toDate();
    },
    "Changed by": (item, head, res) => {
        res.changedBy = item;
    },
    "Chngd on": (item, head, res) => {
        res.changedOn = moment(item, "MM/DD/YYYY").toDate();
    },
    "Name of superior (OM)": (item, head, res) => {
        res.superior = item;
    },
    "Days": (item, head, res) => {
        res.days = Number(item);
    },
    "Total payroll hrs": (item, head, res) => {
        res.totalPayrollHours = Number(item);
    },
    "Cal.days": (item, head, res) => {
        res.calDays = Number(item);
    },
    "Tot. cal.dys": (item, head, res) => {
        res.totalCalDays = Number(item);
    },
    "Days3": (item, head, res) => {
        res.days3 = Number(item);
    },
    "Tot. abs.hrs": (item, head, res) => {
        res.totalAbsHours = Number(item);
    },
    "Total absence days": (item, head, res) => {
        res.totalAbsenceDays = Number(item);
    },
    "Total payroll days": (item, head, res) => {
        res.totalPayrollDays = Number(item);
    },
};

module.exports = {
    schema: Leave,
    csvColumnParser: columnParser,
};
