import * as jsonToAst from "json-to-ast";
import { ILinterProblem, RuleKeys, spaceValues } from "./types";
import {
  getInnerEntities,
  getLinterErrorData,
  getMixedObject,
  getModsError,
} from "./utils";

/**
 * Проверяет и возвращает ошибки, связанные с правилами проверки элементов form__content-item.
 * @param formContent — содержимое блока формы
 * @param referenceSize - Эталонный размер, вычисленный внутри данной формы
 * @return Возвращает массив ошибок, нарушающих правила
 */
export function checkContentItemElementRules(
  formContent: jsonToAst.AstJsonEntity,
  referenceSize: string
) {
  const errors: ILinterProblem<RuleKeys>[] = [];

  const contentItems = getInnerEntities(formContent, "form", "content");
  if (typeof contentItems !== "undefined") {
    contentItems.forEach((elem) => {
      const innerContent = elem.children.find((p) => p.key.value === "content");
      if (typeof innerContent !== "undefined") {
        const contentItemElements = getInnerEntities(
          innerContent.value,
          "form",
          "content-item",
          1
        );
        if (typeof contentItemElements !== "undefined") {
          contentItemElements.forEach((contentItemElem, i) => {
            const mixObj = getMixedObject(contentItemElem, "form", "item", [
              "indent-b",
            ]);
            if (typeof mixObj !== "undefined") {
              if (i !== contentItemElements.length - 1) {
                if (
                  typeof getModsError(
                    mixObj,
                    "indent-b",
                    referenceSize,
                    spaceValues,
                    1
                  ).modErrorObject !== "undefined"
                ) {
                  errors.push(
                    getLinterErrorData(
                      "FormContentItemIndentIsInvalid",
                      contentItemElem.loc
                    )
                  );
                }
              } else {
                errors.push(
                  getLinterErrorData(
                    "FormContentItemIndentIsInvalid",
                    contentItemElem.loc
                  )
                );
              }
            } else {
              if (i !== contentItemElements.length - 1) {
                errors.push(
                  getLinterErrorData(
                    "FormContentItemIndentIsInvalid",
                    contentItemElem.loc
                  )
                );
              }
            }
          });
        }
      }
    });
  }

  return errors;
}
