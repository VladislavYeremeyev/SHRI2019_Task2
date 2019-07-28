"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const utils_1 = require("./utils");
/**
 * Проверяет и возвращает ошибки, связанные с правилами проверки элементов form__content.
 * @param formContent — содержимое блока формы
 * @param referenceSize - Эталонный размер, вычисленный внутри данной формы
 * @return Возвращает массив ошибок, нарушающих правила
 */
function checkContentElementRules(formContent, referenceSize) {
    const errors = [];
    const contentElements = utils_1.getInnerEntities(formContent, "form", "content");
    if (typeof contentElements !== "undefined") {
        contentElements.forEach((elem) => {
            ["space-v", "space-h"].forEach((mod) => {
                const mixObj = utils_1.getMixedObject(elem, "form", "item", [mod]);
                if (typeof mixObj !== "undefined") {
                    if (typeof utils_1.getModsError(mixObj, mod, referenceSize, types_1.spaceValues, mod === "space-v" ? 2 : 1).modErrorObject !== "undefined") {
                        errors.push(mod === "space-v"
                            ? utils_1.getLinterErrorData("FormContentVerticalSpaceIsInvalid", elem.loc)
                            : utils_1.getLinterErrorData("FormContentHorizontalSpaceIsInvalid", elem.loc));
                    }
                }
                else {
                    errors.push(mod === "space-v"
                        ? utils_1.getLinterErrorData("FormContentVerticalSpaceIsInvalid", elem.loc)
                        : utils_1.getLinterErrorData("FormContentHorizontalSpaceIsInvalid", elem.loc));
                }
            });
        });
    }
    return errors;
}
exports.checkContentElementRules = checkContentElementRules;
//# sourceMappingURL=formContentElementCheck.js.map