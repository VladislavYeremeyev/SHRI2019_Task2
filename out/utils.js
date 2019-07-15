"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
function getLinterErrorData(errorCode, locationObject) {
    const location = {
        end: {
            column: locationObject.end.column,
            line: locationObject.end.line,
        },
        start: {
            column: locationObject.start.column,
            line: locationObject.start.line,
        },
    };
    return {
        code: types_1.RuleKeys[errorCode],
        error: types_1.RuleErrorText[errorCode],
        location,
    };
}
exports.getLinterErrorData = getLinterErrorData;
exports.isBlock = (elem, blockName) => elem.children.some((p) => p.key.value === "block" &&
    (p.value.type === "Literal" && p.value.value === blockName)) && !elem.children.some((p) => p.key.value === "elem")
    ? true
    : false;
exports.isElement = (elem, blockName, elementName) => elem.children.some((p) => p.key.value === "elem" &&
    (p.value.type === "Literal" && p.value.value === elementName)) &&
    elem.children.some((p) => p.key.value === "block" &&
        (p.value.type === "Literal" && p.value.value === blockName))
    ? true
    : false;
exports.getMixedObject = (elem, blockName, elementName, mods) => {
    let result;
    const mixProperty = elem.children.find((p) => p.key.value === "mix");
    if (typeof mixProperty !== "undefined" &&
        mixProperty.value.type === "Array") {
        mixProperty.value.children.find((mix) => {
            if (mix.type === "Object") {
                if (typeof elementName === "undefined") {
                    if (exports.isBlock(mix, blockName)) {
                        if (typeof mods === "undefined") {
                            result = mix;
                        }
                        else {
                            const modsObj = mix.children.find((p) => p.key.value === "mods");
                            if (typeof modsObj !== "undefined") {
                                if (mods.every((mod) => exports.getModValue(modsObj.value, mod))) {
                                    result = mix;
                                }
                            }
                        }
                    }
                }
                else {
                    if (exports.isElement(mix, blockName, elementName)) {
                        if (typeof mods === "undefined") {
                            result = mix;
                        }
                        else {
                            const modsObj = mix.children.find((p) => p.key.value === "mods");
                            if (typeof modsObj !== "undefined") {
                                if (mods.every((mod) => exports.getModValue(modsObj.value, mod))) {
                                    result = mix;
                                }
                            }
                        }
                    }
                }
            }
        });
    }
    return result;
};
exports.getModValue = (modsObj, modName) => {
    let result;
    if (modsObj.type === "Object") {
        const modProperty = modsObj.children.find((p) => p.key.value === modName);
        if (typeof modProperty !== "undefined" &&
            modProperty.value.type === "Literal") {
            result = modProperty.value.value;
        }
    }
    return result;
};
exports.getModsError = (elem, modName, referenceValue, expectedValues, referenceValueOffset) => {
    let modErrorObject;
    let newReferenceValue = referenceValue;
    let offset = referenceValueOffset;
    if (typeof offset === "undefined") {
        offset = 0;
    }
    const mods = elem.children.find((p) => p.key.value === "mods");
    if (typeof mods !== "undefined") {
        const modValue = exports.getModValue(mods.value, modName);
        if (modValue !== "undefined" &&
            typeof modValue === "string" &&
            expectedValues.includes(expectedValues[expectedValues.indexOf(modValue)])) {
            if (typeof referenceValue === "undefined") {
                newReferenceValue = modValue;
            }
            else if (expectedValues[expectedValues.indexOf(referenceValue) + offset] !==
                modValue) {
                modErrorObject = elem;
            }
        }
        else {
            modErrorObject = elem;
        }
    }
    return { newReferenceValue, modErrorObject };
};
exports.getInnerEntities = (elem, blockName, elementName) => {
    let innerTextBlocks = [];
    switch (elem.type) {
        case "Array":
            elem.children.forEach((child) => {
                if (child.type === "Object") {
                    if ((typeof elementName === "undefined" && exports.isBlock(child, blockName)) ||
                        (typeof elementName !== "undefined" &&
                            exports.isElement(child, blockName, elementName))) {
                        innerTextBlocks = [...innerTextBlocks, child];
                    }
                    const innerContent = child.children.find((p) => p.key.value === "content");
                    if (typeof innerContent !== "undefined") {
                        innerTextBlocks = [
                            ...innerTextBlocks,
                            ...exports.getInnerEntities(innerContent.value, blockName, elementName),
                        ];
                    }
                }
            });
            break;
        case "Object":
            if ((typeof elementName === "undefined" && exports.isBlock(elem, blockName)) ||
                (typeof elementName !== "undefined" &&
                    exports.isElement(elem, blockName, elementName))) {
                innerTextBlocks = [...innerTextBlocks, elem];
            }
            const innerContent = elem.children.find((p) => p.key.value === "content");
            if (typeof innerContent !== "undefined") {
                innerTextBlocks = [
                    ...innerTextBlocks,
                    ...exports.getInnerEntities(innerContent.value, blockName, elementName),
                ];
            }
    }
    return innerTextBlocks;
};
//# sourceMappingURL=utils.js.map