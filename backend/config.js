var databaseUser = "tivausr";
var databasePword = "NyPTeMMTKnXqZJFaYQjhceNBudgTGw";
var sessionDBUser = "sestivausr";
var sessionDBPword = "nnaMFtAPTkvpWhYwbTnCTrDSCpahNS";

/* TODO session datahandling and configuration for choosing enviroment
** example production or development/testing
*/
module.exports = {
  "database": "mongodb://localhost/tiva",
  "databaseCloud": "mongodb://" + databaseUser + ":" + databasePword + "@ds129733.mlab.com:29733/tiva",
  "testDB":"mongodb://localhost/tiva-test",
  "sessionDB":"mongodb://localhost/tiva-session",
  "sessionDBCloud":"mongodb://"+ sessionDBUser + ":" + sessionDBPword + "@ds047504.mlab.com:47504/tiva-session",
  "secret":"victoryisboring",
  "saltRounds":10
};
