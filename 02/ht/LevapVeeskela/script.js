function isDeepEqual(objA, objB) {
    // console.log(objA.hasOwnProperty(objB));
    // console.log(objA in objB);

    var stringObject = "object";
    // /* Ваше решение */
    if (isNaN(objA) && isNaN(objB) && String(objA) === "NaN" && String(objA) === "NaN") {
        return true;
    } else if (Array.isArray(objA) && Array.isArray(objB)) {
        return Array(objA).join('') === Array(objB).join('');
    }
    else if (typeof (objA) === stringObject && typeof (objB) === stringObject) {
        return compareObjects(objA, objB);
    }
    else {
        return objA === objB;
    }
}

function compareObjects(objA, objB) {
    var resultArray = [];
    var firstArrayKeys = Object.keys(objA);
    var secondArrayKeys = Object.keys(objB);
    var firstArrayValues = Object.values(objA);
    var secondArrayValues = Object.values(objB);
    for (var i = 0; i < firstArrayKeys.length; i++) {
        if (secondArrayKeys.some(elem => elem === firstArrayKeys[i])) {
            resultArray.push(isDeepEqual(firstArrayValues[i], secondArrayValues[secondArrayKeys.indexOf(firstArrayKeys[i])]))
        } else {
            resultArray.push(false);
        }
    }
    return resultArray.every(elem => elem === true);
}

