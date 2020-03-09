import GLOBAL from '../data/global.js'

/**
 * This method records in local storage about the login/logout
 * 
 * @param {boolean} logged 
 * @param {string} name 
 * @param {string} role 
 * @param {string} email 
 */
export function setAuthData(logged, name = "", role = "", email = "")
{   
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
export function getAuthData() 
{
    return JSON.parse(localStorage.getItem('user'));
}

export function getDataFromAPI(itemName)
{
    let xhr = new XMLHttpRequest();
    let itemURL = itemName === 'clients' || itemName === 'users' ? GLOBAL.api_clients : GLOBAL.api_policies;

    xhr.addEventListener("load", () => {
        let list = JSON.parse(xhr.responseText);

        if(itemName === 'users') {
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
 * @param {array} array
 */
export function setPoliciesListByClient(obj, clientID)
{
    let qtyOfPolicies = Object.keys(obj).length;
    let totalInsured = sumField(obj, 'amountInsured');

    let itemsList = {
        qty: qtyOfPolicies,
        totalInsured: totalInsured,
        policies: groupBy(obj, 'clientId')
    }

    return getPoliciesByClient(itemsList, clientID);
}

/**
 * This method return the whole array from any key if field value is null, 
 * otherwise, returns an array with the filter entered
 * 
 * @param {array} array 
 * @param {string} field 
 * @param {string} value 
 */

export function filterBy(array, field = null, value = null)
{
    let filtered = [];
    let obj = JSON.parse(array);

    for (let key in obj)
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

export function filterByKeyName(array, keyName)
{
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
export function searchUserBy(obj, field, value)
{
    if (value !== "") {
        let filtered = [];
        for (let i = 0; i < obj.length; i++) {
            let item = obj[i];
            
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
        for (let i = 0; i < obj.length; i++) {
            let item = obj[i];
            if (item[field] === value) {
                this.setAuthData(true, item['name'], item['role'], value);
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

function getPoliciesByClient(obj, clientID)
{
    let clients = Object.entries(obj.policies);
    
    for(let i = 0; i < clients.length; i++)
    {
        if(clients[i][0] === clientID)
        {
            return clients[i][1];
        }
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

