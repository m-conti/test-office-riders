

launchScript() {
    node --no-deprecation init_ex01.js $1
    echo "\nLaunch script :\n"
    time node --no-deprecation ex01.js
}

launchScript 200
echo "\n----------------------------------------------------\n"
launchScript 600
echo "\n----------------------------------------------------\n"
launchScript 10000
echo "\n----------------------------------------------------\n"
launchScript 50000
echo "\n----------------------------------------------------\n"
launchScript 100000
