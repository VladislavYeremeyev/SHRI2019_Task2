// Коды ошибок
export enum RuleKeys {
  FormElementsSizeShouldBeEqual = "FORM.INPUT_AND_LABEL_SIZES_SHOULD_BE_EQUAL",
  FormContentVerticalSpaceIsInvalid = "FORM.CONTENT_VERTICAL_SPACE_IS_INVALID",
  FormContentHorizontalSpaceIsInvalid = "FORM.CONTENT_HORIZONTAL_SPACE_IS_INVALID",
  FormContentItemIndentIsInvalid = "FORM.CONTENT_ITEM_INDENT_IS_INVALID",
  FormHeaderTextSizeIsInvalid = "FORM.HEADER_TEXT_SIZE_IS_INVALID",
  FormHeaderVerticalSpaceIsInvalid = "FORM.HEADER_VERTICAL_SPACE_IS_INVALID",
  FormHeaderHorizontalSpaceIsInvalid = "FORM.HEADER_HORIZONTAL_SPACE_IS_INVALID",
  FormFooterVerticalSpaceIsInvalid = "FORM.FOOTER_VERTICAL_SPACE_IS_INVALID",
  FormFooterHorizontalSpaceIsInvalid = "FORM.FOOTER_HORIZONTAL_SPACE_IS_INVALID",
  FormFooterTextSizeIsInvalid = "FORM.FOOTER_TEXT_SIZE_IS_INVALID",
  TextSeveralH1 = "TEXT.SEVERAL_H1",
  TextInvalidH2Position = "TEXT.INVALID_H2_POSITION",
  TextInvalidH3Position = "TEXT.INVALID_H3_POSITION",
}

// Текст ошибок
export enum RuleErrorText {
  FormElementsSizeShouldBeEqual = "Инпуты, кнопки и подписи в форме должны быть одного размера",
  FormContentVerticalSpaceIsInvalid = "Вертикальный внутренний отступ элемента content должен задаваться с помощью микса на него элемента item со значением модификатора space-v на 2 шага больше эталонного размера",
  FormContentHorizontalSpaceIsInvalid = "Горизонтальный внутренний отступ элемента content должен задаваться с помощью микса на него элемента item со значением модификатора space-h на 1 шаг больше эталонного размера",
  FormContentItemIndentIsInvalid = "Строки формы должны отбиваться между собой с помощью модификатора нижнего отступа indent-b элемента item на 1 шаг больше эталонного размера",
  FormHeaderTextSizeIsInvalid = "Все текстовые блоки в заголовке формы должны быть со значением модификатора size на 2 шага больше эталонного размера",
  FormHeaderVerticalSpaceIsInvalid = "Вертикальный внутренний отступ заголовка формы должен быть равным эталонному размеру",
  FormHeaderHorizontalSpaceIsInvalid = "Горизонтальный внутренний отступ заголовка формы должен быть на 1 шаг больше эталонного размера",
  FormFooterVerticalSpaceIsInvalid = "Вертикальный внутренний отступ подвала формы должен быть равным эталонному размеру",
  FormFooterHorizontalSpaceIsInvalid = "Горизонтальный внутренний отступ подвала формы должен быть на 1 шаг больше эталонного размера",
  FormFooterTextSizeIsInvalid = "Размер текстовых блоков в подвале должен соответствовать эталонному",
  TextSeveralH1 = "Заголовок первого уровня должен быть один на странице",
  TextInvalidH2Position = "Заголовок второго уровня не может следовать перед заголовком первого уровня на одном или более глубоком уровне вложенности",
  TextInvalidH3Position = "Заголовок третьего уровня не может следовать перед заголовком второго уровня на одном или более глубоком уровне вложенности",
}

// Интерфейс ошибки
export interface ILinterProblem<TKey> {
  code: TKey;
  error: RuleErrorText;
  location: object;
}

// Интерфейс для поиска ошибок, нарушающих правила проверки размеров элементов формы
export interface IResult {
  errors: ILinterProblem<RuleKeys>[];
  newReferenceSize: string | undefined;
}

// Интерфейс для поиска ошибок, нарушающих правила заголовка
export interface ITextHeadersResult {
  headerErrors: ILinterProblem<RuleKeys>[];
  maxLevelValue: number;
  previousElement: JsonToAst.AstObject | undefined;
  h1Flag: boolean;
}

// Константы с возможными значениями модификаторов
export const textSizeValues = ["s", "m", "l", "xl", "xxl"];
export const spaceValues = [
  "xxxs",
  "xxs",
  "s",
  "m",
  "l",
  "xl",
  "xxl",
  "xxxl",
  "xxxxl",
];
