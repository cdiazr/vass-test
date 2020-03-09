import GLOBAL from '../data/global.js'

export function filterByKeyName(array, keyName) {
    let key = keyName;
    let list;
    console.log(array);
    array.some((v) => Object.keys(v).indexOf(key) !== -1 && (list = v[key]), list);

    return list;
}

/**
 * This method search the value entered in the field selected
 *
 * @param {object} obj
 * @param {string} field
 * @param {string} value
 */
export function searchUserBy(obj, field, value) {
    if (value !== "") {
        let filtered = [];
        for (let i = 0; i < obj.length; i++) {
            let item = obj[i];

            if (item[field] === value) {
                filtered.push(item);
            } else if (value === "all") {
                filtered.push(item);
            }
        }

        return filtered;
    }
}

/**
 * This method check if user exist searched by field => value
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
        for (let i = 0; i < obj.length; i++) {
            let item = obj[i];
            if (item[field] === value) {
                this.setAuthData(true, item['name'], item['role'], value);
                flag = true;
                break;
            }
        }

        if (!flag)
            GLOBAL.msg = "No match found in our records!";

        return flag;
    } else {
        return "No value to search!";
    }
}