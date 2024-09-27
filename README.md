# Whitespace Counter

This extension show a numeric counter between characters, including:

* Multiple Spaces [until 100]
* Single Space [disabled]
* Single Space Border/Background [disabled]
* EOF
* CR, multiple LF and TAB check

## Extension Settings

* `whitespaceCounter.enabledLanguageIds`: A list of languageIds to be enabled. If empty, it will be enabled for all languageIds. e.g. `[ "plaintext", "markdown" ]`
* `whitespaceCounter.updateDelay`: Delay time in milliseconds before updating. Smaller values will color faster, but will increase processing cost
* `whitespaceCounter.color`: for the general color. (default is `rgba(117, 255, 205, 0.38)`)
* `whitespaceCounter.space.enable`: for single spaces
* `whitespaceCounter.space.text`: text for single spaces (default is `₁`)
* `whitespaceCounter.space.border.enable`: Enables making spaces border/background visible.
* `whitespaceCounter.color.border`: color for space border. (default is `#80CC40`)
* `whitespaceCounter.color.bg`: color for space border background. (default is `#80CC4018`)
* `whitespaceCounter.space.skip`: to skip first N characters for single space case. Default is null (skip none)
* `whitespaceCounter.multiple.enable`: for multiple spaces
* `whitespaceCounter.eof.enable`: for EOF symbol.
* `whitespaceCounter.eof.text`: text for EOF (default is `⛶`)
* `whitespaceCounter.eof.color`: for the EOF color. (default is `rgba(117, 255, 205, 0.38)`)
* `whitespaceCounter.extra.enable`: show TAB and CR
