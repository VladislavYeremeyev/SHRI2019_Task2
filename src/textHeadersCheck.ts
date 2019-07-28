import jsonToAst = require("json-to-ast");
import { ITextHeadersResult } from "./types";
import { getLinterErrorData, getModValue, isBlock } from "./utils";

/**
 * Рекурсивная функция, проверяющая корректность правил заголовков.
 * @param content — проверяемая сущность
 * @param prevElement - Предыдущий найденный заголовок
 * @param isH1Found - Флаг нахождения h1 заголовка
 * @param maxAvailableHeaderLevel - Максимально возможный уровень последующего заголовка (H3 > H2 > H1),
 * не приводящий к ошибке линтера. Например, если найден H3, то данная переменная принимает значение 3, что означает,
 * что последующие заголовки в этой ветке не могут быть H1 и H2
 * @return Возвращает объект интерфейса ITextHeadersResult
 */
export function checkTextHeaderRules(
  content: jsonToAst.AstJsonEntity,
  prevElement: jsonToAst.AstObject | undefined,
  isH1Found: boolean,
  maxAvailableHeaderLevel: number
): ITextHeadersResult {
  const result: ITextHeadersResult = {
    h1Flag: isH1Found,
    headerErrors: [],
    maxLevelValue: maxAvailableHeaderLevel,
    previousElement: prevElement,
  };

  switch (content.type) {
    case "Array":
      content.children.forEach((elem: jsonToAst.AstJsonEntity) => {
        if (elem.type === "Object") {
          if (isBlock(elem, "text")) {
            const mods = elem.children.find((p) => p.key.value === "mods");
            if (typeof mods !== "undefined") {
              const modValue = getModValue(mods.value, "type");
              switch (modValue) {
                case "h1":
                  if (result.maxLevelValue > 1) {
                    if (typeof result.previousElement !== "undefined") {
                      result.headerErrors.push(
                        getLinterErrorData(
                          `TextInvalidH${result.maxLevelValue}Position`,
                          result.previousElement.loc
                        )
                      );
                    }
                  }
                  if (result.h1Flag) {
                    result.headerErrors.push(
                      getLinterErrorData("TextSeveralH1", elem.loc)
                    );
                  } else {
                    result.h1Flag = true;
                  }
                  result.previousElement = elem;
                  break;
                case "h2":
                  if (result.maxLevelValue > 2) {
                    if (typeof result.previousElement !== "undefined") {
                      result.headerErrors.push(
                        getLinterErrorData(
                          `TextInvalidH${result.maxLevelValue}Position`,
                          result.previousElement.loc
                        )
                      );
                    }
                  }
                  result.maxLevelValue = 2;
                  result.previousElement = elem;
                  break;
                case "h3":
                  result.maxLevelValue = 3;
                  result.previousElement = elem;
                  break;
                default:
                  break;
              }
            }
          }

          const innerContent = elem.children.find(
            (p) => p.key.value === "content"
          );
          if (typeof innerContent !== "undefined") {
            const data = checkTextHeaderRules(
              innerContent.value,
              elem,
              result.h1Flag,
              result.maxLevelValue
            );

            result.headerErrors = [
              ...result.headerErrors,
              ...data.headerErrors,
            ];

            result.maxLevelValue = data.maxLevelValue;
            result.previousElement = data.previousElement;
            result.h1Flag = data.h1Flag;
          }
        }
      });
      break;
    case "Object":
      if (isBlock(content, "text")) {
        const mods = content.children.find((p) => p.key.value === "mods");
        if (typeof mods !== "undefined") {
          const modValue = getModValue(mods.value, "type");
          switch (modValue) {
            case "h1":
              if (result.maxLevelValue > 1) {
                if (typeof result.previousElement !== "undefined") {
                  result.headerErrors.push(
                    getLinterErrorData(
                      `TextInvalidH${result.maxLevelValue}Position`,
                      result.previousElement.loc
                    )
                  );
                }
              }
              if (result.h1Flag) {
                result.headerErrors.push(
                  getLinterErrorData("TextSeveralH1", content.loc)
                );
              } else {
                result.h1Flag = true;
              }
              result.previousElement = content;
              break;
            case "h2":
              if (result.maxLevelValue > 2) {
                if (typeof result.previousElement !== "undefined") {
                  result.headerErrors.push(
                    getLinterErrorData(
                      `TextInvalidH${result.maxLevelValue}Position`,
                      result.previousElement.loc
                    )
                  );
                }
              }
              result.maxLevelValue = 2;
              result.previousElement = content;
              break;
            case "h3":
              result.maxLevelValue = 3;
              result.previousElement = content;
              break;
            default:
              break;
          }
        }
      }

      const innerContent = content.children.find(
        (p) => p.key.value === "content"
      );
      if (typeof innerContent !== "undefined") {
        const data = checkTextHeaderRules(
          innerContent.value,
          content,
          result.h1Flag,
          result.maxLevelValue
        );

        result.headerErrors = [...result.headerErrors, ...data.headerErrors];

        result.maxLevelValue = data.maxLevelValue;
        result.previousElement = data.previousElement;
        result.h1Flag = data.h1Flag;
      }
      break;
    default:
      break;
  }

  return result;
}
