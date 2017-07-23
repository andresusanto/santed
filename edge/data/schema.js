const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');

const typeDefs = `
type Workschedule {
  id: String
  updated: String
  created: String
  persNo: String
  pa: String
  planned: Float
  pws: String
  wsRuleId: String
  wsRule: String
  employmentStatus: String
  companyCode: String
  startDate: String
  endDate: String
}
type Leave {
  id: String
  persNo: String
  firstName: String
  lastName: String
  employeeGroup: String
  employeeSubgroup: String
  positionId: String
  position: String
  orgUnitId: String
  orgUnit: String
  aaType: String
  type: String
  startDate: String
  endDate: String
  changedBy: String
  changedOn: String
  superior: String
  days: Int
  totalPayrollHours: Int
  calDays: Int
  totalCalDays: Int
  days3: Int
  totalAbsHours: Int
  totalAbsenceDays: Int
  totalPayrollDays: Int
}
type RedTicket {
  id: String
  companyNo: String
  name: String
  businessUnit: String
  position: String
  medicalDate: String
  outcome: String
  comment: String
  toReturnDate: String
  required: Boolean
  expiryDate: String
}
type License {
  id: String
  updated: String
  created: String
  user: String
  active: Boolean
  firstName: String
  lastName: String
  middleInitial: String
  entityId: String
  itemType: String
  entityType: String
  itemRevisionDate: String
  revisionNumber: String
  entityTitle: String
  scheduledOfferingId: String
  completionDate: String
  grade: String
  completionStatusId: String
  completionStatus: String
  totalHours: Int
  creditHours: Int
  contactHours: Int
  cpe: Int
  tuition: Int
  currencySymbol: String
  currencyId: String
  instructor: String
  lastUpdateUser: String
  lastUpdateTime: String
  esigMeaningCode: String
  comments: String
}
type MiningClock {
  updated: String
  created: String
  cardNumber: String
  layoutId: String
  transitDate: String
  transitStatusId: String
  transitStatus: String
  sbiType: String
  sbiId: String
  lastName: String
  firstName: String
  identifier: String
  zone: String
  terminal: String
  reason: String
  accessControlType: String
  timeAttendanceType: String
  canteenType: String
  sapType: String
  strTransitType: String
  directionId: String
  direction: String
  userType: String
  visitorCompany: String
  parameter1: String
  parameter2: String
  parameter3: String
  parameter4: String
  parameter5: String
  granted: Boolean
  supervised: Boolean
  siteId: String
  siteAcronym: String
  insertDate: String
  locationTagName: String
  locationFullName: String
}
type Miner {
  updated: String
  created: String
  persNo: String
  lastName: String
  firstName: String
  employeeGroup: String
  employeeSubgroup: String
  positionId: String
  position: String
  orgUnitId: String
  orgUnit: String
  superior: String
  totalAbsHours: Float
}
type Assignment {
  miner: Miner
  position: String
  status: String
}
type Requirement {
  license: String
  num: Int
}
type Project {
  updated: String
  created: String
  startDate: String
  endDate: String
  name: String
  type: String
  description: String
  site: String
  cost: String
  rejected: [String]
  assignments: [Assignment]
  requirements: [Requirement]
}
type Query {
  workschedule: [Workschedule]
  leave: [Leave]
  redTicket: [RedTicket]
  license: [License]
  miningClock: [MiningClock]
  project: [Project]
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
module.exports = schema;
