"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const utils_1 = require("./utils");
/**
 * Проверяет и возвращает ошибки, связанные с правилами проверки элементов form__content-item.
 * @param formContent — содержимое блока формы
 * @param referenceSize - Эталонный размер, вычисленный внутри данной формы
 * @return Возвращает массив ошибок, нарушающих правила
 */
function checkContentItemElementRules(formContent, referenceSize) {
    const errors = [];
    const contentItems = utils_1.getInnerEntities(formContent, "form", "content");
    if (typeof contentItems !== "undefined") {
        contentItems.forEach((elem) => {
            const innerContent = elem.children.find((p) => p.key.value === "content");
            if (typeof innerContent !== "undefined") {
                const contentItemElements = utils_1.getInnerEntities(innerContent.value, "form", "content-item", 1);
                if (typeof contentItemElements !== "undefined") {
                    contentItemElements.forEach((contentItemElem, i) => {
                        const mixObj = utils_1.getMixedObject(contentItemElem, "form", "item", [
                            "indent-b",
                        ]);
                        if (typeof mixObj !== "undefined") {
                            if (i !== contentItemElements.length - 1) {
                                if (typeof utils_1.getModsError(mixObj, "indent-b", referenceSize, types_1.spaceValues, 1).modErrorObject !== "undefined") {
                                    errors.push(utils_1.getLinterErrorData("FormContentItemIndentIsInvalid", contentItemElem.loc));
                                }
                            }
                            else {
                                errors.push(utils_1.getLinterErrorData("FormContentItemIndentIsInvalid", contentItemElem.loc));
                            }
                        }
                        else {
                            if (i !== contentItemElements.length - 1) {
                                errors.push(utils_1.getLinterErrorData("FormContentItemIndentIsInvalid", contentItemElem.loc));
                            }
                        }
                    });
                }
            }
        });
    }
    return errors;
}
exports.checkContentItemElementRules = checkContentItemElementRules;
//# sourceMappingURL=formContentItemElementCheck.js.map