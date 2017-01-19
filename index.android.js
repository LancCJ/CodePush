/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
    Alert
} from 'react-native';

import codePush from "react-native-code-push";

export default class CodePush extends Component {
    codePushStatusDidChange(status) {
        switch(status) {
            case codePush.SyncStatus.CHECKING_FOR_UPDATE:
                console.log("Checking for updates.");
                break;
            case codePush.SyncStatus.DOWNLOADING_PACKAGE:
                console.log("Downloading package.");
                break;
            case codePush.SyncStatus.INSTALLING_UPDATE:
                console.log("Installing update.");
                break;
            case codePush.SyncStatus.UP_TO_DATE:
                console.log("Up-to-date.");
                break;
            case codePush.SyncStatus.UPDATE_INSTALLED:
                console.log("Update installed.");
                break;
        }
    }

    codePushDownloadDidProgress(progress) {
        console.log(progress.receivedBytes + " of " + progress.totalBytes + " received.");
    }

    componentDidMount() {
        codePush.checkForUpdate().then(
            (update) => {
                if (!update) {
                    Alert.alert('提示', '已经最新版本', [
                        {
                            text: 'OK',
                            onPress: () => {

                            }
                        }
                    ])
                } else {
                    codePush.sync({
                        updateDialog: true,
                        installMode: codePush.InstallMode.IMMEDIATE
                    })
                }
            }
        );
    }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          CodePush热更新示例
          更新之哈哈哈哈哈哈哈哈哈哈
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  }
}

CodePush = codePush(CodePush);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('CodePush', () => CodePush);
