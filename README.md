## Synopsis

At the top of the file there should be a short introduction and/ or overview that explains **what** the project is. This description should match descriptions added for package managers (Gemspec, package.json, etc.)

## Code Example

Show what the library does as concisely as possible, developers should be able to figure out **how** your project solves their problem by looking at the code example. Make sure the API you are showing off is obvious, and that your code is short and concise.

## Motivation

This project exist because is very common to don't have a starter template when you are going to development an ionic application, I want to create a basic but functinality application that maybe it will using in diverses projects and it will avoid to spend many time in commons features that anyone newbie or developer with experience could found.

## Installation

Provide code examples and explanations of how to get the project.

npm install angular2-jwt
### Google-plus
ionic cordova plugin add cordova-plugin-googleplus --variable REVERSED_CLIENT_ID=<clienteId> 
npm install --save @ionic-native/google-plus
[Common issue](https://github.com/EddyVerbruggen/cordova-plugin-googleplus/issues/248)

In some places say that you must use a Android type clinet id, but for me worked with Application web (ionic). I need research more...

### Facebook
[iOS Setup](https://developers.facebook.com/docs/ios/app-events)
[Android Setup](https://developers.facebook.com/docs/android/app-events)

ionic cordova plugin add cordova-plugin-facebook4 --variable APP_ID="123456789" --variable APP_NAME="myApplication"
npm install --save @ionic-native/facebook

[Reference](https://ionicacademy.com/ionic-facebook-login/)

## API Reference

Depending on the size of the project, if it is small and simple enough the reference docs can be added to the README. For medium size to larger projects it is important to at least provide a link to where the API reference docs live.

## Tests

Describe and show how to run the tests with code examples.

# Plus

## register andoid app to authenticate with google
https://developers.google.com/mobile/add?platform=android&cntapi=signin
## regitesr ios app to authenticate with google
https://developers.google.com/mobile/add?platform=ios&cntapi=signin

## Sign a app
### generate keystore
keytool -genkey -v -keystore my-key.keystore -alias myalias -keyalg RSA -keysize 2048 -validity 20000
### generate SHA-1 fingerprint (relase)
keytool -exportcert -list -v \
-alias <your-key-name> -keystore <path-to-production-keystore>
### generate SHA-1 fingerprint (debug)
#### WINDOWS
keytool -exportcert -list -v \
-alias androiddebugkey -keystore %USERPROFILE%\.android\debug.keystore
#### MAC/LINUX
keytool -exportcert -list -v \
-alias androiddebugkey -keystore ~/.android/debug.keystore

### generate key hash
#### WINDOWS
keytool -exportcert -alias androiddebugkey -keystore %HOMEPATH%\.android\debug.keystore | openssl sha1 -binary | openssl base64 
#### MAC/LINUX
keytool -exportcert -alias androiddebugkey -keystore ~/.android/debug.keystore | openssl sha1 -binary | openssl base64

The keytool utility prompts you to enter a password for the keystore. The default password for the debug keystore is android. The keytool then prints the fingerprint to the terminal. For example: Certificate fingerprint: SHA1: DA:39:A3:EE:5E:6B:4B:0D:32:55:BF:EF:95:60:18:90:AF:D8:07:09
[IReference](https://developers.google.com/android/guides/client-auth)

### sign the unsigned APK
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore HelloWorld-release-unsigned.apk alias_name
### zip align tool to optimize the APK
zipalign -v 4 HelloWorld-release-unsigned.apk HelloWorld.apk

## Contributors

Let people know how they can dive into the project, include important links to things like issue trackers, irc, twitter accounts if applicable.

## License

A short snippet describing the license (MIT, Apache, etc.)

##Resources
