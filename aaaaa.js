// buildscript {
//   repositories {
//       google()
//       jcenter()
//   }

//   dependencies {
//       classpath 'com.android.tools.build:gradle:3.4.2'
//   }
// }

// apply plugin: 'com.android.library'

// def safeExtGet(prop, fallback) {
//   rootProject.ext.has(prop) ? rootProject.ext.get(prop) : fallback
// }

// android {
//   compileSdkVersion safeExtGet('compileSdkVersion', 28)

//   defaultConfig {
//       minSdkVersion safeExtGet('minSdkVersion', 16)
//       targetSdkVersion safeExtGet('targetSdkVersion', 28)

//       versionCode 2
//       versionName "1.1"
//   }
//   lintOptions {
//      warning 'InvalidPackage', 'MissingPermission'
//   }
// }

// repositories {
//   google()
//   maven {
//       // All of React Native (JS, Obj-C sources, Android binaries) is installed from npm
//       url "$rootDir/../node_modules/react-native/android"
//   }
//   jcenter()
// }

// dependencies {

//   // Use either AndroidX library names or old/support library names based on major version of support lib
//   def supportLibVersion = safeExtGet('supportLibVersion', '28.0.0')
//   def supportLibMajorVersion = supportLibVersion.split('\\.')[0] as int
//   def appCompatLibName =  (supportLibMajorVersion < 20) ? "androidx.appcompat:appcompat" : "com.android.support:appcompat-v7"
//   def supportV4LibName =  (supportLibMajorVersion < 20) ? "androidx.legacy:legacy-support-v4" : "com.android.support:support-v4"
//   def supportV4Version = safeExtGet('supportV4Version', safeExtGet('supportLibVersion', '28.0.0'))
//   def mediaCompatLibName =  (supportLibMajorVersion < 20) ? "androidx.media:media" : "com.android.support:support-media-compat"
//   def mediaCompatVersion = safeExtGet('mediaCompatVersion', safeExtGet('supportLibVersion', '28.0.0'))

//   implementation "com.facebook.react:react-native:${safeExtGet('reactNativeVersion', '+')}"
//   implementation "com.google.android.gms:play-services-gcm:${safeExtGet('googlePlayServicesVersion', '16.1.0')}"
//   implementation "$appCompatLibName:$supportLibVersion"
//   implementation "$supportV4LibName:$supportV4Version"
//   implementation "$mediaCompatLibName:$mediaCompatVersion"
// }
