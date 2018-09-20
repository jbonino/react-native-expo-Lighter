import React from "react";
import { Text, View } from "react-native";
import { createBottomTabNavigator, createStackNavigator } from "react-navigation";
import { Icon, Button } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";

import Login from "../screens/login/login";
import ForgotPassword from "../screens/login/passwordRecovery/passwordRecovery";

import Camera from "../screens/home/Camera";
import Notifications from "../screens/home/Notification";
import Profile from "../screens/home/profile/Profile";

import EditProfile from '../screens/home/profile/editProfile';

import Storyboard from "../screens/storyboard/storyboard";
import StoryboardCustom from "../screens/storyboard/storyboardCustom";
import Story from '../screens/story/story'

import InitRegistration from "../screens/login/initRegistration/initRegistration";
import NewStory from "../screens/story/creation/newStory";

export const HomeTabs = createBottomTabNavigator(
  {
    Notifications: {
      screen: Notifications
    },
    Camera: {
      screen: Camera
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        headerTitle: "Profile Name"
      }
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Notifications") {
          iconName = `md-notifications`;
        } else if (routeName === "Camera") {
          iconName = `md-add`;
        } else if (routeName === "Profile") {
          iconName = `md-person`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: "tomato",
      inactiveTintColor: "gray"
    },
    animationEnabled: true,
    swipeEnabled: true,
    initialRouteName: "Profile",
  }
);

export const PreAuthNavigator = createStackNavigator(
  {
    Login: { screen: Login },
    ForgotPassword: { screen: ForgotPassword },
    Register: { screen: InitRegistration }
  },
  {
    headerMode: "float",
    navigationOptions: {
      title: "Become Lighter"
    }
  }
);

export const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeTabs,
    },
    EditProfile: {
      screen: EditProfile,
      navigationOptions: {
        title: 'Edit'
      }
    },
    Storyboard: {
      screen: Storyboard
    },
    StoryboardCustom: {
      screen: StoryboardCustom
    },
    Story: {
      screen: Story
    },
    NewStory: {
      screen: NewStory,
    }
  },
  {
    navigationOptions: {
      title: "Lighter"
    }
  }
);
