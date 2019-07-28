require("../build/linter");
var chai = require("chai");

describe("Text headers rules", function() {
  it("Should be only one h1 on the page (#1 - at one level)", function() {
    const object = `{
      "block": "page",
      "content": [
        {
            "block": "text",
            "mods": { "type": "h1" }
        },
        {
            "block": "text",
            "mods": { "type": "h1" }
        }
      ]
    }`;
    chai.expect(lint(object)).to.eql([
      {
        code: "TEXT.SEVERAL_H1",
        error: "Заголовок первого уровня должен быть один на странице",
        location: {
          end: {
            column: 10,
            line: 11,
          },
          start: {
            column: 9,
            line: 8,
          },
        },
      },
    ]);
  });

  it("Should be only one h1 on the page (#2 - nested)", function() {
    const object = `{
      "block": "page",
      "content": [
        {
          "block": "section",
          "content": [
            {
              "block": "text",
              "mods": { "type": "h1" }
            }
          ]
        },
        {
          "block": "section",
          "content": [
            {
              "block": "section"
            },
            {
              "block": "section",
              "content": [
                {
                  "block": "section",
                  "content": [
                    {
                      "block": "text",
                      "mods": { "type": "h1" }
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }`;
    chai.expect(lint(object)).to.eql([
      {
        code: "TEXT.SEVERAL_H1",
        error: "Заголовок первого уровня должен быть один на странице",
        location: {
          end: {
            column: 22,
            line: 28,
          },
          start: {
            column: 21,
            line: 25,
          },
        },
      },
    ]);
  });

  it("H3 could not be before H2 (last nested)", function() {
    const object = `{
      "block": "page",
      "content": [
        {
          "block": "section",
          "content": [
            {
              "block": "text",
              "mods": { "type": "h3" }
            }
          ]
        },
        {
          "block": "section",
          "content": [
            {
              "block": "section"
            },
            {
              "block": "section",
              "content": [
                {
                  "block": "section",
                  "content": [
                    {
                      "block": "text",
                      "mods": { "type": "h2" }
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }`;
    chai.expect(lint(object)).to.eql([
      {
        code: "TEXT.INVALID_H3_POSITION",
        error: "Заголовок третьего уровня не может следовать перед заголовком второго уровня на одном или более глубоком уровне вложенности",
        location: {
          end: {
            column: 18,
            line: 30,
          },
          start: {
            column: 17,
            line: 22,
          },
        },
      },
    ]);
  });

  it("H3 could not be before H2 (first nested)", function() {
    const object = `{
      "block": "page",
      "content": [
        {
          "block": "section",
          "content": [
            {
              "block": "section"
            },
            {
              "block": "section",
              "content": [
                {
                  "block": "section",
                  "content": [
                    {
                      "block": "text",
                      "mods": { "type": "h3" }
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "block": "section",
          "content": [
            {
              "block": "text",
              "mods": { "type": "h2" }
            }
          ]
        }
      ]
    }`;
    chai.expect(lint(object)).to.eql([
      {
        code: "TEXT.INVALID_H3_POSITION",
        error: "Заголовок третьего уровня не может следовать перед заголовком второго уровня на одном или более глубоком уровне вложенности",
        location: {
          end: {
            column: 10,
            line: 34,
          },
          start: {
            column: 9,
            line: 26,
          },
        },
      },
    ]);
  });

  it("H3 could not be before H1 (last nested)", function() {
    const object = `{
      "block": "page",
      "content": [
        {
          "block": "section",
          "content": [
            {
              "block": "text",
              "mods": { "type": "h3" }
            }
          ]
        },
        {
          "block": "section",
          "content": [
            {
              "block": "section"
            },
            {
              "block": "section",
              "content": [
                {
                  "block": "section",
                  "content": [
                    {
                      "block": "text",
                      "mods": { "type": "h2" }
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }`;
    chai.expect(lint(object)).to.eql([
      {
        code: "TEXT.INVALID_H3_POSITION",
        error: "Заголовок третьего уровня не может следовать перед заголовком второго уровня на одном или более глубоком уровне вложенности",
        location: {
          end: {
            column: 18,
            line: 30,
          },
          start: {
            column: 17,
            line: 22,
          },
        },
      },
    ]);
  });

  it("H3 could not be before H1 (first nested)", function() {
    const object = `{
      "block": "page",
      "content": [
        {
          "block": "section",
          "content": [
            {
              "block": "section"
            },
            {
              "block": "section",
              "content": [
                {
                  "block": "section",
                  "content": [
                    {
                      "block": "text",
                      "mods": { "type": "h3" }
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "block": "section",
          "content": [
            {
              "block": "text",
              "mods": { "type": "h2" }
            }
          ]
        }
      ]
    }`;
    chai.expect(lint(object)).to.eql([
      {
        code: "TEXT.INVALID_H3_POSITION",
        error: "Заголовок третьего уровня не может следовать перед заголовком второго уровня на одном или более глубоком уровне вложенности",
        location: {
          end: {
            column: 10,
            line: 34,
          },
          start: {
            column: 9,
            line: 26,
          },
        },
      },
    ]);
  });

  it("H2 could not be before H1 (last nested)", function() {
    const object = `{
      "block": "page",
      "content": [
        {
          "block": "section",
          "content": [
            {
              "block": "text",
              "mods": { "type": "h2" }
            }
          ]
        },
        {
          "block": "section",
          "content": [
            {
              "block": "section"
            },
            {
              "block": "section",
              "content": [
                {
                  "block": "section",
                  "content": [
                    {
                      "block": "text",
                      "mods": { "type": "h1" }
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }`;
    chai.expect(lint(object)).to.eql([
      {
        code: "TEXT.INVALID_H2_POSITION",
        error: "Заголовок второго уровня не может следовать перед заголовком первого уровня на одном или более глубоком уровне вложенности",
        location: {
          end: {
            column: 18,
            line: 30,
          },
          start: {
            column: 17,
            line: 22,
          },
        },
      },
    ]);
  });

  it("H2 could not be before H1 (first nested)", function() {
    const object = `{
      "block": "page",
      "content": [
        {
          "block": "section",
          "content": [
            {
              "block": "section"
            },
            {
              "block": "section",
              "content": [
                {
                  "block": "section",
                  "content": [
                    {
                      "block": "text",
                      "mods": { "type": "h2" }
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "block": "section",
          "content": [
            {
              "block": "text",
              "mods": { "type": "h1" }
            }
          ]
        }
      ]
    }`;
    chai.expect(lint(object)).to.eql([
      {
        code: "TEXT.INVALID_H2_POSITION",
        error: "Заголовок второго уровня не может следовать перед заголовком первого уровня на одном или более глубоком уровне вложенности",
        location: {
          end: {
            column: 10,
            line: 34,
          },
          start: {
            column: 9,
            line: 26,
          },
        },
      },
    ]);
  });

  it("Each incorrect order generates an error - #1", function() {
    const object = `{
      "block": "page",
      "content": [
        {
          "block": "section",
          "content": [
            {
              "block": "section"
            },
            {
              "block": "section",
              "content": [
                {
                  "block": "section",
                  "content": [
                    {
                      "block": "text",
                      "mods": { "type": "h3" }
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "block": "section",
          "content": [
            {
              "block": "text",
              "mods": { "type": "h2" }
            }
          ]
        },
        {
          "block": "text",
          "mods": { "type": "h1" }
        }
      ]
    }`;
    chai.expect(lint(object)).to.eql([
      {
        code: "TEXT.INVALID_H3_POSITION",
        error: "Заголовок третьего уровня не может следовать перед заголовком второго уровня на одном или более глубоком уровне вложенности",
        location: {
          end: {
            column: 10,
            line: 34,
          },
          start: {
            column: 9,
            line: 26,
          },
        },
      },
      {
        code: "TEXT.INVALID_H2_POSITION",
        error: "Заголовок второго уровня не может следовать перед заголовком первого уровня на одном или более глубоком уровне вложенности",
        location: {
          end: {
            column: 14,
            line: 32,
          },
          start: {
            column: 13,
            line: 29,
          },
        },
      },
    ]);
  });

  it("Each incorrect order generates an error - #2", function() {
    const object = `{
      "block": "page",
      "content": [
        {
          "block": "section",
          "content": [
            {
              "block": "text",
              "mods": { "type": "h1" }
            }
          ]
        },
        {
          "block": "section",
          "content": [
            {
              "block": "section"
            },
            {
              "block": "section",
              "content": [
                {
                  "block": "section",
                  "content": [
                    {
                      "block": "text",
                      "mods": { "type": "h3" }
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "block": "section",
          "content": [
            {
              "block": "text",
              "mods": { "type": "h2" }
            }
          ]
        },
        {
          "block": "text",
          "mods": { "type": "h1" }
        }
      ]
    }`;
    chai.expect(lint(object)).to.eql([
      {
        code: "TEXT.INVALID_H3_POSITION",
        error: "Заголовок третьего уровня не может следовать перед заголовком второго уровня на одном или более глубоком уровне вложенности",
        location: {
          end: {
            column: 10,
            line: 43,
          },
          start: {
            column: 9,
            line: 35,
          },
        },
      },
      {
        code: "TEXT.INVALID_H2_POSITION",
        error: "Заголовок второго уровня не может следовать перед заголовком первого уровня на одном или более глубоком уровне вложенности",
        location: {
          end: {
            column: 14,
            line: 41,
          },
          start: {
            column: 13,
            line: 38,
          },
        },
      },
      {
        code: "TEXT.SEVERAL_H1",
        error: "Заголовок первого уровня должен быть один на странице",
        location: {
          end: {
            column: 10,
            line: 47,
          },
          start: {
            column: 9,
            line: 44,
          },
        },
      },
    ]);
  });
});
