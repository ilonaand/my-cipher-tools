About
This application allows you encode and decode a text by 3 substitution ciphers:
    Caesar cipher
    Atbash cipher
    ROT-8 as variation of ROT-13
CLI tool should accept 3 options (short alias and full name):
    -c, --config: config for ciphers Config is a string with pattern {XY(-)}n, where:
    X is a cipher mark:
        C is for Caesar cipher (with shift 1)
        A is for Atbash cipher
        R is for ROT-8 cipher
    Y is flag of encoding or decoding (mandatory for Caesar cipher and ROT-8 cipher and should not be passed Atbash cipher)
        1 is for encoding
        0 is for decoding
    -i, --input: a path to input file
    -o, --output: a path to output file
For example, config "C1-C1-R0-A" means "encode by Caesar cipher => encode by Caesar cipher => decode by ROT-8 => use Atbash"
Usage:

    Clone this branch https://github.com/ilonaand/my-cipher-tools.git

    git clone https://github.com/ilonaand/my-cipher-tools.git

    Check your Node Version

    App uses streams, so for using it you need Node version 16+. Make sure that you using correct one (f.e via nvm)
    Run CLI
    In terminal inside downloaded folder run CLI command for encrypting message (see what options you need in about section).

Example:

$ node my_ciphering_cli.js -c "C1-C1-R0-A" -i "./input.txt" -o "./output.txt"

    input.txt This is secret. Message about "_" symbol!

    output.txt Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!
Note: input.txt and output.txt files supposed to be in src folder.