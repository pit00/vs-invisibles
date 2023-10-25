# Whitespace Counter

This extension show a numeric counter between characters, including:

* Multiple Spaces [until 100]
* Single Space [disabled]
* EOF
* CR, multiple LF and TAB check

## Extension Settings

* `whitespaceCounter.enabledLanguageIds`: A list of languageIds to be enabled. If empty, it will be enabled for all languageIds. e.g. `[ "plaintext", "markdown" ]`
* `whitespaceCounter.updateDelay`: Delay time in milliseconds before updating. Smaller values will color faster, but will increase processing cost
* `whitespaceCounter.color`: for the general color. eg. `#RRGGBBAA` or `rgba(R,G,B,A)` (default is `rgba(117, 255, 205, 0.38)`)
* `whitespaceCounter.space.enable`: for single spaces
* `whitespaceCounter.space.text`: text for single spaces (default is `₁`)
* `whitespaceCounter.multiple.enable`: for multiple spaces
* `whitespaceCounter.eof.enable`: for EOF symbol.
* `whitespaceCounter.eof.text`: text for EOF (default is `⛶`)
* `whitespaceCounter.eof.color`: for the EOF color. eg. `#RRGGBBAA` or `rgba(R,G,B,A)` (default is `rgba(117, 255, 205, 0.38)`)
* `whitespaceCounter.extra.enable`: show TAB and CR
