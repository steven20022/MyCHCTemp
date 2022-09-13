import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Pressable,
  SafeAreaView,
  Animated,
  Dimensions,
  Image,
  Easing,
} from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {openDatabase} from 'react-native-sqlite-storage';
import {useQuery, gql} from '@apollo/client';
import 'localstorage-polyfill';
import { repeat, transform } from 'lodash';
import { renderToStringWithData } from '@apollo/client/react/ssr';

const MY_COURSES_BY = gql`
  query CoursesBy(
    $divisionCodes: [String]
    $courseCode: String
    $courseTitle: String
  ) {
    coursesBy(
      divisionCodes: $divisionCodes
      courseCode: $courseCode
      courseTitle: $courseTitle
    ) {
      divisionCode
      courseCode
      courseTitle
      credits
      creditTypeCode
    }
  }
`;

const database = require('../../components/Handlers/database.js');

const tableName = 'courses';

const courseDB = openDatabase({name: 'CourseList.db'});

const HomeScreen = props => {
  const [allCourses, setAllCourses] = useState([]);

  const {data, __, ___} = useQuery(MY_COURSES_BY, {
    variables: {divisionCodes: []},
    fetchPolicy: 'network-only',
    errorPolicy: 'ignore'
  });

  const getAllCourses = () => {
    courseDB.transaction(txn => {
      txn.executeSql(
        `SELECT * FROM ${tableName} WHERE status IN ('Complete')`,
        [],
        (sqlTxn, res) => {
          console.log('Courses retrieved successfully');
          let len = res.rows.length;
          // console.warn(len)
          if (len >= 0) {
            let results = [];
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              results.push({
                id: item.id,
                code: item.code,
                name: item.name,
                credits: item.credits,
                semester: item.semester,
                status: item.status,
                designator: item.designator,
                grade: item.grade,
                creditTypeCode: item.creditTypeCode,
                cnt: item.cnt,
              });
              // console.log(results[i])
            }
            setAllCourses(results);

            // console.warn('[DATA]', results[0])
          }
        },
        error => {
          console.log('error on getting courses ' + error.message);
        },
      );
    });
  };
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getAllCourses();
    });
    return unsubscribe;
  }, [navigation]);

  let credits = 0;
  for (let i = 0; i < allCourses.length; i++) {
    if (allCourses[i].cnt === 1) {
      credits += allCourses[i].credits;
    }
  }

  useEffect(async () => {
    await getAllCourses();
  }, []);

  // Code to make the Scene Scroll Effect
  const [scrollVal, setScrollVal] = useState(new Animated.Value(0)) // The Animated.Value used by value

  useEffect(() => {
    scrollRight()
  }, [])

  const scrollRight = () => {
    Animated.loop( // Animated.loop takes Animation Component and a config
      Animated.timing(scrollVal, { // Animated.timing takes an Animated.Value and a config
        toValue: 1, // toValue: the value the Animated.Value needs to move to
        duration: 5000, // duration: how long it will take in order to finish the loop
        useNativeDriver: true, // not sure what this does but might aswell set it true
        easing: Easing.inOut(Easing.linear) // Easing Linear is used to make the loop seamless
      }),
      {iterations: -1,} // Interations: number of times to loop, value of -1 loops forever
    ).start() // used to start the animation
  }

  const imgWidth = Dimensions.get("window").width*2

  const animScroll = scrollVal.interpolate({ // used to translate the Animated.Value that goes from 0-1 and turns into 0-imgWidth
    inputRange: [0,1],
    outputRange: [0,(imgWidth*-1)] // imgWidth*-1 is used to make the image go from left to right
  })

  console.log(animScroll);

  const d = "M418 1498 c-1 -403 -2 -831 -3 -950 0 -120 0 -218 0 -218 0 1 337 174 520 267 l251 126 69 -40 c39 -23 183 -103 320 -179 138 -75 262 -146 278 -156 l27 -19 0 950 c0 839 -2 951 -15 951 -13 0 -15 -108 -15 -915 0 -725 -3 -915 -12 -915 -7 0 -40 15 -73 33 -146 81 -181 100 -190 107 -5 4 -39 23 -75 43 -36 19 -114 62 -175 96 -71 39 -122 61 -143 61 -23 0 -135 -52 -377 -175 -189 -96 -346 -171 -350 -166 -3 6 -5 419 -5 920 0 800 -2 911 -15 911 -13 0 -15 -92 -17 -732z"

  // const animations = new Animated.Value(0);
  //   const opacity = [];
  //   imageArr.map((item, index) => {
  //     opacity.push(
  //       animations.interpolate({
  //         inputRange: [index - 1, index, index + 1],
  //         outputRange: [0, 1, 0],
  //       }),
  //     );
  //   });

  //   Animated.loop(
  //     Animated.timing(animations, {
  //       toValue: length - 1,
  //       duration: 2000 * length,
  //       easing: Easing.linear,
  //       useNativeDriver: true,
  //     }),
  //   ).start();

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      
      <Text style={styles.sky}/>
      <Animated.ScrollView horizontal style={[styles.imagesBackground, {transform: [{translateX: animScroll}]}]}>
        <Image style={styles.imageBackground} resizeMode='stretch' source={require('../../../assets/images/backgroundTexture.png')}/>
        <Image style={styles.imageBackground} resizeMode='stretch' source={require('../../../assets/images/backgroundTexture.png')}/>
      </Animated.ScrollView>
      <Animated.ScrollView horizontal style={[styles.imagesRoad, {transform: [{translateX: animScroll}]}]}>
        <Image style={styles.imageRoad} resizeMode='stretch' source={require('../../../assets/images/roadTexture3.png')}/>
        <Image style={styles.imageRoad} resizeMode='stretch' source={require('../../../assets/images/roadTexture3.png')}/>
      </Animated.ScrollView>

      {/* <AnimatedSVGPath
        strokeColor={"red"}
        duration={1000}
        strokeWidth={10}
        height={400}
        width={400}
        scale={0.75}
        delay={0}
        d={d}
        loop={true}
        strokeDashArray={[42.76482137044271, 42.76482137044271]}
      /> */}

     
      {/* <Video source={require('./Griffin.mov')} style={styles.griffin} /> */}
       
      {/* These Gifs only work on IOS */}
      {/* <Image source={require('./Griffin.gif')} style={styles.griffin}/> */}
      
      <SafeAreaView style={{flex: 0.0}} />
      <View style={styles.header}>
        <Text style={styles.title}>
          Countdown to Graduation
          <Text style={styles.school}>{'\n'}Chestnut Hill College</Text>
        </Text>
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.countdown}>
          {credits > 120 ? 0 : 120 - credits} credits until my graduation.
        </Text>
        <Pressable
          accessible={true}
          accessibilityRole={"button"}
          style={styles.searchButton}
          onPress={() => navigation.navigate('Get started!')}
        >
          <AntDesign name="user" size={25} color={'#f15454'} />
          <Text style={styles.searchButtonText}> Get started!</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default HomeScreen;