import GLOBAL from '../data/global.js'

/**
 * This method records in local storage about the login/logout
 * 
 * @param {boolean} logged 
 * @param {string} name 
 * @param {string} role 
 * @param {string} email 
 */
export function setAuthData(logged, name = "", role = "", email = "") {
    let data = {
        logged: logged,
        name: name,
        role: role,
        email: email
    };

    localStorage.setItem('user', JSON.stringify(data));
}

/**
 * This methods is getting all data from local storage about the user logged
 */
export function getAuthData() {
    return JSON.parse(localStorage.getItem('user'));
}

export function getDataFromAPI(itemName) {
    let xhr = new XMLHttpRequest();
    let itemURL = itemName === 'clients' || itemName === 'users' ? GLOBAL.api_clients : GLOBAL.api_policies;

    xhr.addEventListener("load", () => {
        let list = JSON.parse(xhr.responseText);

        if (itemName === 'users') {
            GLOBAL.clients = this.filterBy(localStorage.getItem("users"));
        } else {
            itemName === "clients" ? GLOBAL.clients = list.clients : GLOBAL.policies = list.policies;
        }
    });

    xhr.open("GET", GLOBAL.api_base_url + itemURL);
    xhr.send();
}

/**
 * This method set list of policies ordering by client
 *
 * @param {array} obj
 */
export function setPoliciesListByClient(obj) {
    let qtyOfPolicies = obj.length;
    let totalInsured = sumField(obj);

    let itemsList = {
        qty: qtyOfPolicies,
        totalInsured: totalInsured,
        policies: groupBy(obj, 'clientId')
    }

    return itemsList;
}

/**
 * This method return the whole array from any key if field value is null, 
 * otherwise, returns an array with the filter entered
 * 
 * @param {array} array 
 * @param {string} field 
 * @param {string} value 
 */
export function filterBy(array, field = null, value = null) {
    var filtered = [];
    var obj = JSON.parse(array);

    for (var key in obj)
    {
        obj[key].forEach( (item) => {
            if (field === null) {
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
        for (var i = 0; i < obj.length; i++) {
            var item = obj[i];
            
            if (item[field] === value) {
                filtered.push(item);
            } else if(value === 'all') {
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
        for (var i = 0; i < obj.length; i++) {
            var item = obj[i];
            if (item[field] === value) {
                this.setAuthData(true, item['name'], item['role'], value);

                
                /*GLOBAL.user.name = item['name'];
                GLOBAL.user.role = item['role'];
                GLOBAL.user.email = value;*/
                break;    
            }               
        }  

        let authData = this.getAuthData();
        
        if(!authData.logged)
            GLOBAL.msg = "No match found in our records!";

        return authData;
    } else {
        return "No value to search!";
    }
}

function sumField(obj) {
    let total = 0;

    for (let i = 0; i < obj.length; i++) {
        total += obj[i].amountInsured;
    }

    return total;
}

var groupBy = (item, key) => {
    return item.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
}