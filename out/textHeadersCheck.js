"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
function checkTextHeaderRules(content, prevElement, isH1Found, maxAvailableHeaderLevel) {
    let errors = [];
    let h1Found = isH1Found;
    let maxLevel = maxAvailableHeaderLevel;
    let prevElem = prevElement;
    switch (content.type) {
        case "Array":
            const initialMaxValue = maxAvailableHeaderLevel;
            content.children.forEach((elem) => {
                if (elem.type === "Object") {
                    if (utils_1.isBlock(elem, "text")) {
                        const mods = elem.children.find((p) => p.key.value === "mods");
                        if (typeof mods !== "undefined") {
                            const modValue = utils_1.getModValue(mods.value, "type");
                            switch (modValue) {
                                case "h1":
                                    if (maxLevel > 1) {
                                        if (typeof prevElem !== "undefined") {
                                            errors.push(utils_1.getLinterErrorData(`TextInvalidH${maxLevel}Position`, prevElem.loc));
                                        }
                                    }
                                    if (h1Found) {
                                        errors.push(utils_1.getLinterErrorData("TextSeveralH1", elem.loc));
                                    }
                                    else {
                                        h1Found = true;
                                    }
                                    break;
                                case "h2":
                                    if (maxLevel > 2) {
                                        if (typeof prevElem !== "undefined") {
                                            errors.push(utils_1.getLinterErrorData(`TextInvalidH${maxLevel}Position`, prevElem.loc));
                                        }
                                    }
                                    maxLevel = 2;
                                    prevElem = elem;
                                    break;
                                case "h3":
                                    maxLevel = 3;
                                    prevElem = elem;
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                    else {
                        maxLevel = initialMaxValue;
                    }
                    const innerContent = elem.children.find((p) => p.key.value === "content");
                    if (typeof innerContent !== "undefined") {
                        const { headerErrors, maxLevelValue, previousElement, } = checkTextHeaderRules(innerContent.value, elem, h1Found, maxLevel);
                        errors = [...errors, ...headerErrors];
                        maxLevel = maxLevelValue;
                        prevElem = previousElement;
                    }
                }
            });
            break;
        case "Object":
            if (utils_1.isBlock(content, "text")) {
                const mods = content.children.find((p) => p.key.value === "mods");
                if (typeof mods !== "undefined") {
                    const modValue = utils_1.getModValue(mods.value, "type");
                    switch (modValue) {
                        case "h1":
                            if (maxLevel > 1) {
                                if (typeof prevElem !== "undefined") {
                                    errors.push(utils_1.getLinterErrorData(`TextInvalidH${maxLevel}Position`, prevElem.loc));
                                }
                            }
                            if (h1Found) {
                                errors.push(utils_1.getLinterErrorData("TextSeveralH1", content.loc));
                            }
                            else {
                                h1Found = true;
                            }
                            break;
                        case "h2":
                            if (maxLevel > 2) {
                                if (typeof prevElem !== "undefined") {
                                    errors.push(utils_1.getLinterErrorData(`TextInvalidH${maxLevel}Position`, prevElem.loc));
                                }
                            }
                            maxLevel = 2;
                            prevElem = content;
                            break;
                        case "h3":
                            maxLevel = 3;
                            prevElem = content;
                            break;
                        default:
                            break;
                    }
                }
            }
            const innerContent = content.children.find((p) => p.key.value === "content");
            if (typeof innerContent !== "undefined") {
                const { headerErrors, maxLevelValue, previousElement, } = checkTextHeaderRules(innerContent.value, prevElem, h1Found, maxLevel);
                errors = [...errors, ...headerErrors];
                maxLevel = maxLevelValue;
                prevElem = previousElement;
            }
            break;
        default:
            break;
    }
    return {
        headerErrors: errors,
        maxLevelValue: maxLevel,
        previousElement: prevElem,
    };
}
exports.checkTextHeaderRules = checkTextHeaderRules;
//# sourceMappingURL=textHeadersCheck.js.map