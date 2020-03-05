import GLOBAL from '../global.js'

/**
 * This method return the whole array from any key if field value is null, 
 * otherwise, returns an array with the filter entered
 * 
 * @param {array} array 
 * @param {string} field 
 * @param {string} value 
 */
export function filterBy(itemsList, field = null, value = null) {
    var filtered = [];
    var obj = JSON.parse(itemsList);

    for (var key in obj)
    {
        obj[key].forEach( (item) => {
            if(field === null) {
                filtered.push(item);
            } else {   
                if (item[field] === value) {
                    filtered.push(item);
                }
            }
        });

    }

    return filtered;
}

export function searchUserBy(obj, field, value) {
    if (value !== "") {
        let filtered = [];
        for (var i = 0; i < obj.length; i++) {
            var item = obj[i];
            
            if (item[field] === value) {
                filtered.push(item);
            }
        }

        return filtered;
    }
}

/**
 * This method search the value entered in the field selected
 * 
 * @param {object} obj 
 * @param {string} field 
 * @param {string} value 
 */
export function checkUserExist(obj, field, value)
{
    if (value !== "")
    {   
        let flag = false
        for (var i = 0; i < obj.length; i++) {
            var item = obj[i];
            if (item[field] === value) {
                flag = GLOBAL.user_logged = true;
                GLOBAL.user_name = item['name'];
                GLOBAL.user_role = item['role'];
                GLOBAL.user_email = value;
                break;    
            }               
        }  

        if(!flag)
            GLOBAL.msg = "No match found in our records!";

        return flag;
    } else {
        return "No value to search!";
    }
}