## Synopsis

At the top of the file there should be a short introduction and/ or overview that explains **what** the project is. This description should match descriptions added for package managers (Gemspec, package.json, etc.)

## Code Example

Show what the library does as concisely as possible, developers should be able to figure out **how** your project solves their problem by looking at the code example. Make sure the API you are showing off is obvious, and that your code is short and concise.

## Motivation

A short description of the motivation behind the creation and maintenance of the project. This should explain **why** the project exists.

## Installation

Provide code examples and explanations of how to get the project.

npm install angular2-jwt

## API Reference

Depending on the size of the project, if it is small and simple enough the reference docs can be added to the README. For medium size to larger projects it is important to at least provide a link to where the API reference docs live.

## Tests

Describe and show how to run the tests with code examples.
## Plus

# regitesr andoid app to authenticate with google
https://developers.google.com/mobile/add?platform=android&cntapi=signin
# regitesr ios app to authenticate with google
https://developers.google.com/mobile/add?platform=ios&cntapi=signin

# Sign a app
# generate keystore
keytool -genkey -v -keystore my-key.keystore -alias myalias -keyalg RSA -keysize 2048 -validity 20000
# generate SHA-1 fingerprint
keytool -exportcert -list -v \
-alias myalias -keystore my-key.keystore
# sign the unsigned APK
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore HelloWorld-release-unsigned.apk alias_name
# zip align tool to optimize the APK
zipalign -v 4 HelloWorld-release-unsigned.apk HelloWorld.apk

## Contributors

Let people know how they can dive into the project, include important links to things like issue trackers, irc, twitter accounts if applicable.

## License

A short snippet describing the license (MIT, Apache, etc.)

#