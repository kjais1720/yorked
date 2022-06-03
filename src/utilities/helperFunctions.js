/**
 * 
 * @param {string} text The text to truncate
 * @param {number} length The max length of the truncated text
 * @returns string Truncated text with "..." appended to it
 */
 export const truncateText = (text, length) => text.slice(0,length+1)+"...";

 /**
  * @param {string} list The list to find the item from
  * @param {string} parameterValue The parametr value to find the items in the list with
  * @param {string} parameter The parameter needed to match the item with the list items;
  */
 export const isItemInList = (list, parameterValue, parameter = "_id") => list.some(item=> item[parameter] === parameterValue);