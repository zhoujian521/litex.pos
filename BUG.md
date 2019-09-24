# Pay.pos bug 汇总

## Android

### 1：RN <> gradle

    001:  "react-native": "0.59.9",
    002:  distributionUrl=https\://services.gradle.org/distributions/gradle-4.10.1-all.zip
    003:  dependencies {
            classpath 'com.android.tools.build:gradle:3.3.0'
          }

### 2: gradle 4.6 <> AndroidX

    react-native-device-info工程下的com.goole.android.gms:play-services-gcm:+的问题，因为他的版本过高，而引入了androidx。只要将其版本替换成较低版本：16.1.0即可

## iOS
