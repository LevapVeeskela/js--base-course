function isDeepEqual(objA, objB) {
    var tempArrayProperties = [];
    var stringObject = "object";
    // /* Ваше решение */
    if (isNaN(objA) && isNaN(objB) && String(objA) === "NaN" && String(objA) === "NaN") {
        return true;
    }
    if (Array.isArray(objA) && Array.isArray(objB)) {
        return Array(objA).join('') === Array(objB).join('');
    }
    if (typeof (objA) === stringObject && typeof (objB) === stringObject) {
        return compareObjects(objA, objB);
    }
    else {
        return objA === objB;
    }
}

function isDoubleRecurceLinkForObjects(objA, objB) {
    for (let i in objA) {
        if (objA[i] === objA) {
            for (let j in objB) {
                if (objB[j] === objB) {
                    return true;
                }
            }
        }
    }
    return false;
}

function getObjectWithoutRecurceLink(object) {
    for (let i in object) {
        if (object[i] === object) {
            delete object[i];
            return object;
        }
    }
}

function compareObjects(objA, objB) {
    var resultArray = [];
    var firstArrayKeys = Object.keys(objA);
    var secondArrayKeys = Object.keys(objB);
    var firstArrayValues = Object.values(objA);
    var secondArrayValues = Object.values(objB);
    if (isDoubleRecurceLinkForObjects(objA, objB)) {
        return isDeepEqual(getObjectWithoutRecurceLink(objA), getObjectWithoutRecurceLink(objB));
    } else {
        for (var i = 0; i < firstArrayKeys.length; i++) {
            if (secondArrayKeys.some(elem => elem === firstArrayKeys[i])) {
                resultArray.push(isDeepEqual(firstArrayValues[i], secondArrayValues[secondArrayKeys.indexOf(firstArrayKeys[i])]))
            } else {
                resultArray.push(false);
            }
        }
        return resultArray.every(elem => elem === true);
    }
}

