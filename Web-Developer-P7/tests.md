
# regex for dates example 

const dateRegex = /^[0-9]{4}-((1[0-2])|0[1-9])-([0-2][0-9]|3[0-1])$/gm;
const timeRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/gm;
const splittedDateA = a.created_at.split("T");
const splittedDateB = b.created_at.split("T");
formattedDateFromMySQLA += splittedDateA[0].match(dateRegex)[0] + ' ' + splittedDateA[1].split(".000Z")[0].match(timeRegex)[0];
formattedDateFromMySQLB += splittedDateB[0].match(dateRegex)[0] + ' ' + splittedDateB[1].split(".000Z")[0].match(timeRegex)[0];