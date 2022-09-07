import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
  },
  button: {
    backgroundColor: 'red',
    borderRadius: 30,
    position: 'absolute',
    right: 10,
    top: 10,
  },
  buttonText: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  searchButton: {
    backgroundColor: 'red',
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    right: 20,
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  filterButton: {
    backgroundColor: 'red',
    position: 'absolute',
    width: '80%',
    height: 25,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10%',
    alignSelf: 'center',
  },
  filterButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  customCourseButton: {
    backgroundColor: 'red',
    position: 'relative',
    width: '20%',
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    alignSelf: 'center',
  },
  customCourseButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center',
  },
  bottomContainer: {
    width: '100%',
    height: 60,
    position: 'absolute',
    bottom: 50,
  },
  newCourseContainer: {
    top: 10,
    padding: 15,
    width: '100%',
  },
  codeInput: {
    fontSize: 16,
    marginBottom: 15,
    borderBottomWidth: 1.0,
    color: 'black',
    borderColor: 'lightgrey',
  },
  nameInput: {
    fontSize: 16,
    marginBottom: 15,
    borderBottomWidth: 1.0,
    color: 'black',
    borderColor: 'lightgrey',
  },
  semesterInput: {
    fontSize: 16,
    borderBottomWidth: 1.0,
    color: 'black',
    borderColor: 'lightgrey',
    marginBottom: 10,
  },
  dropDownButton: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    marginBottom: 15,
    borderColor: 'lightgrey',
    borderWidth: 1.0,
  },
  dropDownButtonText: {
    textAlign: 'left',
    fontSize: 18,
  },
  dropDownStyle: {},
  dropDownRowStyle: {
    borderBottomColor: '#C5C5C5',
  },
  dropDownRowTextStyle: {
    textAlign: 'left',
    fontSize: 16,
  },
  multiOptionContainerStyle: {
    backgroundColor: 'red',
  },
  multiOptionsLabelStyle: {
    fontSize: 16,
  },
  labelStyle: {
    fontSize: 16,
  },
  containerStyle: {
    marginBottom: 5,
  },
  textSpacer: {
    marginBottom: 40,
  },
  outerBig: {
    height: '84%',
  },
  outerSmall: {
    height: '71.55%',
    width: '100%',
  },
});

export default styles;
