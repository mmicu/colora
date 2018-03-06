# colora
Get syntax highlighting in your terminal.

## Installation
1. Clone the repo:
```
$ git clone https://github.com/mmicu/colora.git
```

2. Install the package:
```
$ npm install -g .
```

3. Download the themes manually or by using the script. The latter case creates a directory `styles/`.
```
$ sh scripts/download_themes.sh
```

## Usage
```
Usage: colora <themes path> <theme> [options]


Options:

  -V, --version          output the version number
  -f, --file [file]      Source file
  -l, --language [lang]  Programming language
  -h, --help             output usage information
```

## Examples
Use an alias to avoid to specify the themes path each time:
```
$ alias colora='colora /absolute/path/themes themeToUse'
```
Then you can use `colora` by using:
```
$ cat examples/py_example.py | colora
$ colora -f examples/py_example.py
```
[highlight.js](https://google.com) can detect the language, but you can specify it
by using option `-l` (or `--language`):
```
$ cat examples/py_example.py | colora -l python
$ colora -f examples/py_example.py --language python
```

## Screencast
Screencast

## License
MIT
