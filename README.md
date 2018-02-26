# colora
Get syntax highlighting in your terminal.

## Installation

1. Install the package:
```
$ npm install colora
```
2. Download the themes manually or by using the script. The latter case creates a directory `styles/`.
```
$ sh scripts/download_themes.sh
```

## Usage
```
Usage: colora [options]


Options:

  -V, --version             output the version number
  -f, --file [file]         Source file
  -l, --language [lang]     Programming language
  -s, --style [style]       Style to apply to source code
  -t, --themes-path [path]  Themes path
  -h, --help                output usage information
```

## Examples
Use an alias to avoid to specify the themes path each time:

```
alias colora=''
```

Then you can use `colora` by using:

```
cat file.c | colora -s ...
```

```
colora -f file.c
```


## Screencast
Screencast

## License
License

